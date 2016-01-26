package com.ymt.testplatform.action;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionSupport;
import com.ymt.testplatform.entity.Application;
import com.ymt.testplatform.entity.Token;
import com.ymt.testplatform.entity.User;
import com.ymt.testplatform.entity.Userinfo;
import com.ymt.testplatform.service.department.DepartmentService;
import com.ymt.testplatform.service.position.PositionService;
import com.ymt.testplatform.service.token.TokenService;
import com.ymt.testplatform.service.user.UserService;
import com.ymt.testplatform.util.Utils;

@Controller
public class UserAction extends ActionSupport {

	private static final long serialVersionUID = 1L;

	@Resource
	private UserService userService;
	
	@Resource
	private TokenService tokenService;
	
	@Resource
	private DepartmentService departmentService;
	
	@Resource
	private PositionService positionService;

	private Integer id;
	private User user;
	private Integer permissionid;
	private String permitted;
	private String username;
	private String password;
	private String newpassword;
	private String displayname;
	private Integer position;
	private String remark;
	private String telephone;
	private String cellphone;
	private Integer department;
	private String image;
	private String token;
	private Integer permissionvalue;
	private JSONObject ret = new JSONObject();
	private Integer pagesize;
	private Integer pageindex;


	public String register() {

		User user = userService.findUserByUsername(username);

		if (user != null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "用户名已存在！");
			return "success";
		}

		user = new User();
		user.setDisplayname(displayname);
		// 注册默认没有任何权限
		user.setAuthorization(0);
		user.setCreateTime(new Date());
		user.setUsername(username);
		user.setDel(0);

		String pwd = Utils.getRandomString(8);
		String encryptedPwd = Utils.md5Encryption(pwd);

		user.setPassword(encryptedPwd);

		// userinfo
		Userinfo userinfo = new Userinfo();
		userinfo.setCellphone(cellphone);
		userinfo.setRemark(remark);
		userinfo.setTelephone(telephone);
		if(department!=null){
			userinfo.setDepartment(departmentService.findDepartmentById(department));
		}
		if(position!=null){
			userinfo.setPosition(positionService.findPositionById(position));
		}		

		user.setUserInfo(userinfo);

		userService.saveUser(user);
		
		if(Utils.sendMail(username, "测试平台注册邮件", "初始密码为：" + pwd)){	
			ret.put("user", user);
			ret.put("retCode", "1000");
			ret.put("retMSG", "注册成功！");
			return "success";
		}else{
			ret.put("retCode", "1001");
			ret.put("retMSG", "激活邮件发送失败");
			return "success";
		}

	}

	public String changePassword() {

		String encryptedPwd = Utils.md5Encryption(password);
		
		User user = userService.findUserByUsernameAndPassword(username,
				encryptedPwd);

		if (user == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "用户名密码不正确");
			return "success";
		}

		user.setPassword(Utils.md5Encryption(newpassword));
		userService.updateUser(user);
		ret.put("retCode", "1000");
		ret.put("retMSG", "密码修改成功");
		return "success";
	}

	public String updateUserInfo() {

		User user = userService.findUserById(id);

		if (user == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该用户不存在");
			return "success";
		}

		user.setDisplayname(displayname);

		Userinfo userinfo = new Userinfo();
		userinfo.setCellphone(cellphone);
		userinfo.setRemark(remark);
		userinfo.setTelephone(telephone);
		userinfo.setDepartment(departmentService.findDepartmentById(department));
		userinfo.setPosition(positionService.findPositionById(position));

		user.setUserInfo(userinfo);
		userService.updateUser(user);

		ret.put("retCode", "1000");
		ret.put("retMSG", "更新成功");
		return "success";
	}

	public String forgetPassword() {
		
		User user = userService.findUserByUsername(username);

		if (user == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该用户不存在");
			return "success";
		}
		
		String pwd = Utils.getRandomString(8);
		String encryptedPwd = Utils.md5Encryption(pwd);
		
		user.setPassword(encryptedPwd);
		userService.saveUser(user);
		
		if(Utils.sendMail(username, "测试平台邮件", "新密码：" + pwd)){
			ret.put("retCode", "1000");
			ret.put("retMSG", "新密码发送成功！");
			return "success";
		}else{
			ret.put("retCode", "1001");
			ret.put("retMSG", "新密码发送失败");
			return "success";
		}

	}
	
	public String login(){
		
		User user = null;

		if (username == null || password == null) {

			ret.put("retCode", "1001");
			ret.put("retMSG", "用户名或密码不能为空！");
			return "success";
		}

		String password_md5 = Utils.md5Encryption(this.password);
		user = userService.findUserByUsernameAndPassword(username, password_md5);
		
		if (user != null) {		
			
			Token t = tokenService.findTokenByUserId(user.getId());
			if(t!=null){
				t.setToken(UUID.randomUUID().toString());
				tokenService.updateToken(t);
			}else{
				t = new Token();
				t.setUserid(user.getId());
				t.setToken(UUID.randomUUID().toString());
				t.setDel(0);
				tokenService.saveToken(t);
			}
			
			HttpServletResponse response = ServletActionContext.getResponse();
			Cookie cookie = new Cookie("userid",user.getId().toString());
			cookie.setPath("/");
			response.addCookie(cookie);
			cookie = new Cookie("token",tokenService.findTokenByUserId(user.getId()).getToken());
			cookie.setPath("/");
			response.addCookie(cookie);
			ret.put("displayname", user.getDisplayname());
			ret.put("retCode", "1000");
			ret.put("retMSG", user.getDisplayname() + "，欢迎回来！");
			return "success";
		} else {
			ret.put("retCode", "1001");
			ret.put("retMSG", "用户名或密码不正确！");
			return "success";
		}		
	}
	
	public String logout() {
		HttpServletResponse response = ServletActionContext.getResponse();
		Cookie cookie = new Cookie("userid",null);
		cookie.setPath("/");
		response.addCookie(cookie);
		cookie = new Cookie("token",null);
		cookie.setPath("/");
		response.addCookie(cookie);
		ret.put("retCode", "1000");
		ret.put("retMSG", "注销成功！");
		return "success";
	}



	public String findUserByID(){
		User user = userService.findUserById(id);

		if (user == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该用户不存在");
			return "success";
		}

		ret.put("retCode", "1000");
		ret.put("retMSG", "查询用户成功");
		ret.put("user", user);
		return "success";
	}
	
	public String deleteUserByID(){
		User user = userService.findUserById(id);

		if (user == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该用户不存在");
			return "success";
		}

		user.setDel(1);
		this.setUser(user);
		ret.put("retCode", "1000");
		ret.put("retMSG", "删除用户成功");
		return "success";
	}
	
	public String verifyToken(){
		
		String tk = null;
		Integer userid=-1;
		HttpServletRequest req = ServletActionContext.getRequest();
		Cookie[] cookies = req.getCookies();
		for(int i=0;i<cookies.length;i++){
			if(cookies[i].getName().equals("token")){
				tk = cookies[i].getValue();
				break;
			}
		}
		for(int i=0;i<cookies.length;i++){
			if(cookies[i].getName().equals("userid")){
				userid = Integer.parseInt(cookies[i].getValue());
				break;
			}
		}

		Token t = tokenService.findToken(userid, tk);
		
		if(t!=null){
			User user = userService.findUserById(userid);
			ret.put("displayname", user.getDisplayname());
			ret.put("username", user.getUsername());
			ret.put("retCode", "1000");
			ret.put("retMSG", "验证成功");
			return "success";
		}else{
			ret.put("retCode", "1001");
			ret.put("retMSG", "验证失败");
			return "success";
		}
	}
	
	public String adminLogin(){
		
		User user = null;

		if (username == null || password == null) {

			ret.put("retCode", "1001");
			ret.put("retMSG", "用户名或密码不能为空！");
			return "success";
		}

		
		String password_md5 = Utils.md5Encryption(this.password);
		user = userService.findUserByUsernameAndPassword(username, password_md5);
		
		if (user != null) {		
			
			if(!Utils.authorized(user.getAuthorization(), 1)){
				ret.put("retCode", "1001");
				ret.put("retMSG", "你没有该操作权限");
				return "success";
			}
			
			Token t = tokenService.findTokenByUserId(user.getId());
			if(t!=null){
				t.setToken(UUID.randomUUID().toString());
				tokenService.updateToken(t);
			}else{
				t = new Token();
				t.setUserid(user.getId());
				t.setToken(UUID.randomUUID().toString());
				t.setDel(0);
				tokenService.saveToken(t);
			}
			
			HttpServletResponse response = ServletActionContext.getResponse();
			Cookie cookie = new Cookie("userid",user.getId().toString());
			cookie.setPath("/");
			response.addCookie(cookie);
			cookie = new Cookie("token",tokenService.findTokenByUserId(user.getId()).getToken());
			cookie.setPath("/");
			response.addCookie(cookie);
			ret.put("displayname", user.getDisplayname());
			ret.put("retCode", "1000");
			ret.put("retMSG", user.getDisplayname() + "，欢迎回来！");
			return "success";
		} else {
			ret.put("retCode", "1001");
			ret.put("retMSG", "用户名或密码不正确！");
			return "success";
		}
	}
	
	public String listUsers(){
		List<User> us = new ArrayList<User>();
		HashMap<String, Object> conditions = new HashMap<String, Object>();
			
		if(this.displayname!=null&&!this.displayname.equals("")){
			conditions.put("displayname", this.displayname);
		}
		if(this.username!=null&&!this.username.equals("")){
			conditions.put("username", this.username);
		}
		
		us = userService.findAllUsers(pageindex, pagesize, conditions);
		Long pageNum = userService.findPages(pagesize, conditions);
		JSONArray ja = JSONArray.fromObject(us);
		ret.put("users", ja);
		ret.put("pagenum", pageNum);
		ret.put("retCode", "1000");
		ret.put("retMSG", "操作成功");
		return "success";
	}
	
	
	public String findUsersByPosition() {
	
		List<User> us = new ArrayList<User>();
		us = userService.findUsersByPosition(position);
		JSONArray ja = JSONArray.fromObject(us);
		ret.put("users", ja);
		ret.put("retCode", "1000");
		ret.put("retMSG", "操作成功");
		return "success";
	}
	
	public String verifyAuthorization(){
		User user = userService.findUserById(id);
		if(user==null){
			ret.put("auth", "false");
			ret.put("retCode", "1001");
			ret.put("retMSG", "创建人不存在");
			return "success";
		}
		
		if(!Utils.authorized(user.getAuthorization(), this.permissionvalue)){
			ret.put("auth", false);
			ret.put("retCode", "1001");
			ret.put("retMSG", "你没有该操作权限");
			return "success";
		}else{
			ret.put("auth", true);
			ret.put("retCode", "1000");
			ret.put("retMSG", "权限通过");
			return "success";
		}
	}
	
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getNewpassword() {
		return newpassword;
	}

	public void setNewpassword(String newpassword) {
		this.newpassword = newpassword;
	}

	public Integer getPosition() {
		return position;
	}

	public void setPosition(Integer position) {
		this.position = position;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getCellphone() {
		return cellphone;
	}

	public void setCellphone(String cellphone) {
		this.cellphone = cellphone;
	}

	public String getDisplayname() {
		return displayname;
	}

	public void setDisplayname(String displayname) {
		this.displayname = displayname;
	}

	public Integer getDepartment() {
		return department;
	}

	public void setDepartment(Integer department) {
		this.department = department;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}
	
	public Integer getPermissionid() {
		return permissionid;
	}

	public void setPermissionid(Integer permissionid) {
		this.permissionid = permissionid;
	}

	public String getPermitted() {
		return permitted;
	}

	public void setPermitted(String permitted) {
		this.permitted = permitted;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public Integer getPermissionvalue() {
		return permissionvalue;
	}

	public void setPermissionvalue(Integer permissionvalue) {
		this.permissionvalue = permissionvalue;
	}

	public JSONObject getRet() {
		return ret;
	}

	public void setRet(JSONObject ret) {
		this.ret = ret;
	}

	public Integer getPagesize() {
		return pagesize;
	}

	public void setPagesize(Integer pagesize) {
		this.pagesize = pagesize;
	}

	public Integer getPageindex() {
		return pageindex;
	}

	public void setPageindex(Integer pageindex) {
		this.pageindex = pageindex;
	}

}
