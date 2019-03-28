import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TotalComponent} from './total/total.component';
import {PosterDetailComponent} from './poster-detail/poster-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/table', pathMatch: 'full' },
  { path: 'table', component: TotalComponent },
  { path: 'poster/:path', component: PosterDetailComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

