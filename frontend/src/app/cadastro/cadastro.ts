import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cadastro.html',
})
export class Cadastro {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      // Salvar dados mockados no localStorage
      localStorage.setItem('user', JSON.stringify(this.signupForm.value));
      this.router.navigate(['/onboarding']);
    }
  }
}
