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
import { LoginFormService } from '../../utils/forms/login.form';

@Component({
	selector: 'app-login',
	imports: [MatInputModule,
		MatButtonModule,
		MatFormFieldModule,
		MatCardModule,
		ReactiveFormsModule,
		FormsModule,
		RouterLink],
	templateUrl: './login.html',
	styleUrl: './login.css'
})
export class Login implements OnDestroy {
	form: FormGroup;
	email: AbstractControl | null;
	password: AbstractControl | null;
	emailErrorMessage: string = '';
	passwordErrorMessage: string = '';
	private authService = inject(AuthService);
	private location = inject(Location);
	private destroy$ = new Subject<void>();


	constructor(private loginForm: LoginFormService) {
		this.form = this.loginForm.createForm();
		this.email = this.loginForm.getEmail(this.form);
		this.password = this.loginForm.getPassword(this.form);
	}

	get emailError(): boolean {
		this.emailErrorMessage = this.loginForm.getEmailErrorMessage(this.email);
		return this.email?.invalid && (this.email?.dirty || this.email?.touched) || false
	}

	get passwordError(): boolean {
		this.passwordErrorMessage = this.loginForm.getPasswordErrorMessage(this.password);
		return this.password?.invalid && (this.password?.dirty || this.password?.touched) || false
	}

	onSubmit(): void {
		const { email, password } = this.form.value;
		this.authService.login(email, password).pipe(
			takeUntil(this.destroy$)
		).subscribe({
			next: () => {
				this.location.back();
			},
			error: (err) => {
				console.error('Login failed', err);
			}
		});
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
