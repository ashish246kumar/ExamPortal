import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }
  public getQuestionOfQuiz(qid:any){
        return this.http.get(`${baseUrl}/question/quiz/all/${qid}`)
  }
  public  addQuestion(question:any){
       return this.http.post(`${baseUrl}/question/`,question);
  }
  public deleteQuestion(qid:any){
    return this.http.delete(`${baseUrl}/question/${qid}`);
  }
  public evalQuiz(question:any){
        return this.http.post(`${baseUrl}/question/eval-quiz`,question)
  }
  public getQuestionOfQuizForTest(qid:any){
       return this.http.get(`${baseUrl}/question/quiz/${qid}`)
  }
  
}
