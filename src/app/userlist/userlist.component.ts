import { Component, OnInit } from '@angular/core';
import { CallserviceService } from '../callservice.service';
import { UserserviceService } from '../userservice.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogueboxComponent } from '../dialoguebox/dialoguebox.component';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  constructor(public callservice:CallserviceService, public userservice:UserserviceService, private dialog: MatDialog) { }

  userid:any;
  ngOnInit(): void {
    this.userid = localStorage.getItem('myid') != null ?localStorage.getItem('myid'): '';
    console.log(this.userid);
    this.callservice.openconnection(this.userid);
    console.log(this.userservice.users);
    this.userservice.getUserFriends(this.userid);

  }


  name:string = '';
  id:string ='';
  callerid:string ='';
  message:string = '';
  stream:any;


  sendMessage(){
    this.callservice.sendMessages(this.message);
  }

  async VideoCall(myid:string,userid:string){
    this.callservice.VideoCall(userid, myid);
  }
  connect(){
    localStorage.setItem("myid",this.id);
    this.callservice.openconnection(this.id);
  }

  call(){
    console.log(`${this.name} ${this.id} ${this.callerid}`)
    this.callservice.connectToPeer(this.id,this.callerid);
  }

  logout(){
    this.userservice.logout();
  }

}
