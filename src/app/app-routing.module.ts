import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VideocallComponent } from './videocall/videocall.component';
import { UserlistComponent } from './userlist/userlist.component';
import { AuthguardService } from './authguard.service';

const routes: Routes = [{path:"", component:HomeComponent},
{path:"login",component:HomeComponent},
{path:"register",component:RegisterComponent},
{path:"videocall",component:VideocallComponent,canActivate:[AuthguardService]},{
  path:"userlist",component:UserlistComponent, canActivate:[AuthguardService]
},{path:"**", component:HomeComponent},];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 
  constructor(public authg:AuthguardService){}
}