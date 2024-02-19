import { Component, OnInit } from '@angular/core';
import {DataConnection, Peer} from 'peerjs';
import { CallserviceService } from '../callservice.service';

@Component({
  selector: 'app-videocall',
  templateUrl: './videocall.component.html',
  styleUrls: ['./videocall.component.scss']
})
export class VideocallComponent implements OnInit {

  
  constructor(public callservice:CallserviceService) { 
  }


  videoOn:Boolean = true;
audioOn :Boolean = true;
showchat:Boolean = true;
message = '';
screenshareOn:Boolean = false;
screencapture :any
wasVideoon:Boolean = false;

SendMessages(){
  if(this.callservice.icalled){
    this.callservice.sendMessagetoReciever(this.message);
  }
  else{
    this.callservice.sendMessagesToCaller(this.message);
  }

  this.message = '';
}

  removeVideo(){

    console.log("removevid")
    let stream = this.callservice.mystream;

    this.callservice.mystream.getVideoTracks().forEach((track:any)=>{

      if(!track.label.toString().includes('window')){
        stream.removeTrack(track);
      }
    })
    this.callservice.mystream.removeTrack(this.callservice.videotrack);

    this.callservice.mystream.getVideoTracks().length == 0 ? (<HTMLVideoElement>document.getElementById('mystream')).srcObject = null : null
    this.callservice.mystream = stream;
    this.callservice.muteAudio();
  }

  addVideo(){

    console.log("addvideo")
    if(this.callservice.mystream.getVideoTracks().length >1){

      let count = 0;
      this.callservice.mystream.getVideoTracks().forEach((track:any)=>{

        if(!track.label.toString().includes("window")){
          count = count + 1;
        }
      })
      if(count == 0){
        this.callservice.mystream.addTrack(this.callservice.videotrack);
        console.log(this.callservice.mystream.getVideoTracks());
        (<HTMLVideoElement>document.getElementById('mystream')).srcObject = this.callservice.mystream;
      }

    }
    else{

    this.callservice.mystream.addTrack(this.callservice.videotrack);
    console.log(this.callservice.mystream.getVideoTracks());
    (<HTMLVideoElement>document.getElementById('mystream')).srcObject = this.callservice.mystream;

    }
    
    this.callservice.muteAudio();
  }

  ToggleAudio(){
    if(this.audioOn){
      this.removeAudio();
      this.audioOn = !this.audioOn
    }
    else{
      this.addAudio();
      this.audioOn = !this.audioOn
    }

  }

  toggleVideo(){
    console.log(this.videoOn);
    if(this.videoOn){
      this.removeVideo();
      this.videoOn = !this.videoOn
    }
    else{
      this.addVideo();
      this.videoOn = !this.videoOn
    }
  }
  
  removeAudio(){
    this.callservice.mystream.removeTrack(this.callservice.audiotrack);
    
    this.callservice.muteAudio();
    }

  addAudio(){
    this.callservice.mystream.addTrack(this.callservice.audiotrack);
    
    this.callservice.muteAudio();
     }

     closeCall(){
      this.callservice.closeCall();
     }

     ToggleChat(){
 this.showchat = !this.showchat;
     }


     async screensharing(){
      const displayMediaOptions = {
        video: {
          displaySurface: "window",
        },
        audio: {
          suppressLocalAudioPlayback: false,
        },
        preferCurrentTab: false,
        selfBrowserSurface: "exclude",
        systemAudio: "include",
        surfaceSwitching: "include",
        monitorTypeSurfaces: "include",
      };

      this.screencapture = await (navigator.mediaDevices as any).getDisplayMedia(displayMediaOptions);

      if(this.videoOn){
        this.wasVideoon = true;
        
      this.callservice.mystream.removeTrack(this.callservice.mystream.getVideoTracks()[0]);
        this.callservice.mystream.addTrack(this.screencapture.getTracks()[0]);
        this.callservice.muteAudio();
      }
      
    this.screenshareOn = true;
      console.log(this.callservice.mystream.getVideoTracks());
      this.screencapture.getVideoTracks()[0].addEventListener('ended', async () => {
      
        if(this.wasVideoon){
        const getvid = await navigator.mediaDevices.getUserMedia({video:true}); 
        
        this.callservice.mystream.addTrack(getvid.getVideoTracks()[0]);
      console.log(this.callservice.mystream.getVideoTracks());
      
      this.callservice.mystream.removeTrack(this.callservice.mystream.getVideoTracks()[0]);
        this.callservice.muteAudio();
        this.videoOn = true;
      this.wasVideoon = false;  
      (<HTMLVideoElement>document.getElementById('mystream')).srcObject = this.callservice.mystream
      console.log("Innnnn");
      }
        else{
this.wasVideoon = false;
          this.videoOn = false;
          console.log("outtt");
        }
        //this.addVideo();
        //this.callservice.muteAudio();
        //this.screenshareOn = false;
        console.log("Ended");
        
    this.screenshareOn = false;
    });

      // let videlement = document.getElementById('')
      // this.screenshareOn = true;
      //this.callservice.mystream.addTrack(screencapture);

     }
     
     ngOnInit(): void {
  }


  

}
