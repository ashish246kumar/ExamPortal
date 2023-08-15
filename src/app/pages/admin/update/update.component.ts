import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit{
    qid:any=0;
    // container:any=[]
    formData:any={
      qid:0,
      title:'',
      description:'',
      maxMarks: '',
      numberOfQuestions: '',
      active: true,
      category: {
        cid: '',
      },
     }
     categories = [
      {
        cid: '',
        title: '',
        description: ''
        
        
      }
    ];
    
  constructor(private quiz:QuizService,private snack:MatSnackBar,private route: ActivatedRoute,
              private categoryService:CategoryService,private router:Router
    ){

    }  
  ngOnInit(): void {
    this.qid=this.route.snapshot.paramMap.get('qid');
    this.quiz.getQuiz(this.qid).subscribe((data)=>{
         this.formData=data;
       
    },
    (error)=>{
           Swal.fire('Error!!','error in loading data','error')
          
    }
    );
    this.categoryService.Categories().subscribe((data:any)=>{
          this.categories=data
    },
    (error)=>{
          Swal.fire('Error!','error in loading Data','error')
    }
    );

  }
   
  
  updateaData(){
       console.log(this.formData);
       this.quiz.updateQuiz(this.formData).subscribe((data:any)=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Update has been done sucessfully',
          showConfirmButton: false,
          timer: 1500
        }).then((result) => {
          
          if (result.dismiss === Swal.DismissReason.timer) {
            this.router.navigate(['/admin/quizzes']);
          }
        });
          
         
       },
       (error)=>{
         Swal.fire( "Error!!","error in updating Data","error"

         )
       }
       )
  }
}
