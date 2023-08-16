import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-question',
  templateUrl: './view-quiz-question.component.html',
  styleUrls: ['./view-quiz-question.component.css']
})
export class ViewQuizQuestionComponent implements OnInit{
  qid:any;
  title:any;
  question:any=[];
  i=0;
  ngOnInit(): void {
      this.qid=this.actroute.snapshot.paramMap.get('qid');
      this.title=this.actroute.snapshot.paramMap.get('title');
      this.i=this.i+1;
      
        this.qnsService.getQuestionOfQuiz(this.qid).subscribe((data:any)=>{
              this.question=data;
              console.log("**********************"+this.question);
              
        },
        (error)=>{
            Swal.fire("Error !!","Error in Loading Question","error");
        }
        );
        
      
  }
  constructor(private actroute:ActivatedRoute,private route:Router,private qnsService:QuestionService,private snack:MatSnackBar
    ){
            
              
  }



delete(questionId: any) {
  Swal.fire({
    icon: 'info',
    showCancelButton: true,
    confirmButtonText: 'Delete',
    title: 'Are you sure you want to delete this question?'
  }).then((result) => {
    if (result.isConfirmed) {
      this.qnsService.deleteQuestion(questionId).subscribe(
        (data: any) => {
          this.snack.open("Question Deleted", '', {
            duration: 3000,
          });
          this.question = this.question.filter((item: any) => item.quesId !== questionId);
        },
        (error) => {
          this.snack.open("Error in deleting Question", '', {
            duration: 3000,
          });
        }
      );
    }
  });
}
}