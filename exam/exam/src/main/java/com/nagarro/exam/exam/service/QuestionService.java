package com.nagarro.exam.exam.service;

import java.util.*;

import com.nagarro.exam.exam.model.exam.Question;
import com.nagarro.exam.exam.model.exam.Quiz;

public interface QuestionService {
	
	public Question addQuestion(Question question);

    public Question updateQuestion(Question question);

    public Set<Question> getQuestions();

    public Question getQuestion(Long questionId);

    public Set<Question> getQuestionsOfQuiz(Quiz quiz);

    public void deleteQuestion(Long quesId);

    public Question get(Long questionsId);
}
