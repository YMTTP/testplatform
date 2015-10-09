package com.ymt.testplatform.service.permission.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ymt.testplatform.dao.BaseDAO;
import com.ymt.testplatform.entity.Permission;
import com.ymt.testplatform.service.permission.PermissionService;


@Service("permissionService")
public class PermissionServiceImpl implements PermissionService {

	@Resource
	private BaseDAO<Permission> permissionDAO;

	@Override
	public Permission findPermissionById(int id){
		return permissionDAO.get("from Permission where id = ? and del=0", new Object[] { id });
	}
	
	@Override
	public Permission findPermissionByValue(int value){
		return permissionDAO.get("from Permission where value = ? and del=0", new Object[] { value });
	}
	
	@Override
	public void savePermission(Permission permission) {
		permissionDAO.save(permission);
	}

	@Override
	public void updatePermission(Permission permission) {
		permissionDAO.update(permission);
	}

	@Override
	public void deletePermission(Permission permission) {
		permissionDAO.delete(permission);
	}

	@Override
	public List<Permission> findAllList(Integer pageIndex) {
		return permissionDAO.findByHql("from Permission where del=0", null, 20, pageIndex);
	}
	
	@Override
	public List<Permission> findAllPermissions(){
		return permissionDAO.find("from Permission where del=0");
	}
	
	@Override
	public Long findPages(){
		String hql = "select count(*) from Permission where del=0";
		Long pages = permissionDAO.count(hql);
		return pages;
	}
	


	

}
