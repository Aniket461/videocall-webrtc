import { Injectable } from '@angular/core';
import { CallserviceService } from './callservice.service';
import { HttpClient } from '@angular/common/http';

interface user {
  "_id":String,
  "email":String,
  "name":String,
  "password":String
}


@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(public callservice: CallserviceService, public http:HttpClient) { }


  users:any = []


user:user ={
name:'',
_id:'',
email:'',
password:''
}
  myid = '';

  baseURL = "https://vidchat-aniket.azurewebsites.net/";

  logout(){
    localStorage.setItem("myid", "");
        localStorage.setItem("name", "");
        localStorage.setItem("email", "");
        window.location.href = "/"
  }

  login(email: string, password: string) {
    let found = false;
    this.http.post(`${this.baseURL}login`,{email:email,password:password}).subscribe((res)=>{

      if(res.hasOwnProperty("email")){
        
        this.user = <user>res;
        this.myid = this.user._id.toString();
        localStorage.setItem("myid", this.user._id.toString());
        localStorage.setItem("name", this.user.name.toString());
        localStorage.setItem("email", this.user.email.toString());
        this.callservice.openconnection(this.user._id.toString());
      window.location.href = "/userlist"
      }
      else{
        console.log("No user found");
      }
    },(err)=>{
      console.log("No user found");
    });
  }

  register(data:any){

this.http.post(`${this.baseURL}register`,data).subscribe(res =>{
  console.log(res);
  if(res.hasOwnProperty("message"))
  window.location.href = '/';
else{
  console.log(res);
}
},(err)=>{
  console.log(err);
})
  }

  getUsers(){
    this.http.get(`${this.baseURL}getusers`).subscribe(res =>{
      console.log(res);
      this.users = <any[]>res;
    },(err)=>{
      console.log(err);
    })
    
  }

}
