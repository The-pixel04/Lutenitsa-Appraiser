import { Component, inject } from '@angular/core';
import { AbstractControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppraiseService } from '../../core/services/appraise.service';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AppraiseFormService } from '../../utils/appraiseForms/appraise.form';

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
    brand: AbstractControl | null;
    image: AbstractControl | null;
    rating: AbstractControl | null;
    appraise: AbstractControl | null;
    brandErrorMessage: string = '';
    imageErrorMessage: string = '';
    ratingErrorMessage: string = '';
    appraiseErrorMessage: string = '';
    private appraiseService = inject(AppraiseService);
    private authService = inject(AuthService);
    private router = inject(Router);
    private destroy$ = new Subject<void>();

    constructor(private form: AppraiseFormService, private route: ActivatedRoute) {
        this.editForm = this.form.createForm();
        this.brand = this.form.getBrand(this.editForm);
        this.image = this.form.getImage(this.editForm);
        this.rating = this.form.getRating(this.editForm);
        this.appraise = this.form.getAppraise(this.editForm);

        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.appraiseService.getAppraiseWithComments(id).pipe(
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

    get brandError(): boolean {
        this.brandErrorMessage = this.form.getBrandErrorMessage(this.brand);
        return this.brand?.invalid && (this.brand?.dirty || this.brand?.touched) || false
    }

    get imageError(): boolean {
        this.imageErrorMessage = this.form.getImageErrorMessage(this.image);
        return this.image?.invalid && (this.image?.dirty || this.image?.touched) || false
    }

    get ratingError(): boolean {
        this.ratingErrorMessage = this.form.getRatingErrorMessage(this.rating);
        return this.rating?.invalid && (this.rating?.dirty || this.rating?.touched) || false
    }

    get appraiseError(): boolean {
        this.appraiseErrorMessage = this.form.getAppraiseErrorMessage(this.appraise);
        return this.appraise?.invalid && (this.appraise?.dirty || this.appraise?.touched) || false
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
