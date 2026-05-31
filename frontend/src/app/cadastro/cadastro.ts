import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CadastroUserService } from './cadastro.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cadastro.html',
})
export class Cadastro {
  private cadastroUserService = inject(CadastroUserService);
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

  createUser() {
    if (this.signupForm.valid) {
      const { name, email, password } = this.signupForm.value;
      console.log({
        name,
        email,
        password,
      });
      this.cadastroUserService.createUser({ name, email, password }).subscribe({
        next: () => {
          this.router.navigate(['/passos']);
        },
        error: (err) => {
          console.error('Erro ao criar usuário:', err);
          alert(err + 'Erro ao criar usuário. Tente novamente.');
        },
      });
    }
  }
}
