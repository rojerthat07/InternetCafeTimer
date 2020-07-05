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
  


  

  //to diplay minutes with leading zeroes
seconds_with_leading_zeros =(date = this.date) =>{ 
  return (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
}

ngOnInit():void{
  setInterval(()=>{
    //Creating new date object every seconds to match the current time
    this.date = new Date()
    this.formStart = `${this.hours12Format}:${this.date.getMinutes()}:${this.seconds_with_leading_zeros()}`;
    
    let allMinutes = this.date.getHours() * 60 + this.date.getMinutes() + this.formDuration;
    let getHour = (allMinutes/60);
    let rGetHour = Math.floor(getHour)
    let minutes = (getHour - rGetHour) * 60;
    let rMinutes = Math.round(minutes);
    this.formEnd = `${rGetHour}:${rMinutes}:${this.date.getSeconds()}`;
  },1000)
}

  //Forms Input 2 way data binding
  public formId:number = 1;
  public formName:string;
  public formStart:string =  `${this.hours12Format}:${this.seconds_with_leading_zeros()}:${this.date.getSeconds()}`;
  public formEnd:any;
  public formDuration:number = 0;
  public formBalance:string;

  public inputs:any[] = []

  constructor() { 

  
  }

  onFormSubmit = () =>{
    this.inputs.push({id:this.formId,name:this.formName,start:this.formStart,end:this.formEnd,duration:this.formDuration,balance:this.formBalance});
    this.formId++;
    console.log(this.date)
  }

}
