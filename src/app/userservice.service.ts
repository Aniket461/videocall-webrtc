import { Injectable } from '@angular/core';
import { CallserviceService } from './callservice.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

interface user {
  _id: String;
  email: String;
  name: String;
  password: String;
  friends: any[];
}

@Injectable({
  providedIn: 'root',
})
export class UserserviceService {
  constructor(
    public callservice: CallserviceService,
    public http: HttpClient,
    public snackbar: MatSnackBar
  ) {}

  users: any = [];
  friends:any = [];
  getusercalled = false;

  user: user = {
    name: '',
    _id: '',
    email: '',
    password: '',
    friends: [],
  };
  myid = '';

  //baseURL = "https://vidchat-aniket.azurewebsites.net/";
  baseURL = 'http://localhost:3000/';

  logout() {
    localStorage.setItem('myid', '');
    localStorage.setItem('name', '');
    localStorage.setItem('email', '');
    window.location.href = '/';
  }
  isloginpressed = false;
  login(email: string, password: string) {
    this.isloginpressed = true;
    let found = false;
    this.http
      .post(`${this.baseURL}login`, { email: email, password: password })
      .subscribe(
        (res) => {
          if (res.hasOwnProperty('email')) {
            this.user = <user>res;
            this.myid = this.user._id.toString();
            localStorage.setItem('myid', this.user._id.toString());
            localStorage.setItem('name', this.user.name.toString());
            localStorage.setItem('email', this.user.email.toString());
            this.callservice.openconnection(this.user._id.toString());
            this.snackbar
              .open(`Welcome to VidChat!!`, 'Dismiss', {
                duration: 2000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
              })
              .afterDismissed()
              .subscribe((res) => {
                window.location.href = '/userlist';
              });
          } else {
            this.isloginpressed = false;
            this.snackbar
              .open(`Something went wrong with Login!`, 'Dismiss', {
                duration: 2000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
              })
              .afterDismissed()
              .subscribe((res) => {});
            console.log('No user found');
          }
        },
        (err) => {
          this.isloginpressed = false;
          this.snackbar
            .open(`Something went wrong!`, 'Dismiss', {
              duration: 2000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            })
            .afterDismissed()
            .subscribe((res) => {});
          console.log('No user found');
        }
      );
  }

  isregisterclicked = false;
  register(data: any) {
    this.isregisterclicked = true;
    this.http.post(`${this.baseURL}register`, data).subscribe(
      (res) => {
        if (res.hasOwnProperty('message')) this.snackbar
        .open(`Registered successfully, Redirecting....`, 'Dismiss', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        })
        .afterDismissed()
        .subscribe((res) => {
          window.location.href = '/';
        });
        else {
          this.isregisterclicked = false;
          this.snackbar
              .open(`Something went wrong, please try again or use different email!`, 'Dismiss', {
                duration: 2000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
              })
              .afterDismissed()
              .subscribe((res) => {
              });
        }
      },
      (err) => {
        
        this.isregisterclicked = false;
        console.log(err);
      }
    );
  }

  getUsers() {
    this.http.get(`${this.baseURL}getusers`).subscribe(
      (res) => {
        this.getusercalled = true;
        this.users = <any[]>res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getUserFriends(userid: any) {
    this.http.get(`${this.baseURL}friends\\${userid}`).subscribe(
      (res) => {
        this.getusercalled = true;
        this.friends = (<user[]>res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  searchUsers(email:Event){
    this.searchclicked = true;
let e = (<HTMLInputElement>email.target).value;
if(e == ''){
  e = 'emptyword';
  this.searchclicked = false;
}
    this.http.get(`${this.baseURL}search\\${e}`).subscribe(
      (res) => {
        this.getusercalled = true;
        this.users = res;
      },
      (err) => {
        console.log(err);
      }
    );

  }

  searchclicked = false;
  search = '';

  setSearchClicked(){
this.searchclicked = false;
this.search = '';
  }

  addtofriends(myid:any,userid:any){
    console.log(this.myid);
    let data = {"myid":localStorage.getItem("myid"),"userid":userid}
    this.http.post(`${this.baseURL}addtofriends`, data).subscribe(
      (res) => {
        if (res.hasOwnProperty('message')) {

          this.snackbar
          .open(`User Added to Friend List`, 'Dismiss', {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          })
          .afterDismissed()
          .subscribe((res) => {
            this.getUserFriends(localStorage.getItem("myid"));
            //window.location.href = '/userlist';
          });

        }        else {
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
