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
  called:Boolean = false;
  mystream:any;
  myCall:any;
  videotrack:any
  connCall:any;
  audiotrack:any
  cid:any;
  
   peer:any;
  connectToPeer(myid:string,callerid:string){
    this.conn = this.peer.connect(callerid);
    this.cid = callerid;
    console.log(this.conn);
    this.conn.on('open',()=>{
     this.conn.send("Hello from"+myid);
    }) 
    this.conn.on('close',()=>{
      window.location.href = "/userlist";
    })
  }

  openconnection(myid:string){
    this.peer= new Peer(myid);
    console.log(this.peer);
    this.recieveCall();
    this.RecieveCall();
  }

  sendMessages(message:string){
    this.conn.send(message);
    
  }

  muteAudio(){
    for (let conns in this.peer.connections) {
      this.peer.connections[conns].forEach((conn:any) => {
    console.log(conn.peerConnection.getSenders())
        const sender = conn.peerConnection.getSenders();
        sender[1].replaceTrack(this.mystream.getVideoTracks()[0]);
      sender[0].replaceTrack(this.mystream.getAudioTracks()[0]);
      })}
  }

  closeCall(){
    console.log(this.peer.connections);
    for (let conns in this.peer.connections) {
      this.peer.connections[conns].forEach((conn:any) => {
        conn.peerConnection.close();
        // close it using peerjs methods
        if (conn.close) {
            conn.close();
        }
      })}
      this.mystream.getTracks().forEach((track: { stop: () => any; }) => track.stop())
      //this.stream.getTracks().forEach((track: { stop: () => any; }) => track.stop())
      window.location.href = "/userlist"
    
  }
  recieveCall(){
    if(this.peer != undefined){
    this.peer.on("connection", (conn:any) => {
      this.connCall = conn;
      conn.on("data", (data:any) => {
        // Will print 'hi!'
        console.log(data);
      });
      conn.on("open", () => {
        conn.send("hello!");
      });
      conn.on("close",()=>{
        window.location.href = '/userlist';
      })
    })
  }
  }
  async RecieveCall(){
    this.peer.on("call", async (call:any) => {

      call.on('close',()=>{
        window.location.href = "/userlist"
      })
      
      const answer = confirm("You are recieving a call, answer ??");

      if(answer){

      let stream = await navigator.mediaDevices.getUserMedia(
        { video: true, audio: true })
        this.myCall = call;
                 this.mystream = stream;
                 this.called = true;
                 this.videotrack = stream.getVideoTracks()[0];
                 this.audiotrack = stream.getAudioTracks()[0];
          call.answer(stream);

          call.on('close',()=>{
            window.location.href = "/userlist"
          })
          
          call.on('error',()=>{
            alert("error");
          })
          // Answer the call with an A/V stream.
          call.on("stream", (remoteStream:any) => {
            console.log(remoteStream);
            this.stream = remoteStream;
            this.called = true;
        })
      }
      else{
        call.close();
        console.log('declined the call');
      }


    });

  
  }
  async VideoCall(callerid:string){
    const stream = await navigator.mediaDevices.getUserMedia(
      { video: true, audio: true });
this.mystream = stream;

this.called = true;
this.videotrack = stream.getVideoTracks()[0];
this.audiotrack = stream.getAudioTracks()[0];
console.log(this.mystream);
        const call = this.peer.call(callerid,stream);
        call.on("stream", (remoteStream:any) => {
          this.stream = remoteStream;
          this.RecieveCall();
          this.called = true;
        });
        call.on('close',()=>{
          window.location.href = '/userlist';
        })
      }


}