import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {
    path: '',
    component:RegisterComponent
  },
  {
    path:'details',
    component: DetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MicroRoutingModule { 

}
