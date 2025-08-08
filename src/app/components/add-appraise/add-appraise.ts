import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppraiseService } from '../../core/services/appraise.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { AppraiseFormService } from '../../utils/appraiseForms/appraise.form';

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

    constructor(private form: AppraiseFormService) {
        this.appraiseForm = this.form.createForm();
        this.brand = this.form.getBrand(this.appraiseForm);
        this.image = this.form.getImage(this.appraiseForm);
        this.rating = this.form.getRating(this.appraiseForm);
        this.appraise = this.form.getAppraise(this.appraiseForm);
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

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}