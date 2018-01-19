import { HomeComponent } from './home/home.component';
import { VideoComponentComponent } from './video-component/video-component.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path:'',  redirectTo:'/home',pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'videos', component:VideoComponentComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
