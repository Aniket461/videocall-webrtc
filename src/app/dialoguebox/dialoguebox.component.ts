import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CallserviceService } from '../callservice.service';

@Component({
  selector: 'app-dialoguebox',
  templateUrl: './dialoguebox.component.html',
  styleUrls: ['./dialoguebox.component.scss']
})
export class DialogueboxComponent implements OnInit {


  constructor( @Inject(MAT_DIALOG_DATA) public data: {message: string}, public callservice: CallserviceService) { }

  ngOnInit(): void {
  }

  AnswerCall(data:any){
    if(data){
      this.callservice.answer = true;
    }
    else{
      this.callservice.answer = false;
    }

    this.callservice.dialogclicked = true;
  }

}
