import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer-section',
  templateUrl: './timer-section.component.html',
  styleUrls: ['./timer-section.component.scss']
})
export class TimerSectionComponent implements OnInit {



  //Date and time
  public date:any = new Date();
  public hours12Format:string = (this.date.getHours() > 12 ?  this.date.getHours() - 12 : this.date.getHours() );


  ngOnInit():void{
 
  }

  //to diplay minutes with leading zeroes
seconds_with_leading_zeros =(date = this.date) =>{ 
  return (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
}

  //Forms Input 2 way data binding
  public formId:number = 1;
  public formName:string;
  public formStart:string =  `${this.hours12Format}:${this.seconds_with_leading_zeros()}:${this.date.getSeconds()}`;
  public formEnd:string;
  public formDuration:string;
  public formBalance:string;

  public inputs:any[] = []

  constructor() { 
   
  }

  onFormSubmit = () =>{
    this.inputs.push({id:this.formId,name:this.formName,start:this.formStart,end:this.formEnd,duration:this.formDuration,balance:this.formBalance});
    this.formId++;

  }

}
