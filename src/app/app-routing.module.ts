import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RecordsHandlingComponent } from './components/records-handling/records-handling.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'record/:id', component: RecordsHandlingComponent},
  {path: 'record', component: RecordsHandlingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
