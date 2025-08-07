import { inject, Injectable } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})

export class RegisterFormService {
    private fb = inject(FormBuilder);

    createForm(): FormGroup {
        return this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            passwords: this.fb.group({
                password: ['', [Validators.required, Validators.minLength(6)]],
                confirmPassword: ['', [Validators.required, , Validators.minLength(6)]]
            }, { validators: [this.passwordMatchValidator] })
        });
    }

    getEmail(form: FormGroup) {
        return form.get('email');
    }

    getPasswords(form: FormGroup) {
        return form.get('passwords') as FormGroup;
    }

    getEmailErrorMessage(email: AbstractControl | null): string {
        if (email?.errors?.['required']) {
            return 'Email is required';
        }

        if (email?.errors?.['email']) {
            return 'Email is invalid'
        }

        return '';
    }

    getPasswordErrorMessage(password: AbstractControl | null): string {
        if (password?.errors?.['required']) {
            return 'Password is required';
        }

        if (password?.errors?.['minlength']) {
            return 'Password must be at least 6 characters!'
        }

        if (password?.errors?.['pattern']) {
            return 'Password is not valid'
        }

        return '';
    }

    getRePasswordErrorMessage(confirmPassword: AbstractControl | null): string {
        if (confirmPassword?.errors?.['required']) {
            return 'RePassword is required';
        }

        if (confirmPassword?.errors?.['minlength']) {
            return 'Password must be at least 6 characters!'
        }

        if (confirmPassword?.errors?.['passwordmismatch']) {
            return 'Password mismatch'
        }

        return '';
    }

    private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
        const password = control.get('password');
        const rePassword = control.get('confirmPassword');

        if (password && rePassword && password.value !== rePassword.value) {
            return {
                passwordMismatch: true
            };
        }

        return null
    }
}