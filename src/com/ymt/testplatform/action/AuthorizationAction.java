package com.ymt.testplatform.action;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionSupport;
import com.ymt.testplatform.entity.Permission;
import com.ymt.testplatform.entity.User;
import com.ymt.testplatform.service.permission.PermissionService;
import com.ymt.testplatform.service.user.UserService;


@Controller
public class AuthorizationAction extends ActionSupport {

	private static final long serialVersionUID = 1L;

	@Resource
	private PermissionService permissionService;
	
	@Resource
	private UserService userService;

	private Integer userid;
	private List<Integer> newauthorization;
	private List<Permission> authorization;
	private String retCode;
	private String retMSG;

	public String getUserAuthorization(){
				
		User user = userService.findUserById(userid);

		if (user == null) {
			this.setRetMSG("该用户不存在");
			this.setRetCode("1001");
			return "success";
		}
		
		Integer userauth = user.getAuthorization();
		
		List<Permission> pers = permissionService.findAllPermissions();
		
		List<Permission> auth = new ArrayList<Permission>();
		
		for(int i = 0; i < pers.size(); i++) {
			Double d = Math.pow(2,pers.get(i).getId());
			
			if((userauth & d.intValue())!=0){
				auth.add(pers.get(i));
			}
		}
		this.setAuthorization(auth);
		this.setRetMSG("操作成功");
		this.setRetCode("1000");
		return "success";
	}
	
	public String updateAuthorization() {
		User user = userService.findUserById(userid);

		if (user == null) {
			this.setRetMSG("该用户不存在");
			this.setRetCode("1001");
			return "success";
		}
		
		Integer auth = 0;
		
		for(int i = 0; i < newauthorization.size(); i++) {
			if(permissionService.findPermissionById(newauthorization.get(i))!=null){
				Double d = Math.pow(2,newauthorization.get(i));
				auth += d.intValue();	
			}
		}
		
		user.setAuthorization(auth);
		
		this.setRetMSG("权限更新成功");
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

	public List<Integer> getNewauthorization() {
		return newauthorization;
	}

	public void setNewauthorization(List<Integer> newauthorization) {
		this.newauthorization = newauthorization;
	}

	public List<Permission> getAuthorization() {
		return authorization;
	}

	public void setAuthorization(List<Permission> authorization) {
		this.authorization = authorization;
	}

}
