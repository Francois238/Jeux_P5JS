import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnrollComponent } from './enroll/enroll.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { SnakeComponent } from './snake/snake.component';

const routes: Routes = [
  { path: 'home-page', component: HomePageComponent },
  {path:'snake', component: SnakeComponent},
  {path : 'login', component: LoginComponent},
  {path : 'enroll', component: EnrollComponent},
  { path: '', redirectTo: '/home-page', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
