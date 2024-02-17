import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public userservice:UserserviceService) { }

  name:string = '';
  email:string = '';
  password:string = '';

  Register(){
this.userservice.register({"name":this.name,"email":this.email,"password":this.password});
  }

  ngOnInit(): void {
  }

}
