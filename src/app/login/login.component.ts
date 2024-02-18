import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../userservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public userservice :UserserviceService, private snackbar: MatSnackBar) { }


  email ='';
  password = '';

  Login(){
  this.userservice.login(this.email,this.password);

// if(login){
//  this.snackbar.open(`Welcome to VidChat ${localStorage.getItem("name")}`,"Dismiss" , { 
//   duration: 2000, 
// }).afterDismissed().subscribe(res =>{
//   window.location.href = "/userlist"
// });
// }
// else{
//   this.snackbar.open(`Something went wrong!`,"Dismiss" , { 
//     duration: 2000, verticalPosition:'top',horizontalPosition:'center'
//   }).afterDismissed().subscribe(res =>{
//   });
// }

  }

  ngOnInit(): void {
  }

}
