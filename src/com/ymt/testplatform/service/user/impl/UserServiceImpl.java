package com.ymt.testplatform.service.user.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;









import com.ymt.testplatform.dao.BaseDAO;
import com.ymt.testplatform.entity.Department;
import com.ymt.testplatform.entity.Position;
import com.ymt.testplatform.entity.User;
import com.ymt.testplatform.service.user.UserService;

@Service("userService")
public class UserServiceImpl implements UserService {

	@Resource
	private BaseDAO<User> userDAO;
	
	@Resource
	private BaseDAO<Department> deparmentDAO;
	
	@Resource
	private BaseDAO<Position> postionDAO;


	@Override
	public void saveUser(User user) {
		userDAO.save(user);
	}

	@Override
	public void updateUser(User user) {
		userDAO.update(user);
	}

	@Override
	public User findUserById(int id) {
		return userDAO.get("from User where id = ? and del=0", new Object[] { id });
	}

	@Override
	public User findUserByUsername(String username) {
		return userDAO.get(" from User u where u.username = ? and u.del = 0",
				new Object[] { username });
	}

	@Override
	public void deleteUser(User user) {
		userDAO.delete(user);
	}

	@Override
	public List<User> findAllUsers(Integer pageIndex, Integer pageSize, Map<String, Object> map) {
		return userDAO.findByHql("from User where del = 0", map, pageSize, pageIndex);
	}
	
	@Override
	public Long findPages(Integer pageSize, Map<String, Object> map){
		String hql = "select count(*) from User where del = 0";
		Long pages = userDAO.count(hql, map);
		if(pages%20!=0){
			pages = pages/20 + 1;
		}else{
			pages = pages/20;
		}
		return pages;
	}
	
	@Override
	public User findUserByUsernameAndPassword(String username, String password) {
		return userDAO.get(
				" from User u where u.username = ? and u.password = ? and u.del = 0",
				new Object[] { username, password });
	}
	

}
