import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppraiseService } from '../../core/services/appraise.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe, DatePipe } from '@angular/common';
import { catchError, finalize, Observable, of } from 'rxjs';
import { Appraise } from '../../models/appraise.model';

@Component({
    selector: 'app-details',
    imports: [MatProgressSpinnerModule, AsyncPipe, AsyncPipe],
    templateUrl: './details.html',
    styleUrl: './details.css'
})
export class Details {
    appraise$!: Observable<Appraise>;
    loading = true;
    error = false;
     private datePipe = new DatePipe('en-US');

    constructor(
        private route: ActivatedRoute,
        private appraiseService: AppraiseService
    ) {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.appraise$ = this.loadAppraise(id);
    }


    loadAppraise(id: number): Observable<Appraise> {
        this.loading = true;
        this.error = false;

        return this.appraiseService.getAppraise(id).pipe(
            finalize(() => this.loading = false),
            catchError(err => {
                this.error = true;
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
}
