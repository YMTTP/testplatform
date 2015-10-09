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
import com.ymt.testplatform.util.Utils;


@Controller
public class AuthorizationAction extends ActionSupport {

	private static final long serialVersionUID = 1L;

	@Resource
	private PermissionService permissionService;
	
	@Resource
	private UserService userService;

	private Integer userid;
	private Integer permissionid;
	private String newauthorization;
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
		
		// magic here, don't touch
		for(int i = 0; i < pers.size(); i++) {
			Double d = Math.pow(2,pers.get(i).getValue());
			
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
		
		String[] newauths = newauthorization.split(",");
		
		for(int i = 0; i < newauths.length; i++) {
			Permission per = permissionService.findPermissionById(Integer.parseInt(newauths[i]));
			if(per!=null){
				Double d = Math.pow(2,per.getValue());
				auth += d.intValue();	
			}
		}
		
		user.setAuthorization(auth);
		userService.updateUser(user);
		
		this.setRetMSG("权限更新成功");
		this.setRetCode("1000");
		return "success";
	}

	public String authorized(){
		User user = userService.findUserById(userid);

		if (user == null) {
			this.setRetMSG("该用户不存在");
			this.setRetCode("1001");
			return "success";
		}
		
		Permission per = permissionService.findPermissionById(permissionid);
		
		if(per==null){
			this.setRetMSG("该权限不存在");
			this.setRetCode("1001");
			return "success";
		}
		
		if(Utils.authorized(user.getAuthorization(), per.getValue())){
			this.setRetMSG("有权限操作");
			this.setRetCode("1000");
			return "success";
		}else{
			this.setRetMSG("没有操作权限");
			this.setRetCode("1001");
			return "success";
		}		
	}
	
	public String getRetMSG() {
		return retMSG;
	}

	public Integer getUserid() {
		return userid;
	}

	public void setUserid(Integer userid) {
		this.userid = userid;
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

	public String getNewauthorization() {
		return newauthorization;
	}

	public void setNewauthorization(String newauthorization) {
		this.newauthorization = newauthorization;
	}

	public List<Permission> getAuthorization() {
		return authorization;
	}

	public void setAuthorization(List<Permission> authorization) {
		this.authorization = authorization;
	}

	public Integer getPermissionid() {
		return permissionid;
	}

	public void setPermissionid(Integer permissionid) {
		this.permissionid = permissionid;
	}

}
