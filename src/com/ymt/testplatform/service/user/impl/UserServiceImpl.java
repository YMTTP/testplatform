package com.ymt.testplatform.service.user.impl;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;











import com.ymt.testplatform.dao.BaseDAO;
import com.ymt.testplatform.entity.Department;
import com.ymt.testplatform.entity.Position;
import com.ymt.testplatform.entity.User;
import com.ymt.testplatform.service.user.UserService;
import com.ymt.testplatform.util.Utils;

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
		String queryString = " where del = 0 ";
		queryString = Utils.getQueryString(queryString, map);
		return userDAO.findByHql("from User" + queryString, map, pageSize, pageIndex);
	}
	
	@Override
	public Long findPages(Integer pageSize, Map<String, Object> map){
		String queryString = " where del = 0 ";
		queryString = Utils.getQueryString(queryString, map);
		
		String hql = "select count(*) from User";
		Long pages = userDAO.count(hql + queryString, map);
		if(pages%pageSize!=0){
			pages = pages/pageSize + 1;
			
		}else{
			pages = pages/pageSize;
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
