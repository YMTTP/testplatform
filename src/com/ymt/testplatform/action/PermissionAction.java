package com.ymt.testplatform.action;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionSupport;
import com.ymt.testplatform.entity.Permission;
import com.ymt.testplatform.service.permission.PermissionService;


@Controller
public class PermissionAction extends ActionSupport {

	private static final long serialVersionUID = 1L;

	@Resource
	private PermissionService permissionService;

	private Integer permissionid;
	private Permission permission;
	private Integer value;
	private String description;
	private List<Permission> permissions;
	private String retCode;
	private String retMSG;

	public String createPermission(){
		
		if(permissionService.findPermissionByValue(value)!=null){
			this.setRetMSG("值为" + value + "的权限已存在");
			this.setRetCode("1001");
			return "success";
		}
		
		Permission per = new Permission();
		
		per.setValue(value);
		per.setDescription(description);
		per.setDel(0);
		
		permissionService.savePermission(per);
		this.setRetMSG("创建权限成功");
		this.setRetCode("1000");
		return "success";
	}
	
	public String deletePermission(){
		Permission per = permissionService.findPermissionById(permissionid);
		
		if (per == null) {
			this.setRetMSG("该权限不存在");
			this.setRetCode("1001");
			return "success";
		}
		
		per.setDel(1);
		permissionService.savePermission(per);
		this.setRetMSG("删除权限成功");
		this.setRetCode("1000");
		return "success";
	}
	
	public String findPermissionById(){
		Permission per = permissionService.findPermissionById(permissionid);
		
		if (per == null) {
			this.setRetMSG("该权限不存在");
			this.setRetCode("1001");
			return "success";
		}
		this.setPermission(per);
		this.setRetMSG("查询权限成功");
		this.setRetCode("1000");
		return "success";
	}
	
	public String updatePermission() {
		Permission per = permissionService.findPermissionById(permissionid);
		
		if (per == null) {
			this.setRetMSG("该权限不存在");
			this.setRetCode("1001");
			return "success";
		}
		
		per.setDescription(description);
		per.setValue(value);
		
		permissionService.updatePermission(per);
		
		this.setRetMSG("权限更新成功");
		this.setRetCode("1000");
		return "success";
	}

	public String listPermissions() {	
		List<Permission> pers = new ArrayList<Permission>();
		pers = permissionService.findAllPermissions();
		this.setPermissions(pers);
		this.setRetMSG("操作成功");
		this.setRetCode("1000");
		return "success";
	}

	public String getRetMSG() {
		return retMSG;
	}

	public void setRetMSG(String retMSG) {
		this.retMSG = retMSG;
	}

	public String getRetCode() {
		return retCode;
	}

	public void setRetCode(String retCode) {
		this.retCode = retCode;
	}

	public List<Permission> getPermissions() {
		return permissions;
	}

	public void setPermissions(List<Permission> permissions) {
		this.permissions = permissions;
	}

	public Integer getPermissionid() {
		return permissionid;
	}

	public void setPermissionid(Integer permissionid) {
		this.permissionid = permissionid;
	}

	public Permission getPermission() {
		return permission;
	}

	public void setPermission(Permission permission) {
		this.permission = permission;
	}

	public Integer getValue() {
		return value;
	}

	public void setValue(Integer value) {
		this.value = value;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
