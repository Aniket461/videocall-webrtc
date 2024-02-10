import { Component, OnInit } from '@angular/core';
import {DataConnection, Peer} from 'peerjs';

@Component({
  selector: 'app-videocall',
  templateUrl: './videocall.component.html',
  styleUrls: ['./videocall.component.scss']
})
export class VideocallComponent implements OnInit {

  
  conn:any;
  constructor() { 
  }
  connectToPeer(){
    const peer = new Peer("aniket");
    this.conn = peer.connect("surve");
    this.conn.on('open',()=>{
     this.conn.send("Hello!!");
    }) 
  }


  ngOnInit(): void {
    this.connectToPeer();
  }


  

}
