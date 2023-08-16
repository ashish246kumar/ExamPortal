package com.nagarro.exam.exam.repo;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nagarro.exam.exam.model.exam.Question;
import com.nagarro.exam.exam.model.exam.Quiz;

public interface QuestionRepository  extends  JpaRepository<Question,Long>{
	  Set<Question>findByQuiz(Quiz quiz);
}
