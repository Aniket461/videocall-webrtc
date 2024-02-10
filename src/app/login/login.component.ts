import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public userservice :UserserviceService) { }


  email ='';
  password = '';

  Login(){
const user = this.userservice.login(this.email,this.password);
if(!user){
  console.log("No user found")
}else{
  window.location.href = "/userlist";
}
  }

  ngOnInit(): void {
  }

}
