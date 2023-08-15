import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  
  constructor(private http:HttpClient){

  }
  public quizzes(){
      const quiz= this.http.get(`${baseUrl}/quiz/`);
      console.log(quiz);
      return quiz;
  }
   //add quiz
   public addQuiz(quiz:any) {
    return this.http.post(`${baseUrl}/quiz/`, quiz);
  }

  //delete quiz
  public deleteQuiz(qId:any) {

    
    
    return this.http.delete(`${baseUrl}/quiz/${qId}`);
    
  }

  //get the single quiz

  public getQuiz(qId:any) {
    
    
    return this.http.get(`${baseUrl}/quiz/${qId}`);
  }

  //update quiz
  public updateQuiz(quiz:any) {
    return this.http.put(`${baseUrl}/quiz/`, quiz);
  
  }
  //get quizzes of category
  public getQuizzesOfCategory(cid: any) {
    // cid=31;
    return this.http.get(`${baseUrl}/quiz/category/${cid}`);
  }
  //qet active quizzes
  public getActiveQuizzes() {
   

   return  this.http.get(`${baseUrl}/quiz/active`);
    
  }

  //get active quizzes of category
  public getActiveQuizzesOfCategory(cid:any) {
    return this.http.get(`${baseUrl}/quiz/category/active/${cid}`);
  }
  
}
