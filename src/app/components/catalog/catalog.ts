import { Component, OnDestroy } from '@angular/core';
import { Appraise } from '../../models/appraise.model';
import { RouterModule } from '@angular/router';
import { AppraiseService } from '../../core/services/appraise.service';
import { CommonModule } from '@angular/common';
import { finalize, Observable, Subject, takeUntil } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppraiseCard } from "./appraise-card/appraise-card";
@Component({
    selector: 'app-catalog',
    imports: [CommonModule, RouterModule, MatProgressSpinnerModule, AppraiseCard],
    templateUrl: './catalog.html',
    styleUrl: './catalog.css'
})
export class Catalog implements OnDestroy{
    appraises$!: Observable<Appraise[]>
    private destroy$ = new Subject<void>();
    appraises: Appraise[] = [];
    error: string | null = null;
    loading: boolean = true

    constructor(private appraiseService: AppraiseService) {
        this.loadAppraises();
    }

    loadAppraises(): void {
        this.appraiseService.getAllAppraises().pipe(
            takeUntil(this.destroy$),
            finalize(() => {
                this.loading = false;
            })
        ).subscribe({
            next: data => {
                this.appraises = data;
            }
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
