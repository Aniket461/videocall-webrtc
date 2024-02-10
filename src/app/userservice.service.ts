import { Injectable } from '@angular/core';
import { CallserviceService } from './callservice.service';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(public callservice:CallserviceService) { }


  users = [{id:"Aniket461",email:"surveaniket461@gmail.com",password:"Aniket123",name:"Aniket Surve"},
  {id:"Aishwarya20",email:"Aishwarya20@gmail.com",password:"Aishwarya",name:"Aishwarya Chordia"}]


  myid = '';


  login(email:string,password:string){
    let found = false;
    this.users.forEach(user =>{
      if(user.email == email && user.password == password){
        this.myid = user.id;
        localStorage.setItem("myid",user.id);
        localStorage.setItem("name",user.name);
        localStorage.setItem("email",user.email);
        this.callservice.openconnection(user.id);
        found = true;
      }
    })
    return found;
  }


}
