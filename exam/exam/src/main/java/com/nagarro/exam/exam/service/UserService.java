package com.nagarro.exam.exam.service;

import java.util.Set;

import com.nagarro.exam.exam.model.User;
import com.nagarro.exam.exam.model.UserRole;

public interface UserService {
     public User createUser(User user,Set<UserRole> userRoles)throws Exception;
     public void deleteUser(Long userId);
     public User getUser(String username);
     
}
