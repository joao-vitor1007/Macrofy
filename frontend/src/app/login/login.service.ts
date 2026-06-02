import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoginUserService {
  private httpClient = inject(HttpClient);

  login({ email, password }: { email: string; password: string }) {
    return this.httpClient.post('http://localhost:3000/users/login', {
      email,
      password,
    });
  }
}
