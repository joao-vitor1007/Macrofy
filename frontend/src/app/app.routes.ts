import { Routes } from '@angular/router';
import { Cadastro } from './cadastro/cadastro';
import { PassosComponent } from './passos/passos';

export const routes: Routes = [
  // Rota padrão: quando o caminho for vazio, redireciona para 'cadastro'
  { path: '', redirectTo: 'cadastro', pathMatch: 'full' },

  { path: 'cadastro', component: Cadastro },
  { path: 'passos', component: PassosComponent },
];
