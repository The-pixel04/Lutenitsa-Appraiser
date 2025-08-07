import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { Location } from '@angular/common';
import { RegisterFormService } from '../../utils/forms/register.form';

@Component({
    selector: 'app-register',
    imports: [MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatCardModule,
        ReactiveFormsModule,
        FormsModule,
        RouterLink],
    templateUrl: './register.html',
    styleUrl: './register.css'
})
export class Register implements OnDestroy {
    registerForm: FormGroup;
    email: AbstractControl | null;
    passwords: FormGroup | null;
    password: AbstractControl | null;
    confirmPassword: AbstractControl | null;
    emailErrorMessage: string = '';
    passwordErrorMessage: string = '';
    confirmPasswordErrorMessage: string = '';
    private authService = inject(AuthService);
    private destroy$ = new Subject<void>();
    private location = inject(Location);

    constructor(private form: RegisterFormService) {
        this.registerForm = this.form.createForm();
        this.email = this.form.getEmail(this.registerForm);
        this.passwords = this.form.getPasswords(this.registerForm);
        this.password = this.passwords.get('password');
        this.confirmPassword = this.passwords.get('confirmPassword')
    }

    get emailError(): boolean {
        this.emailErrorMessage = this.form.getEmailErrorMessage(this.email);
        return this.email?.invalid && (this.email?.dirty || this.email?.touched) || false
    }

    get passwordsError(): boolean {
        this.passwordErrorMessage = this.form.getPasswordErrorMessage(this.password);
        this.confirmPasswordErrorMessage = this.form.getRePasswordErrorMessage(this.confirmPassword);
        return this.passwords?.invalid && (this.passwords?.dirty || this.passwords?.touched) || false
    }

    onSubmit(): void {
        const { email } = this.registerForm.value;
        const { password, confirmPassword } = this.registerForm.value.passwords;
        this.authService.register(email, password, confirmPassword).pipe(
            takeUntil(this.destroy$)
        ).subscribe({
            next: () => {
                this.location.back()
            },
            error: (err) => {
                console.error('Registration failed', err);
            }
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
