import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizes',
  templateUrl: './view-quizes.component.html',
  styleUrls: ['./view-quizes.component.css']
})
export class ViewQuizesComponent implements OnInit{
        
  constructor(private quiz:QuizService){

        }
        ngOnInit(): void{
              this.quiz.quizzes().subscribe((data:any)=>{
                 console.log(data);
                  this.quizes=data; 
              },
              (error)=>{
                       Swal.fire('Error !',"Error in Loading Data","error");
              }
              )
        }
        deleteQuiz(qId:any) {
               Swal.fire(
                {icon:'info',
               title:"Are you sure?",
              confirmButtonText:'Delete',
              showCancelButton: true, 
        }).then((result)=>{
            if(result.isConfirmed){
               this.quiz.deleteQuiz(qId).subscribe((data)=>{
                  this.quizes=this.quizes.filter((quiz)=>quiz.qid!=qId);
                  Swal.fire('Success','Quiz deleted','success')
               },
               
               (error)=>{
                Swal.fire('Error','Error in deleting Quiz','error')
               }
               )
            }
        })
        // console.log("******************"+qId);
        }
  
  quizes=[
              {
                qid:0,
                title:'',
                description:'',
                maxMarks:'',
                numberOfQuestion:'',
                active:'',
                category:{
                    title:''
                }
              },
              
         ]
}
