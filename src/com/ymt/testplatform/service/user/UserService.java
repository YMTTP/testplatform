package com.ymt.testplatform.service.user;

import java.util.List;
import java.util.Map;

import com.ymt.testplatform.entity.User;

public interface UserService {

	public void saveUser(User user);

	public void updateUser(User user);

	public User findUserById(int id);

	public User findUserByUsername(String username);

	public void deleteUser(User user);

	public List<User> findAllUsers(Integer pageIndex,Integer pageSize, Map<String, Object> map);
	
	public Long findPages(Integer pageSize, Map<String, Object> map);

	public User findUserByUsernameAndPassword(String username, String password);
	

}
