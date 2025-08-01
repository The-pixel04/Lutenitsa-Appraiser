import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Subject, takeUntil } from 'rxjs';

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
    private authService = inject(AuthService);
    private router = inject(Router);
    private destroy$ = new Subject<void>();

    constructor(private fb: FormBuilder) {
        this.registerForm = this.fb.group({
            username: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(5)]],
            confirmPassword: ['', Validators.required,]
        }, { validators: this.passwordMatchValidator });

    }

    onSubmit(): void {
        if (this.registerForm.valid) {
            const { username, email, password, confirmPassword } = this.registerForm.value;
            this.authService.register(email, password, confirmPassword).pipe(
                takeUntil(this.destroy$)
            ).subscribe({
                next: () => {
                    this.router.navigate(['/']);
                },
                error: (err) => {
                    console.error('Registration failed', err);
                }
            });
        }
    }

    passwordMatchValidator(formGroup: FormGroup) {
        const password = formGroup.get('password')?.value;
        const confirmPassword = formGroup.get('confirmPassword')?.value;

        return password === confirmPassword ? null : { mismatch: true };
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
