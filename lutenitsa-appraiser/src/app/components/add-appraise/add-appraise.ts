import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
export class AddAppraise {
    appraiseForm: FormGroup;
    step = 0.1;
    min=0;
    max=10

    constructor(private fb: FormBuilder) {
        this.appraiseForm = this.fb.group({
            brand: ['', Validators.required],
            image: ['', Validators.required],
            rating: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
            appraise: ['', [Validators.required, Validators.minLength(10)]]
        });
    }

    onSubmit(): void {
        if (this.appraiseForm.valid) {
            console.log('Form submitted:', this.appraiseForm.value);
        }
    }
}
