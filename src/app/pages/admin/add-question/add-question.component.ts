import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit{
  qid1:any;
  title:any;
 
  public Editor = ClassicEditor;
  ngOnInit(): void {
    
    this.title=this.actroute.snapshot.paramMap.get('title');
    
  }
  constructor(private qnservice:QuestionService,private actroute:ActivatedRoute,private snack:MatSnackBar){
             
  }
  
  container={
    quiz:{
      qid:''
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:''
    
      
  }
  questionadd(){
    if(this.container.content.trim()==''||this.container.content.trim()==null){
        return;
    }
    if(this.container.option1.trim()==''||this.container.option1.trim()==null){
      return;
  }
  if(this.container.option2.trim()==''||this.container.option2.trim()==null){
    return;
}
if(this.container.option3.trim()==''||this.container.option3.trim()==null){
  return;
}
if(this.container.option4.trim()==''||this.container.option4.trim()==null){
  return;
}
if(this.container.answer.trim()==''||this.container.answer.trim()==null){
  return;
}
this.qid1=this.actroute.snapshot.paramMap.get('qid');
this.container.quiz.qid=this.qid1

this.qnservice.addQuestion(this.container).subscribe((data:any)=>{
          Swal.fire("Sucess","Question Added Sucessfully","success")
          this.container.content='',
          this.container.option1='',
          this.container.option2='',
          this.container.option3='',
          this.container.option4='',
          this.container.answer=''
},
(error)=>{
  Swal.fire('Error','Error in adding Question','error')
}
)
  }

     
}
