import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AppraiseService } from '../../core/services/appraise.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe, DatePipe, Location } from '@angular/common';
import { catchError, finalize, Observable, of, tap, throwError } from 'rxjs';
import { Appraise } from '../../models/appraise.model';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-details',
    imports: [MatProgressSpinnerModule, AsyncPipe, AsyncPipe, MatButtonModule, RouterLink],
    templateUrl: './details.html',
    styleUrl: './details.css'
})
export class Details implements OnInit {
    appraise$!: Observable<Appraise>;
    loading: boolean = true;
    private datePipe = new DatePipe('en-US');
    private authService = inject(AuthService);
    private router = inject(Router);
    private userId: string | null = null;
    isAuthenticated: boolean = false;
    isOwner: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private appraiseService: AppraiseService,
        private location: Location
    ) {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.appraise$ = this.loadAppraise(id);
    }


    loadAppraise(id: number): Observable<Appraise> {
        this.loading = true;

        return this.appraiseService.getAppraise(id).pipe(
            finalize(() => this.loading = false),
            catchError(err => {
                return of(err);
            })
        );
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
        this.appraiseService.deleteAppraise(id).subscribe({
            next: () => {
                this.router.navigate(['/catalog']);
            },
            error: (err) => {
                console.error('Error deleting appraise:', err);
            }
        });
    }

    async ngOnInit() {
        this.userId = await this.authService.getUserId();
        this.isAuthenticated = this.authService.isAuthenticated();
        this.appraise$.subscribe(appraise => {
            if (appraise.user_id === this.userId) {
                this.isOwner = true;
            }
        });
    }
}
