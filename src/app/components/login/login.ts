import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { Location } from '@angular/common';

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
	loginForm: FormGroup;
	private authService = inject(AuthService);
	private location = inject(Location);
	private destroy$ = new Subject<void>();

	constructor(private fb: FormBuilder) {
		this.loginForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(5)]]
		});
	}

	onSubmit(): void {
		if (this.loginForm.valid) {
			const { email, password } = this.loginForm.value;
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
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
