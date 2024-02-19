import { Injectable } from '@angular/core';
import {DataConnection, Peer} from 'peerjs';
import { UserlistComponent } from './userlist/userlist.component';
import { UserserviceService } from './userservice.service';
@Injectable({
  providedIn: 'root'
})
export class CallserviceService {

  constructor() { }


  conn:any;
  icalled:boolean = false;
  conn2:any;
  stream:any;
  called:Boolean = false;
  mystream:any;
  myCall:any;
  videotrack:any
  connCall:any;
  audiotrack:any
  cid:any;
  messages:any = [];
   peer:any;
  connectToPeer(myid:string,callerid:string){
    this.conn = this.peer.connect(callerid);
    this.cid = callerid;
    this.conn.on('open',()=>{
    }) ;
    this.conn.on('data',(data:any)=>{

      this.messages.push({"id":"reciever","message":data});
      
      if(data == "No call"){
        this.closeCall();
      }
    })
    this.conn.on('close',()=>{
      window.location.href = "/userlist";
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

  muteAudio(from:boolean = false){


    for (let conns in this.peer.connections) {
      this.peer.connections[conns].forEach((conn:any) => {
    console.log(conn.peerConnection.getSenders())
        const sender = conn.peerConnection.getSenders();

        sender[1] != undefined ?sender[1].replaceTrack(this.mystream.getVideoTracks()[0]):null;
        sender[0] != undefined ?sender[0].replaceTrack(this.mystream.getAudioTracks()[0]):null;
      })}
  }

  closeCall(){
    for (let conns in this.peer.connections) {
      this.peer.connections[conns].forEach((conn:any) => {
        conn.peerConnection.close();
        // close it using peerjs methods
        if (conn.close) {
            conn.close();
        }
      })}
      this.mystream != undefined ?this.mystream.getTracks().forEach((track: { stop: () => any; }) => track.stop()):null
      this.stream != undefined ?this.stream.getTracks().forEach((track: { stop: () => any; }) => track.stop()):null
      window.location.href = "/userlist"
    
  }
  recieveCall(){
    this.peer.on("connection", (conn:any) => {
      this.connCall = conn;
      this.conn2 = conn;
      conn.on("data", (data:any) => {
      
        this.messages.push({"id":"reciever","message":data});

        if(data == "No call"){
          this.closeCall();
        }
      });
      conn.on("open", () => {
      });
      conn.on("close",()=>{
        window.location.href = '/userlist';
      })
    })
  }
  async RecieveCall(){
    this.peer.on("call", async (call:any) => {
      call.on('close',()=>{
        window.location.href = "/userlist"
      })
      
      const answer = confirm("You are recieving a call, answer ??");

      if(answer){
    this.icalled = false;
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
            
            this.stream = remoteStream;
            this.called = true;
        })
      }
      else{
        this.conn2.send("No call");
        call.close();
        this.closeCall();
      }


    });

  
  }

sendMessagetoReciever(message:string){
  this.conn.send(message);
  this.messages.push({"id":"sender","message":message})
}
  sendMessagesToCaller(message:string){
    this.conn2.send(message)
    this.messages.push({"id":"sender","message":message})
  }


  async VideoCall(callerid:string, myid:string){
    
    this.connectToPeer(myid,callerid);
    this.icalled = true;
    const stream = await navigator.mediaDevices.getUserMedia(
      { video: true, audio: true });
this.mystream = stream;

this.called = true;
this.videotrack = stream.getVideoTracks()[0];
this.audiotrack = stream.getAudioTracks()[0];
        const call = await this.peer.call(callerid,stream);
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