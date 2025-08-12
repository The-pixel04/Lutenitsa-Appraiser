import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AppraiseService } from '../../core/services/appraise.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe, DatePipe, Location } from '@angular/common';
import { catchError, finalize, map, Observable, of, Subject, takeUntil } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/services/auth.service';
import { ExtendedAppraise } from '../../models/extendedAppraise.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentCard } from "../comment/comment";
import { CommentService } from '../../core/services/comment.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-details',
    imports: [MatProgressSpinnerModule,
        AsyncPipe,
        AsyncPipe,
        MatButtonModule,
        RouterLink,
        ReactiveFormsModule,
        CommentCard,
        MatPaginator],
    templateUrl: './details.html',
    styleUrl: './details.css'
})
export class Details implements OnInit, OnDestroy {
    appraise$!: Observable<ExtendedAppraise>;
    private destroy$ = new Subject<void>();
    commentForm!: FormGroup;
    loading: boolean = true;
    private datePipe = new DatePipe('en-US');
    private authService = inject(AuthService);
    private commentService = inject(CommentService);
    private id: number = 0;
    private userId: string | null = null;
    isAuthenticated: boolean = false;
    isOwner: boolean = false;


    pageSize: number = 1;
    currentPage: number = 1;
    count: number = 0;

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        private route: ActivatedRoute,
        private appraiseService: AppraiseService,
        private location: Location,
        private fb: FormBuilder,
    ) {
        this.commentForm = this.fb.group({
            comment: ['', [Validators.required, Validators.maxLength(500)]]
        });
    }


    loadAppraise(id: number): Observable<ExtendedAppraise> {
        this.loading = true;

        return this.appraiseService.getDetails(id, this.currentPage, this.pageSize).pipe(
            takeUntil(this.destroy$),
            map(res => {
                this.count = res.count;
                return res.appraise;
            }),
            finalize(() => this.loading = false),
            catchError(err => {
                return of(err);
            })
        );
    }

    onPageChange(event: PageEvent): void {
        this.currentPage = event.pageIndex + 1;
        this.pageSize = event.pageSize;
        this.appraise$ = this.loadAppraise(this.id);
    }

    formatDate(dateString: string): string {
        return this.datePipe.transform(dateString, 'mediumDate') || '';
    }

    getStars(rating: number): number[] {
        return Array(Math.round(rating)).fill(0);
    }

    goBack(): void {
        this.location.back()
    }

    deleteAppraise(id: number): void {
        this.appraiseService.deleteAppraise(id).pipe(
            takeUntil(this.destroy$)
        ).subscribe({
            next: () => {
                this.location.back();
            },
            error: (err) => {
                console.error('Error deleting appraise:', err);
            }
        });
    }

    async ngOnInit() {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        this.appraise$ = this.loadAppraise(this.id);

        this.userId = await this.authService.getUserId();
        this.isAuthenticated = this.authService.isAuthenticated();
        this.appraise$.pipe(
            takeUntil(this.destroy$)
        ).subscribe(appraise => {
            if (appraise.user_id === this.userId) {
                this.isOwner = true;
            }
        });
    }

    submitComment(): void {
        if (this.commentForm.invalid || !this.userId) {
            return;
        }

        const comment = this.commentForm.value.comment;
        const appraiseId = Number(this.route.snapshot.paramMap.get('id'));
        const email = this.authService.currentUser()?.email || 'Anonymous';
        this.commentService.addComment(appraiseId, comment, this.userId, email).pipe(
            takeUntil(this.destroy$)
        ).subscribe({
            next: () => {
                this.commentForm.reset();
                this.appraise$ = this.loadAppraise(appraiseId);
            },
            error: (err) => {
                console.error('Error adding comment:', err);
            }
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
