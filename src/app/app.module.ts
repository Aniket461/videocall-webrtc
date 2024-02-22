import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideocallComponent } from './videocall/videocall.component';
import { UserlistComponent } from './userlist/userlist.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DialogueboxComponent } from './dialoguebox/dialoguebox.component'; 
import {MatDialogModule} from '@angular/material/dialog';
import { BasicpopupComponent } from './basicpopup/basicpopup.component'

@NgModule({
  declarations: [
    AppComponent,
    VideocallComponent,
    UserlistComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DialogueboxComponent,
    BasicpopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDialogModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
