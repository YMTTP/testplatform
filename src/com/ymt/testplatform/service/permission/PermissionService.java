package com.ymt.testplatform.service.permission;

import java.util.List;

import com.ymt.testplatform.entity.Permission;

public interface PermissionService {
	
	public Permission findPermissionById(int id);
	
	public Permission findPermissionByValue(int value);
	
	public void savePermission(Permission permission);

	public void updatePermission(Permission permission);

	public void deletePermission(Permission permission);

	public List<Permission> findAllList(Integer pageIndex);
	
	public List<Permission> findAllPermissions();
	
	public Long findPages();

	

	

}
