import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate{
  constructor() { }
  canActivate() {
    console.log("In guarddddd");
    if(localStorage.getItem("myid") != '' &&  localStorage.getItem("myid") != null){

      console.log("True");
      return true;
    }
    else{
      window.location.href = '/';
      console.log("Falseee");
      return false;
    }
  }
}
