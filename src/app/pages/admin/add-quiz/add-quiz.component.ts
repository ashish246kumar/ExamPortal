import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit{
       
  categories = [
    {
      cid: '',
      title: '',
      description: ''
      
      
    }
  ];
    constructor(private cat:CategoryService,private quz:QuizService,private snack:MatSnackBar){

    }
    
  ngOnInit(): void {
      this.cat.Categories().subscribe((data:any)=>{
        // console.log(data);
      this.categories=data;
    },
  (error)=>{
      Swal.fire("Error !!","Error in loading data","error");
   })
  }
  quizData = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: {
      cid: '',
    },
  };
  addQuiz(){
    if (this.quizData.title.trim() == '' || this.quizData.title == null) {
      this.snack.open('Title Required !!', '', {
        duration: 3000,
      });
      return;
    }
    this.quz.addQuiz(this.quizData).subscribe(
      (data) => {
        Swal.fire('Success', 'quiz is added', 'success');
        this.quizData = {
          title: '',
          description: '',
          maxMarks: '',
          numberOfQuestions: '',
          active: true,
          category: {
            cid: '',
          },
        };
       
      },

      (error) => {
        Swal.fire('Error!! ', 'Error while adding quiz', 'error');
        console.log(error);
      }
    );
  }

}
