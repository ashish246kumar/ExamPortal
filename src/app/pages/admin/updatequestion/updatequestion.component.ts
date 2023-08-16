import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updatequestion',
  templateUrl: './updatequestion.component.html',
  styleUrls: ['./updatequestion.component.css']
})
export class UpdatequestionComponent implements OnInit{
  qnsId:any;
  title:any;
  qid:any;
  qnsContainer:any={
     
   
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:''

  };
  ngOnInit(): void {
   
    this.qnsId=this.actRoute.snapshot.paramMap.get('qnsId');
    this.qnsContainer=this.question.getQuestionByQuestionId(this.qnsId).subscribe((data:any)=>{
            this.qnsContainer=data;
    },
      (error)=>{
        Swal.fire("Error!!","Error in Loading Question","error");
      }
    )

  }
      
  constructor(private actRoute:ActivatedRoute,private question:QuestionService,private router:Router){

  }
  updateqns(){
    console.log(this.qnsContainer);
   this.title=this.qnsContainer.quiz.title;
   this.qid=this.qnsContainer.quiz.qid;
    this.question.updateQuestion(this.qnsContainer).subscribe((data:any)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Update has been done sucessfully',
        showConfirmButton: false,
        timer: 1500
      }).then((result) => {
        
        if (result.dismiss === Swal.DismissReason.timer) {
          this.router.navigate(['/admin/add-question',this.qid,this.title]);
        }
      });
    
        
    },
      (error)=>{
            Swal.fire("Error!!", "Error in updating data","error")
      }
    )
  }
  

}
