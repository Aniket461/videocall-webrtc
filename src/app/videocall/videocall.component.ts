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



  removeVideo(){
    this.callservice.mystream.removeTrack(this.callservice.videotrack);
    (<HTMLVideoElement>document.getElementById('mystream')).srcObject = null;
    this.videoOn = false;
  }

  addVideo(){
    this.callservice.mystream.addTrack(this.callservice.videotrack);
    (<HTMLVideoElement>document.getElementById('mystream')).srcObject = this.callservice.mystream;
    this.videoOn = true;
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
  
  removeAudio(){
    console.log(this.callservice.mystream.getVideoTracks())
    this.callservice.mystream.removeTrack(this.callservice.audiotrack);
    }

  addAudio(){
    this.callservice.mystream.addTrack(this.callservice.audiotrack);
     }

     closeCall(){
      this.callservice.closeCall();
     }

  ngOnInit(): void {
  }


  

}
