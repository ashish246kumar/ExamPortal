package com.nagarro.exam.exam.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.nagarro.exam.exam.config.JwtUtils;
import com.nagarro.exam.exam.helper.UserNotFoundException;
import com.nagarro.exam.exam.model.JwtRequest;
import com.nagarro.exam.exam.model.JwtResponse;
import com.nagarro.exam.exam.model.User;
import com.nagarro.exam.exam.service.UserDetailsServiceImpl;

import java.security.Principal;

@RestController
@CrossOrigin("*")
public class AuthenticateController {
	
	 @Autowired
	    private AuthenticationManager authenticationManager;

	    @Autowired
	    private UserDetailsServiceImpl userDetailsService;

	    @Autowired
	    private JwtUtils jwtUtils;

	 private void authenticate(String username, String password) throws Exception {
		 
		 
		 try {

	            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));

	        } catch (DisabledException e) {
	            throw new Exception("USER DISABLED " + e.getMessage());
	        } catch (BadCredentialsException e) {
	            throw new Exception("Invalid Credentials " + e.getMessage());
	        }
	 }
	//generate token

	    @PostMapping("/generate-token")
	    public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception {

	        try {

	            authenticate(jwtRequest.getUsername(), jwtRequest.getPassword());


	        } catch (UserNotFoundException e) {
	            e.printStackTrace();
	            throw new Exception("User not found ");
	        }

	        

	        UserDetails userDetails = this.userDetailsService.loadUserByUsername(jwtRequest.getUsername());
	        System.out.println("userDetails:"+userDetails);
	        String token = this.jwtUtils.generateToken(userDetails);
	        System.out.println("token"+token);
	        return ResponseEntity.ok(new JwtResponse(token));


	    }
	    @GetMapping("/current-user")
	    public User getCurrentUser(Principal principal) {
//	    	System.out.println("****************");
//	    	System.out.println("principal"+principal.getName());
	        return ((User) this.userDetailsService.loadUserByUsername(principal.getName()));

	    }

}

