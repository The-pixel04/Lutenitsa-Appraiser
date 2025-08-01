import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppraiseService } from '../../core/services/appraise.service';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-edit-appraise',
    imports: [MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatCardModule,
        ReactiveFormsModule,
        FormsModule],
    templateUrl: './edit-appraise.html',
    styleUrl: './edit-appraise.css'
})
export class EditAppraise {
    editForm: FormGroup;
    private appraiseService = inject(AppraiseService);
    private authService = inject(AuthService);
    private router = inject(Router);
    private destroy$ = new Subject<void>();

    constructor(private fb: FormBuilder, private route: ActivatedRoute) {
        this.editForm = this.fb.group({
            brand: ['', Validators.required],
            image: ['', Validators.required],
            rating: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
            appraise: ['', [Validators.required, Validators.minLength(10)]]
        });

        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.appraiseService.getAppraise(id).pipe(
            takeUntil(this.destroy$)
        ).subscribe({
            next: (appraise) => {
                this.editForm.patchValue({
                    brand: appraise.brand,
                    image: appraise.image,
                    rating: appraise.rating,
                    appraise: appraise.appraise
                });
            }
        });

    }

    async onSubmit(): Promise<void> {
        const updatedAppraise = {
            ...this.editForm.value,
            user_id: await this.authService.getUserId()
        };

        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.appraiseService.updateAppraise(id, updatedAppraise).pipe(
            takeUntil(this.destroy$)
        ).subscribe({
            next: () => {
                this.router.navigate(['/details', id]);
            },
            error: (error) => {
                console.error('Error updating appraise:', error);
            }
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
