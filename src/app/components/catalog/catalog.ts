import { Component, inject, OnDestroy, ViewChild } from '@angular/core';
import { Appraise } from '../../models/appraise.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AppraiseService } from '../../core/services/appraise.service';
import { CommonModule } from '@angular/common';
import { finalize, Observable, Subject, takeUntil } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppraiseCard } from "../appraise-card/appraise-card";
import { MatPaginator } from '@angular/material/paginator';
@Component({
    selector: 'app-catalog',
    imports: [CommonModule, RouterModule, MatProgressSpinnerModule, AppraiseCard, MatPaginator],
    templateUrl: './catalog.html',
    styleUrl: './catalog.css'
})
export class Catalog implements OnDestroy {
    appraises$!: Observable<Appraise[]>
    private destroy$ = new Subject<void>();
    private router = inject(Router);
    appraises: Appraise[] = [];
    error: string | null = null;
    loading: boolean = true;
    totalCount: number = 0;
    pageSize: number = 12;
    currentPage: number = 1;

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(private appraiseService: AppraiseService, private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this.currentPage = +params['page'] || 1;
            
            if (this.paginator) {
                this.paginator.pageIndex = this.currentPage-1;
            }

            this.loadAppraises();
        });
    }

    loadAppraises(): void {
        this.appraiseService.getAllAppraises(this.currentPage, this.pageSize).pipe(
            takeUntil(this.destroy$),
            finalize(() => {
                this.loading = false;
            })
        ).subscribe({
            next: data => {
                this.appraises = data.data;
                this.totalCount = data.count;
            }
        });
    }

    onPageChange(event: any): void {
        this.currentPage = event.pageIndex + 1;
        this.pageSize = event.pageSize;
        this.router.navigate(['/catalog', this.currentPage]);
        this.loadAppraises();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}