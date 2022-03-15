import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateDesignerComponent } from './pages/teammates/create/create.component';
import { EditDesignerComponent } from './pages/teammates/edit/edit.component';
import { ListDesignersComponent } from './pages/teammates/list/list.component';
import { DetailDesignerComponent } from './pages/teammates/detail/detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/list-designer', pathMatch: 'full' },
  { path: 'list-designer', component: ListDesignersComponent, 
    children: [{ path: ':id', component: DetailDesignerComponent}] },
  { path: 'create', component: CreateDesignerComponent },
  // { path: 'edit', component: EditDesignerComponent },
  { path: 'list-designer/:id', component: DetailDesignerComponent },
  { path: 'edit/:id', component: EditDesignerComponent },
  { path: 'detail/:id', component: DetailDesignerComponent },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }