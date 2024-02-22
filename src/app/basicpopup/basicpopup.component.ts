import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CallserviceService } from '../callservice.service';

@Component({
  selector: 'app-basicpopup',
  templateUrl: './basicpopup.component.html',
  styleUrls: ['./basicpopup.component.scss']
})
export class BasicpopupComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data: {message: string}, public callservice: CallserviceService) { }

  ngOnInit(): void {
  }

}
