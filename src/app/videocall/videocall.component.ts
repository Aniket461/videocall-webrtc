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


  ngOnInit(): void {
  }


  

}
