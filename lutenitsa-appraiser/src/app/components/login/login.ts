import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

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

	constructor(private fb: FormBuilder) {
		this.loginForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required, Validators.minLength(5)]
		});
	}
}
