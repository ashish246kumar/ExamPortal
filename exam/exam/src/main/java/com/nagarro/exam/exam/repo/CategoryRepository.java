package com.nagarro.exam.exam.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nagarro.exam.exam.model.exam.Category;

public interface CategoryRepository extends JpaRepository<Category,Long>{
	

}
