import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

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
export class Login {
	loginForm: FormGroup;
	private authService = inject(AuthService);
	private router = inject(Router);

	constructor(private fb: FormBuilder) {
		this.loginForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(5)]]
		});
	}

	onSubmit(): void {
		if (this.loginForm.valid) {
			const { email, password } = this.loginForm.value;
			this.authService.login(email, password).subscribe();
			this.router.navigate(['/']);
		}
	}
}
