import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableDocsComponent } from './components/table-docs/table-docs.component';
import { UpdatePDFSComponent } from './components/update-pdfs/update-pdfs.component';
import { CuipsComponent } from './components/cuips/cuips.component';

const routes: Routes = [
  {path:'', component:TableDocsComponent},
  {path:'home', component:TableDocsComponent},
  {path:'updateDocuments', component:UpdatePDFSComponent},
  {path:'cuips', component:CuipsComponent},
  {path:'**', redirectTo:'/', pathMatch:'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
