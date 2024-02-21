import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SummaryDetailedComponent } from './Components/summary-detailed/summary-detailed.component';
import { SummaryComponent } from './Components/summary/summary.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'summary', pathMatch: 'full'
  },
  {
    path: 'summary',
    component: SummaryComponent
  },
  {
    path: 'summary-details',
    component: SummaryDetailedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
