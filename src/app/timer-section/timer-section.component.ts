import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-timer-section',
  templateUrl: './timer-section.component.html',
  styleUrls: ['./timer-section.component.scss']
})
export class TimerSectionComponent implements OnInit {

  //to diplay minutes and seconds with leading zeroes
  seconds_with_leading_zeros =(date = this.date) =>{ 
    return (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
  }
  minutes_with_leading_zeros =(date = this.date) =>{ 
    return (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  }

  //Date and time
  public date:any = new Date();
  public hours12Format:string = (this.date.getHours() > 12 ?  this.date.getHours() - 12 : this.date.getHours() );

  //Forms Input 2 way data binding
  public formId:number = 1;
  public formName:string;
  public formStart:string =  `${this.hours12Format}:${this.seconds_with_leading_zeros()}:${this.date.getSeconds()}`;
  public formEnd:any;
  public formDuration:number = null;
  public formBalance:number;
  public totalBalance:number = null;
  public inputs:any[] = [];
  public endTime:any[] = [];


  ngOnInit():void{
    setInterval(()=>{
      //Creating new date object every seconds to match the current time
      this.date = new Date()
      this.formStart = `${this.hours12Format}:${this.minutes_with_leading_zeros()}:${this.seconds_with_leading_zeros()}`;
      
      //Calculating the end time by inputing duration in minutes
        //Converting it all to minutes
      let allMinutes = this.date.getHours() * 60 + this.date.getMinutes() + this.formDuration;
        //Converting minutes into hh:mm:ss time format
      let getHour = (allMinutes/60);
      let rGetHour = Math.floor(getHour)
      let minutes = (getHour - rGetHour) * 60;
      let rMinutes:any = Math.round(minutes);
        //Leading zeroes in minutes
      if(rMinutes < 10){
        rMinutes = '0' + rMinutes;
      }else{
        rMinutes =  rMinutes;
      }
      this.formEnd = `${(rGetHour > 12 ?  rGetHour - 12 : rGetHour )}:${rMinutes}:${this.seconds_with_leading_zeros(this.date)}`;

      //Checking if there is someone that his time is ended
      this.endTime.forEach(e =>{
        if(e == this.formStart){
          console.log("time is ended")

          //Play Time out audio
          let audio = new Audio();
          audio.src = "../../assets/audio/Time-out.mp3";
          audio.load();
          audio.play();
        }
        
      })
    },1000)
  }


  onFormSubmit = () =>{
    //Pushing data to the main inputs Array
    this.inputs.push({id:this.formId,name:this.formName,start:this.formStart,end:this.formEnd,duration:this.formDuration,balance:this.formBalance});
    this.formId++;
    //  
    this.endTime.push(this.formEnd);
    console.log(this.endTime)

    //Clearing the form
    this.formName = "";
    this.totalBalance += this.formBalance;
    this.formDuration = null;
    this.formBalance = null;

    //Play Pay Sound Effect
    let audio = new Audio();
    audio.src = "../../assets/audio/Pay.mp3";
    audio.load();
    audio.play();
  }

  getTableDataStatus = (id) => {

    this.inputs.forEach((e,index,array) =>{
      
  
      if(e.id == id){
        this.inputs.splice(index,1)
      }

    })
    
  }

}
