package com.nagarro.exam.exam.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nagarro.exam.exam.model.Role;

public interface RoleRepository  extends JpaRepository<Role,Long>{
     
	
}
