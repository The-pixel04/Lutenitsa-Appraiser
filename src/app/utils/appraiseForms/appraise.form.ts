import { inject, Injectable } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})

export class AppraiseFormService {
    private fb = inject(FormBuilder);

    createForm(): FormGroup {
        return this.fb.group({
            brand: ['', Validators.required],
            image: ['', Validators.required],
            rating: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
            appraise: ['', [Validators.required, Validators.minLength(10)]]
        });
    }

    getBrand(form: FormGroup) {
        return form.get('brand');
    }

    getImage(form: FormGroup) {
        return form.get('image');
    }

    getRating(form: FormGroup) {
        return form.get('rating');
    }

    getAppraise(form: FormGroup) {
        return form.get('appraise');
    }

    getBrandErrorMessage(brand: AbstractControl | null): string {
        if (brand?.errors?.['required']) {
            return 'Brand is required';
        }

        return '';
    }

    getImageErrorMessage(image: AbstractControl | null): string {
        if (image?.errors?.['required']) {
            return 'Image is required';
        }

        return '';
    }

    getRatingErrorMessage(rating: AbstractControl | null): string {
        if (rating?.errors?.['required']) {
            return 'Rating is required';
        }

        if (rating?.errors?.['min']) {
            return 'Rating must be at least 0';
        }

        if (rating?.errors?.['max']) {
            return 'Rating must be max 10';
        }

        return '';
    }

    getAppraiseErrorMessage(appraise: AbstractControl | null): string {
        if (appraise?.errors?.['required']) {
            return 'Appraise is required';
        }

        if (appraise?.errors?.['minlength']) {
            return 'Appraise must be at least 10 characters';
        }

        return '';
    }
}