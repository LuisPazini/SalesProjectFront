import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesListaComponent } from './clientes-lista/clientes-lista.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './shared/components/login/login.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthorizationGuard } from './core/guards/authorization.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, pathMatch: 'full', canActivate: [AuthGuard, AuthorizationGuard] },
  { path: 'clientes', component: ClientesListaComponent, pathMatch: 'full', canActivate: [AuthGuard, AuthorizationGuard] },
  { path: 'produtos', component: ProdutosComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'pedidos', component: PedidosComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
