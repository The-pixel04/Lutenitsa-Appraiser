import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Appraise } from '../../models/appraise.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, Observable, Subject, takeUntil } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppraiseCard } from "../appraise-card/appraise-card";
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { AppSate } from '../../core/store';
import { selectAppraiseLoading, selectAppraises, selectAppraisesCount } from '../../core/store/appraises/appraise.selector';
import { loadAppraises, loadAppraisesReset } from '../../core/store/appraises/appraise.actions';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-catalog',
    imports: [CommonModule, RouterModule, MatProgressSpinnerModule, AppraiseCard, MatPaginator, MatLabel, MatFormField, ReactiveFormsModule, MatInputModule],
    templateUrl: './catalog.html',
    styleUrl: './catalog.css'
})

export class Catalog implements OnInit, OnDestroy {
    appraises$!: Observable<Appraise[]>
    count$!: Observable<number>;
    private destroy$ = new Subject<void>();
    private router = inject(Router);
    error: string | null = null;
    loading$!: Observable<boolean>;
    searchControl = new FormControl('');

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

    loadAppraises(search: string = ''): void {
        this.store.dispatch(loadAppraises({
            page: this.currentPage,
            pageSize: this.pageSize,
            search
        }));
    }

    onPageChange(event: PageEvent): void {
        this.currentPage = event.pageIndex + 1;
        this.pageSize = event.pageSize;
        this.router.navigate(['/catalog', this.currentPage]);
        this.loadAppraises();
    }

    ngOnInit(): void {
        this.searchControl.valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged(),
                takeUntil(this.destroy$)
            )
            .subscribe(query => {
                this.currentPage = 1;
                this.loadAppraises(query || '');
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
        this.store.dispatch(loadAppraisesReset())
    }
}