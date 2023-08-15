import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.css']
})
export class InstructionComponent implements OnInit{
  qid1:any;
  quiz:any;
  ngOnInit(): void {
  
    this.qid1=this.actRoute.snapshot.paramMap.get('qid')
    this. quizService.getQuiz(this.qid1).subscribe((data:any)=>{
            this.quiz=data;
    },
    (error)=>{
        Swal.fire("Error!!","Error in Loading Quiz","error")
    }
    )
  }
    constructor(private quizService:QuizService,private actRoute:ActivatedRoute,private route:Router){

    }

    start(){
        Swal.fire({
          title:'Do You Want To Start The Quiz',
          showCancelButton:true,
          confirmButtonText:`Start`,
          denyButtonText:`Don't Save`,
           icon:'info'
        }).then((result)=>{

          if(result.isConfirmed){
            this.route.navigate(['./start/'+this.qid1])
          }
          else if(result.isDenied){
              Swal.fire('Changes Are Not Saved','','info')
          }
        })
    }
}
