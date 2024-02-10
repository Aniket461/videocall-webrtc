import { Component, OnInit } from '@angular/core';
import { CallserviceService } from '../callservice.service';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  constructor(public callservice:CallserviceService, public userservice:UserserviceService) { }

  userid:any;
  ngOnInit(): void {
    this.userid = localStorage.getItem('myid') != null ?localStorage.getItem('myid'): '';
    this.callservice.openconnection(this.userid);

  }


  name:string = '';
  id:string ='';
  callerid:string ='';
  message:string = '';
  stream:any;


  sendMessage(){
    this.callservice.sendMessages(this.message);
  }

  async VideoCall(userid:string){
    this.callservice.VideoCall(userid);
  }
  connect(){
    localStorage.setItem("myid",this.id);
    this.callservice.openconnection(this.id);
  }

  call(){
    console.log(`${this.name} ${this.id} ${this.callerid}`)
    this.callservice.connectToPeer(this.id,this.callerid);
  }

  userlist = [{name:"Aniket Surve",id:"Aniket461"},
  {name:"Aishwarya Chordia",id:"Aishwarya20"}]


}
