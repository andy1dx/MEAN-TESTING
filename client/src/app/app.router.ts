//importing modules
import { RouterModule , Routes } from '@angular/router';
import { NgModule } from '@angular/core';

//import component module
import { DashboardComponent } from './component/dashboard/dashboard.component';

const AppRoutes:Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', component: DashboardComponent },
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(AppRoutes) ],
  providers: [],
  bootstrap: [],
  exports: [ 
    RouterModule 
  ]
})
export class AppRoutingModule{ }
