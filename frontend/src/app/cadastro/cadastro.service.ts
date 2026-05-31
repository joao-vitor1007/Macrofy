import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CadastroUserService {
  private httpClient = inject(HttpClient);

  createUser({ name, email, password }: { name: string; email: string; password: string }) {
    return this.httpClient.post('http://localhost:3000/users/createUser', {
      name,
      email,
      password,
    });
  }
}
