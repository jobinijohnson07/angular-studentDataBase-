import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewStudentComponent } from './view-student/view-student.component';
import { EditComponent } from './edit/edit.component';



const routes: Routes = [
  {
    path : "",
    
    pathMatch : "full",
    component:HomeComponent 
  },
  {
    path : "home",
    component : HomeComponent
  },
  {
    path : "view",
    component : ViewStudentComponent
  },
  {
    path: "edit",
    component:EditComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
