package com.nagarro.exam.exam.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashSet;
import java.util.Set;

import com.nagarro.exam.exam.model.User;
import com.nagarro.exam.exam.model.UserRole;
import com.nagarro.exam.exam.model.Role;
import com.nagarro.exam.exam.service.UserService;

@RestController

@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
    
	
	@Autowired
	private UserService userService;
	
	@Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

	
	@PostMapping("/")
	public User createUser(@RequestBody User user) throws Exception {
		
//		System.out.println("*******************");
		user.setProfile("default.png");
		user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));

		Set<UserRole> s=new HashSet<>();
		Role role=new Role();
		    role.setRoleId(45L);
		    role.setRoleName("NORMAL");
		 UserRole userRole=new UserRole();
		  userRole.setRole(role);
		  userRole.setUser(user);
		  s.add(userRole);
		  return this.userService.createUser(user, s);
	}
	@GetMapping("/{username}")
	public User getUser(@PathVariable("username") String username){
	    	return this.userService.getUser(username);
	}
	
	@DeleteMapping("/{userId}")
	public void DeleteUser(@PathVariable("userId") Long userId) {
		  this.userService.deleteUser(userId);
	}
	
}
