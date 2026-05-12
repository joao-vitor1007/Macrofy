import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
})
export class Login {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    const formData = this.loginForm.value;
    // const storedUser = localStorage.getItem('user');
    // if (storedUser) {
    //   const user = JSON.parse(storedUser);
    if (formData.email && formData.password) {
      this.router.navigate(['/home']);
      //TODO: quando tiver a API, fazer a autenticação e criar um modal de erro
    }
  }
}
