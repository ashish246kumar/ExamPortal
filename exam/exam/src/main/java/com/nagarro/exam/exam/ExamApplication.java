package com.nagarro.exam.exam;

import org.springframework.beans.factory.annotation.Autowired;
import com.nagarro.exam.exam.model.User;
import com.nagarro.exam.exam.helper.UserFoundException;
import com.nagarro.exam.exam.model.Role;
import com.nagarro.exam.exam.model.UserRole;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashSet;
import java.util.Set;

//import java.util.Set;
import com.nagarro.exam.exam.service.UserService;

@SpringBootApplication
public class ExamApplication implements CommandLineRunner{
      
	@Autowired
    private UserService userService;
	
	@Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

	
	public static void main(String[] args) {
		SpringApplication.run(ExamApplication.class, args);
	}
	 @Override
	    public void run(String... args) throws Exception {
		   try {
		 User user=new User();
		 user.setFirstName("ashish");
		 user.setLastName("kumar");
		 user.setUsername("ashish123");
		 user.setPassword(this.bCryptPasswordEncoder.encode("123"));

		 user.setEmail("abc@gmail.com");
		 user.setProfile("default.png");
		 Role role1 = new Role();
         role1.setRoleId(44L);
         role1.setRoleName("ADMIN");
         Set<UserRole> userRoleSet = new HashSet<>();
         UserRole userRole = new UserRole();

         userRole.setRole(role1);

         userRole.setUser(user);

         userRoleSet.add(userRole);
         
         User user1 = this.userService.createUser(user, userRoleSet);
         System.out.println(user1.getUsername());
		 }
		 catch(UserFoundException e) {
			 e.printStackTrace();
		 }
		 
	 }
}
