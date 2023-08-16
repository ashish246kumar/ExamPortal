package com.nagarro.exam.exam.controller;

import java.util.Collections;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nagarro.exam.exam.model.exam.Question;
import com.nagarro.exam.exam.service.QuestionService;
import com.nagarro.exam.exam.service.QuizService;
import com.nagarro.exam.exam.model.exam.*;
import java.util.*;
@RestController
@CrossOrigin("*")
@RequestMapping("/question")
public class QuestionController {
        
	 @Autowired
	    private QuestionService service;

	    @Autowired
	    private QuizService quizService;

	    //add question
	    @PostMapping("/")
	    public ResponseEntity<Question> add(@RequestBody Question question) {
	        return ResponseEntity.ok(this.service.addQuestion(question));
	    }
	    @PutMapping("/")
	    public ResponseEntity<Question> update(@RequestBody Question question) {
	        return ResponseEntity.ok(this.service.updateQuestion(question));
	    }
	    @GetMapping("/quiz/{qid}")
	    public ResponseEntity<?> getQuestionsOfQuiz(@PathVariable("qid") Long qid) {


	        Quiz quiz = this.quizService.getQuiz(qid);
	        Set<Question> questions = quiz.getQuestions();
	        List list = new ArrayList(questions);
	        if (list.size() > Integer.parseInt(quiz.getNumberOfQuestion())) {
	            list = list.subList(0, Integer.parseInt(quiz.getNumberOfQuestion() + 1));
	        }
	        List<Question> questionList =list;

	        for (Question q : questionList) {
	            q.setAnswer("");
	        }
	        Collections.shuffle(list);
	        return ResponseEntity.ok(list);


	    }
	    @GetMapping("/quiz/all/{qid}")
	    public ResponseEntity<?> getQuestionsOfQuizAdmin(@PathVariable("qid") Long qid) {
	        Quiz quiz = new Quiz();
	        quiz.setQid(qid);
	        Set<Question> questionsOfQuiz = this.service.getQuestionsOfQuiz(quiz);
	        return ResponseEntity.ok(questionsOfQuiz);




	    }
	    @GetMapping("/{quesId}")
	    public Question get(@PathVariable("quesId") Long quesId) {
	        return this.service.getQuestion(quesId);
	    }
	    @DeleteMapping("/{quesId}")
	    public void delete(@PathVariable("quesId") Long quesId) {
	        this.service.deleteQuestion(quesId);
	    }
	    @PostMapping("/eval-quiz")
	    public ResponseEntity<?> evalQuiz(@RequestBody List<Question> questions) {
//	        System.out.println("*****************************"+questions.get(0));
	        double marksGot = 0;
	        int correctAnswers = 0;
	        int attempted = 0;
	        for (Question q : questions) {
	            //single questions
	            Question question = this.service.get(q.getQuesId());
	            if (question.getAnswer().equals(q.getGivenAnswer())) {
	                //correct
	                correctAnswers++;

	                double marksSingle = Double.parseDouble(questions.get(0).getQuiz().getMaxMarks()) / questions.size();
	                //       this.questions[0].quiz.maxMarks / this.questions.length;
	                marksGot += marksSingle;

	            }

	            if (q.getGivenAnswer() != null) {
	                attempted++;
	            }

	        }
	        ;

	        Map<String, Object> map = Map.of("marksGot", marksGot, "correctAnswers", correctAnswers, "attempted", attempted);
	        return ResponseEntity.ok(map);

	    }


	    
}
