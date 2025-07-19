import { Component } from '@angular/core';
import { Appraise } from '../../models/appraise.model';
import { RouterModule } from '@angular/router';
import { AppraiseService } from '../../core/services/appraise.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
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
    loading = true;
    error: string | null = null;

    constructor(private appraiseService: AppraiseService) {
        this.loadAppraises();
    }

    loadAppraises(): void {
        this.appraises$ = this.appraiseService.getAllAppraises()
        this.loading = false;
    }
}
