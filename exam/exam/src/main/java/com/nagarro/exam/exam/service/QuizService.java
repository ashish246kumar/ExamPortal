package com.nagarro.exam.exam.service;

import java.util.List;

import com.nagarro.exam.exam.model.exam.Category;
import com.nagarro.exam.exam.model.exam.Quiz;

import java.util.*;

public interface QuizService {
     
	 public Quiz addQuiz(Quiz quiz);

	    public Quiz updateQuiz(Quiz quiz);

	    public Set<Quiz> getQuizzes();

	    public Quiz getQuiz(Long quizId);

	    public void deleteQuiz(Long quizId);


	    public List<Quiz> getQuizzesOfCategory(Category category);

	    public List<Quiz> getActiveQuizzes();

	    public List<Quiz> getActiveQuizzesOfCategory(Category c);
}
