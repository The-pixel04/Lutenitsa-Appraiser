import { Component } from '@angular/core';
import { Appraise } from '../../models/appraise.model';
import { RouterModule } from '@angular/router';
import { AppraiseService } from '../../core/services/appraise.service';
import { CommonModule } from '@angular/common';
import { finalize, Observable } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppraiseCard } from "./appraise-card/appraise-card";
@Component({
    selector: 'app-catalog',
    imports: [CommonModule, RouterModule, MatProgressSpinnerModule, AppraiseCard],
    templateUrl: './catalog.html',
    styleUrl: './catalog.css'
})
export class Catalog {
    appraises$!: Observable<Appraise[]>
    appraises: Appraise[] = [];
    error: string | null = null;
    loading: boolean = true

    constructor(private appraiseService: AppraiseService) {
        this.loadAppraises();
    }

    loadAppraises(): void {
        this.appraiseService.getAllAppraises().pipe(
            finalize(() => {
                this.loading = false;
            })
        ).subscribe({
            next: data => {
                this.appraises = data;
            }
        });
    }
}
