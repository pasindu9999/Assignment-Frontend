import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';
import { InvoiceViewComponent } from './components/invoice-view/invoice-view.component';


const routes: Routes = [
  { path: '', component: InvoiceListComponent },
  { path: 'create', component: InvoiceFormComponent },
  { path: 'update/:id', component: InvoiceFormComponent },
  { path: 'invoice/:id', component: InvoiceViewComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
