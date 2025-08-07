import { inject, Injectable } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})

export class LoginFormService {
    private fb = inject(FormBuilder);

    createForm(): FormGroup {
        return this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    getEmail(form: FormGroup) {
        return form.get('email');
    }

    getPassword(form: FormGroup) {
        return form.get('password');
    }



    getEmailErrorMessage(email:AbstractControl | null): string {
        if (email?.errors?.['required']) {
            return 'Email is required';
        }

        if (email?.errors?.['email']) {
            return 'Email is invalid'
        }

        return '';
    }

    getPasswordErrorMessage(password:AbstractControl | null): string {
        if (password?.errors?.['required']) {
            return 'Password is required';
        }

        if (password?.errors?.['minlength']) {
            return 'Password must be at least 6 characters!'
        }

        return '';
    }

}