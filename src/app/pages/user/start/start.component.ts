import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit{
  qid1:any;
  questionContainer:any;
  marksGot=0;
  CorrectAnswer=0;
  attempted=0;
  isSubmit=false;
  timer:any;
 
  ngOnInit(): void {
    this.previousBackButton();
    this.qid1=this.actRoute.snapshot.paramMap.get('qid');
    this.question.getQuestionOfQuizForTest(this.qid1).subscribe((data:any)=>{
      
      this.questionContainer=data;
      this.timer=this.questionContainer.length*2*60;
    
      this.questionContainer.forEach((item:any)=>{
           item['givenAnswer']='';
           
      })
      this.startTimer();
    },
    (error)=>{
            Swal.fire("Error!!","error in Loading Quiz","error");
    }
    )
  }
  constructor(private question:QuestionService,private actRoute:ActivatedRoute,private locationSt:LocationStrategy){
       
  } 
  previousBackButton(){
    history.pushState(null,'',location.href);
    this.locationSt.onPopState(()=>{

      history.pushState(null,'',location.href);
    })
  }
  submitQuiz(){

    Swal.fire({
      title: 'Are you Sure You Want To Submit quiz?',
      
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon:'info'
    }).then((result) => {
     
      if (result.isConfirmed) {
               
              this.evaluate();
      } 
    })
  }
  evaluate(){
     this.question.evalQuiz(this.questionContainer).subscribe((data:any)=>{
                 this.isSubmit=true;
                 this.marksGot=data.marksGot;
                 this.CorrectAnswer=data.correctAnswers;
                 this.attempted=data.attempted;
                 
     },
     (error)=>{
      Swal.fire({
        title: 'Sorry... No Question in this quiz',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
     }
     )
  }
  print(){
    window.print();
  }
  startTimer(){
     let t=window.setInterval(()=>{
        if(this.timer<=0){
          this.evaluate();
          clearInterval(t);
        }
        else{
           this.timer--;
        }
     },1000)
  }
  getFormattedTime(){
    let min=Math.floor(this.timer/60)
    let sec=this.timer-(min*60);
    return `${min}min:${sec}sec`
  }
}
