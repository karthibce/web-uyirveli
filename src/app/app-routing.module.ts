import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
   // Public routes (no sidebar)
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
   // Protected routes inside layout
  { path: '',
    component: LayoutComponent,
    children: [
       { path: 'dashboard', component: DashboardComponent },
       { path: 'customer', loadChildren:()=>import('./customer/customer.module').then(m=>m.CustomerModule)}
      ]
  },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
