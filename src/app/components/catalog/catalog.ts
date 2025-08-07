import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Appraise } from '../../models/appraise.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppraiseCard } from "../appraise-card/appraise-card";
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { AppSate } from '../../core/store';
import { selectAppraiseLoading, selectAppraises, selectAppraisesCount } from '../../core/store/appraises/appraise.selector';
import { loadAppraises, loadAppraisesReset } from '../../core/store/appraises/appraise.actions';

@Component({
    selector: 'app-catalog',
    imports: [CommonModule, RouterModule, MatProgressSpinnerModule, AppraiseCard, MatPaginator],
    templateUrl: './catalog.html',
    styleUrl: './catalog.css'
})

export class Catalog implements OnInit, OnDestroy {
    appraises$!: Observable<Appraise[]>
    count$!: Observable<number>;
    private destroy$ = new Subject<void>();
    private router = inject(Router);
    error: string | null = null;
    loading$!: Observable<boolean>

    pageSize: number = 12;
    currentPage: number = 1;

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(private route: ActivatedRoute, private store: Store<AppSate>) {
        this.route.params.subscribe(params => {
            this.currentPage = +params['page'] || 1;

            if (this.paginator) {
                this.paginator.pageIndex = this.currentPage - 1;
            }

            this.appraises$ = this.store.select(selectAppraises);
            this.count$ = this.store.select(selectAppraisesCount);
            this.loading$ = this.store.select(selectAppraiseLoading);

            this.loadAppraises()
        });
    }

    loadAppraises(): void {
        this.store.dispatch(loadAppraises({ page: this.currentPage, pageSize: this.pageSize }))
    }

    onPageChange(event: any): void {
        this.currentPage = event.pageIndex + 1;
        this.pageSize = event.pageSize;
        this.router.navigate(['/catalog', this.currentPage]);
        this.loadAppraises();
    }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
        this.store.dispatch(loadAppraisesReset())
    }
}