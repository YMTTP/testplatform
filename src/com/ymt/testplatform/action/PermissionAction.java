package com.ymt.testplatform.action;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

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
	private JSONObject ret = new JSONObject();

	public String createPermission(){
		
		if(permissionService.findPermissionByValue(value)!=null){
			ret.put("retCode", "1001");
			ret.put("retMSG", "值为" + value + "的权限已存在");
			return "success";
		}
		
		Permission per = new Permission();
		
		per.setValue(value);
		per.setDescription(description);
		per.setDel(0);
		
		permissionService.savePermission(per);
		ret.put("retCode", "1000");
		ret.put("retMSG", "创建权限成功");
		return "success";
	}
	
	public String deletePermission(){
		Permission per = permissionService.findPermissionById(permissionid);
		
		if (per == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该权限不存在");
			return "success";
		}
		
		per.setDel(1);
		permissionService.savePermission(per);
		ret.put("retCode", "1000");
		ret.put("retMSG", "删除权限成功");
		return "success";
	}
	
	public String findPermissionById(){
		Permission per = permissionService.findPermissionById(permissionid);
		
		if (per == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该权限不存在");
			return "success";
		}
		ret.put("per", per);
		ret.put("retCode", "1000");
		ret.put("retMSG", "查询权限成功");
		return "success";
	}
	
	public String updatePermission() {
		Permission per = permissionService.findPermissionById(permissionid);
		
		if (per == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该权限不存在");
			return "success";
		}
		
		per.setDescription(description);
		per.setValue(value);
		
		permissionService.updatePermission(per);

		ret.put("retCode", "1000");
		ret.put("retMSG", "权限更新成功");
		return "success";
	}

	public String listPermissions() {	
		List<Permission> pers = new ArrayList<Permission>();
		pers = permissionService.findAllPermissions();
		JSONArray ja = JSONArray.fromObject(pers);
		ret.put("pers", ja);
		ret.put("retCode", "1000");
		ret.put("retMSG", "操作成功");
		return "success";
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

	public JSONObject getRet() {
		return ret;
	}

	public void setRet(JSONObject ret) {
		this.ret = ret;
	}

}
