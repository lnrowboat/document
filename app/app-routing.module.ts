import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentComponent } from './document.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/document',
    pathMatch: 'full'
  },
  {
    path: 'document',
    component: DocumentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routedComponents = [DocumentComponent];
