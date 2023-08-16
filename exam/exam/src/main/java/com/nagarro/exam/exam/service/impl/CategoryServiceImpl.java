package com.nagarro.exam.exam.service.impl;

import java.util.HashSet;
import java.util.LinkedList;
import java.util.Set;
import java.util.LinkedHashSet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nagarro.exam.exam.model.exam.Category;
import com.nagarro.exam.exam.repo.CategoryRepository;
import com.nagarro.exam.exam.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService{

	@Autowired
    private CategoryRepository categoryRepository;
	@Override
	public Category addCategory(Category category) {
		
		 return this.categoryRepository.save(category);
	}

	@Override
	public Category updateCategory(Category category) {
		
		return this.categoryRepository.save(category);
	}

	@Override
	public Set<Category> getCategories() {
		
		return new LinkedHashSet<>(this.categoryRepository.findAll());
	}

	@Override
	public Category getCategory(Long categoryId) {
		
		return this.categoryRepository.findById(categoryId).get();
	}

	@Override
	public void deleteCategory(Long categoryId) {
		Category category = new Category();
        category.setCid(categoryId);
        this.categoryRepository.delete(category);
		
	}
    
	
}
