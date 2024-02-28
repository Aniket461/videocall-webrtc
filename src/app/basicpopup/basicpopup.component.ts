import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CallserviceService } from '../callservice.service';
import { HttpClient } from '@angular/common/http';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-basicpopup',
  templateUrl: './basicpopup.component.html',
  styleUrls: ['./basicpopup.component.scss'],
})
export class BasicpopupComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      message: string;
      isfuncPresent: boolean;
      buttonText: string;
      friendid: any;
    },
    public callservice: CallserviceService,
    public userservice:UserserviceService,
    public http:HttpClient
  ) {}


  deleteFriend(friendid:any){
    this.userservice.removeFriend(friendid);
  }

  ngOnInit(): void {}
}
