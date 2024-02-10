import { Component, OnInit } from '@angular/core';
import { CallserviceService } from '../callservice.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  constructor(public callservice:CallserviceService) { }

  ngOnInit(): void {
  }


  name:string = '';
  id:string ='';
  callerid:string ='';
  message:string = '';
  stream:any;


  sendMessage(){
    this.callservice.sendMessages(this.message);
  }

  async VideoCall(){
  //  this.stream =  await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  //  console.log(this.stream);
  //  //this.stream = window.URL.createObjectURL(this.stream);
    this.callservice.VideoCall(this.callerid);
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
