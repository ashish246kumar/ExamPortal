package com.nagarro.exam.exam.service;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nagarro.exam.exam.helper.UserFoundException;
import com.nagarro.exam.exam.model.User;
import com.nagarro.exam.exam.model.UserRole;
import com.nagarro.exam.exam.repo.RoleRepository;
import com.nagarro.exam.exam.repo.UserRepository;

@Service
public class UserServiceImpl implements UserService{
 
	@Autowired
	private UserRepository userrepo;
	
	@Autowired
	private RoleRepository rolerepo;
	
	@Override
	public User createUser(User user, Set<UserRole> userRoles) throws Exception {
		    
		User local=userrepo.findByUsername(user.getUsername());
		if(local!=null) {
			  System.out.println("User is already there !!");
			  throw new UserFoundException();
		}
		else {
			 for (UserRole ur : userRoles) {
	                rolerepo.save(ur.getRole());
	            }

	            user.getUserRoles().addAll(userRoles);
	            local = this.userrepo.save(user);
	            
	       }

	        return local;
		
	}

	@Override
	public void deleteUser(Long userId) {
		
	 this.userrepo.deleteById(userId);
	}

	@Override
	public User getUser(String username) {
		
		return this.userrepo.findByUsername(username);
		
	}
      
}
