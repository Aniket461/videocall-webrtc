import { Injectable } from '@angular/core';
import {DataConnection, Peer} from 'peerjs';
import { UserlistComponent } from './userlist/userlist.component';
import { UserserviceService } from './userservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogueboxComponent } from './dialoguebox/dialoguebox.component';
import { firstValueFrom } from 'rxjs';
import { BasicpopupComponent } from './basicpopup/basicpopup.component';
@Injectable({
  providedIn: 'root'
})
export class CallserviceService {

  constructor(public snackbar:MatSnackBar,private dialog: MatDialog) { }


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
   callrecieved = false;
   dialogclicked = false;
   public answer = false;
  async connectToPeer(myid:string,callerid:string){
    this.conn = await this.peer.connect(callerid);
    console.log(this.conn);
    this.cid = callerid;

    this.conn.on('open',()=>{

    }) ;
    this.conn.on('data',(data:any)=>{

      console.log(data);
      
      if(data == "irecieve"){
        this.callrecieved = true;
      }
      else if(data == "No call"){
        this.closeCall();
      }
      else{
      this.messages.push({"id":"reciever","message":data});
      }
      
    })

    this.conn.on('close',()=>{
      window.location.href = "/userlist";
    });

    console.log(this.conn.dataChannel.readyState);


    setTimeout(()=>{
      if(!this.callrecieved){
        this.basicpopup("Call was not answered, redirecting to call list!!");
      }
    },15000)
    // if(this.conn.open){

    //   alert('The user is offline, Call cannot be placed!');
    //   window.location.href = '/userlist';

    // }
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

  
  
  async basicpopup(message:string){
    
    const dialogref = this.dialog.open(BasicpopupComponent,{data: { message: message }});
    dialogref.afterOpened().subscribe(res =>{
      setTimeout(()=>{
        window.location.href = "/userlist";
      },2000)
    })
   
  }


  async openDialog(message:string){
    
    this.dialogclicked = false;
    this.answer = false;
    const dialogref = this.dialog.open(DialogueboxComponent,{data: { message: message }})
    await firstValueFrom(dialogref.afterClosed());
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

      conn.on('error',(err:any)=>{

        console.log(err);
      })
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
      
      await this.openDialog("Would you like to to answer??");
      console.log(this.answer);
      

      
      if(this.answer){
    this.icalled = false;
      let stream = await navigator.mediaDevices.getUserMedia(
        { video: true, audio: true })
        this.myCall = call;
                 this.mystream = stream;
                 this.called = true;
                 this.videotrack = stream.getVideoTracks()[0];
                 this.audiotrack = stream.getAudioTracks()[0];
          call.answer(stream);
          this.conn2.send('irecieve')
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
    console.log(this.conn);
    const stream = await navigator.mediaDevices.getUserMedia(
      { video: true, audio: true });
this.mystream = stream;

this.called = true;
this.videotrack = stream.getVideoTracks()[0];
this.audiotrack = stream.getAudioTracks()[0];
        const call = await this.peer.call(callerid,stream);
        console.log(call);
          call.on("stream", (remoteStream:any) => {
            this.stream = remoteStream;
            this.RecieveCall();
            this.called = true;
          });
          call.on('close',()=>{
            window.location.href = '/userlist';
          })

          call.on('error',(err:any)=>{
            console.log(err);
          })
      }


}