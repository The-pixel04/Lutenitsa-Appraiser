import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppraiseService } from '../../core/services/appraise.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-add-appraise',
    imports: [MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatCardModule,
        ReactiveFormsModule,
        FormsModule],
    templateUrl: './add-appraise.html',
    styleUrl: './add-appraise.css'
})
export class AddAppraise implements OnDestroy {
    appraiseForm: FormGroup;
    private appraiseService = inject(AppraiseService);
    private authService = inject(AuthService);
    private router = inject(Router);
    private destroy$ = new Subject<void>();

    constructor(private fb: FormBuilder) {
        this.appraiseForm = this.fb.group({
            brand: ['', Validators.required],
            image: ['', Validators.required],
            rating: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
            appraise: ['', [Validators.required, Validators.minLength(10)]]
        });
    }

    async onSubmit(): Promise<void> {
        if (this.appraiseForm.valid) {
            const user_id = await this.authService.getUserId();
            this.appraiseService.createAppraise({ ...this.appraiseForm.value, user_id }).pipe(
                takeUntil(this.destroy$)
            ).subscribe({
                next: () => {
                    this.router.navigate(['/catalog/1'])
                },
                error: (err) => {
                    return err;
                }
            })
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}