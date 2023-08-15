import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-loadquiz',
  templateUrl: './loadquiz.component.html',
  styleUrls: ['./loadquiz.component.css']
})
export class LoadquizComponent implements OnInit{
  quizComntainer:any;
  cid1:any;
  ngOnInit(): void {
     this.actRoute.params.subscribe((params)=>{
      this.cid1=params['cid'];
      if(this.cid1==0){
        this.quiz.getActiveQuizzes().subscribe((data:any)=>{
             this.quizComntainer=data;
             
       },
       (error)=>{
         Swal.fire("Error!!","Error in Loading Quiz","error");
       }
       )
   }
   else{
   this.quiz.getQuizzesOfCategory(this.cid1).subscribe((data:any)=>{
        this.quizComntainer=data;  
   },
   (error)=>{
        Swal.fire("Error!!","Error in Loading Quiz","error");
   }
   )
 }
     });
      
  }
  
  constructor(private quiz:QuizService,private actRoute:ActivatedRoute){

  }

    

}
