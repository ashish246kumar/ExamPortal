package com.nagarro.exam.exam.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nagarro.exam.exam.model.User;


public interface UserRepository  extends JpaRepository<User,Long> {
	
	public User findByUsername(String username);
	
}
