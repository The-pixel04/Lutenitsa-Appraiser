import { Component, inject, OnDestroy } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AuthService } from '../../core/services/auth.service';
import { AppraiseService } from '../../core/services/appraise.service';
import { finalize, Observable, Subject, takeUntil } from 'rxjs';
import { Appraise } from '../../models/appraise.model';
import { AppraiseCard } from "../appraise-card/appraise-card";

@Component({
    selector: 'app-profile',
    imports: [MatProgressSpinner, AppraiseCard],
    templateUrl: './profile.html',
    styleUrl: './profile.css'
})
export class Profile implements OnDestroy {
    private authService = inject(AuthService);
    appraises: Appraise[] | [] = [];
    private destroy$ = new Subject<void>();
    user = this.authService.currentUser;
    loading = true;


    constructor(private appraiseService: AppraiseService) {
        this.appraiseService.getAppraisesByUserId(this.user()?.id).pipe(
            takeUntil(this.destroy$),
            finalize(() => this.loading = false)
        ).subscribe({
            next: (appraises) => {
                this.appraises = appraises;
            },
            error: (err) => {
                console.error('Error fetching appraises:', err);
            }
        })
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

}

