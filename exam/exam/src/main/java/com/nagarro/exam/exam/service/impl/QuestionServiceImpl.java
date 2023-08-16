package com.nagarro.exam.exam.service.impl;

import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nagarro.exam.exam.model.exam.Question;
import com.nagarro.exam.exam.model.exam.Quiz;
import com.nagarro.exam.exam.repo.QuestionRepository;
import com.nagarro.exam.exam.service.QuestionService;

@Service
public class QuestionServiceImpl implements QuestionService{

	 @Autowired
	    private QuestionRepository questionRepository;

	@Override
	public Question addQuestion(Question question) {
		
		return this.questionRepository.save(question);
	}

	@Override
	public Question updateQuestion(Question question) {
		
		 return this.questionRepository.save(question);
	}

	@Override
	public HashSet<Question> getQuestions() {
		
		 return new HashSet<>(this.questionRepository.findAll());
	}

	@Override
	public Question getQuestion(Long questionId) {
		
		  return this.questionRepository.findById(questionId).get();
	}

	@Override
	public HashSet<Question> getQuestionsOfQuiz(Quiz quiz) {
		
		return new HashSet<>(this.questionRepository.findByQuiz(quiz));
	}

	@Override
	public void deleteQuestion(Long quesId) {
	
		 Question question = new Question();
	        question.setQuesId(quesId);
	        this.questionRepository.delete(question);
	}

	@Override
	public Question get(Long questionsId) {
		
		 return this.questionRepository.getOne(questionsId);
	}
    
	
}
