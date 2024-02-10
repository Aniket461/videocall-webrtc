import { Injectable } from '@angular/core';
import {DataConnection, Peer} from 'peerjs';
import { UserlistComponent } from './userlist/userlist.component';
@Injectable({
  providedIn: 'root'
})
export class CallserviceService {

  constructor() { }
  conn:any;
  stream:any;
  mystream:any;
  myid = localStorage.getItem("myid");
   peer:any;
  connectToPeer(myid:string,callerid:string){
    this.conn = this.peer.connect(callerid);
    console.log(this.conn);
    this.conn.on('open',()=>{
     this.conn.send("Hello from"+myid);
    }) 
  }

  openconnection(myid:string){
    this.peer= new Peer(myid);
    this.recieveCall();
    this.RecieveCall();
  }

  sendMessages(message:string){
    this.conn.send(message);
  }

  recieveCall(){
    if(this.peer != undefined){
    this.peer.on("connection", (conn:any) => {
      conn.on("data", (data:any) => {
        // Will print 'hi!'
        console.log(data);
      });
      conn.on("open", () => {
        conn.send("hello!");
      });
    })
  }
  }
  async RecieveCall(){
    this.peer.on("call", async (call:any) => {
      let stream = await navigator.mediaDevices.getUserMedia(
        { video: true, audio: true })
        
                 this.mystream = stream;
          call.answer(stream); // Answer the call with an A/V stream.
          call.on("stream", (remoteStream:any) => {
            console.log(remoteStream);
            this.stream = remoteStream;
        })
    });
  }

  async VideoCall(callerid:string){
    const stream = await navigator.mediaDevices.getUserMedia(
      { video: true, audio: true });
this.mystream = stream;
console.log(this.mystream);
        const call = this.peer.call(callerid,stream);
        call.on("stream", (remoteStream:any) => {
          this.stream = remoteStream;
          this.RecieveCall();
        })
      }


}
