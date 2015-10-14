package com.ymt.testplatform.action;

import java.util.Date;
import java.util.Map;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
import org.apache.struts2.dispatcher.SessionMap;
import org.apache.struts2.interceptor.SessionAware;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionSupport;
import com.ymt.testplatform.entity.Token;
import com.ymt.testplatform.entity.User;
import com.ymt.testplatform.entity.Userinfo;
import com.ymt.testplatform.service.department.DepartmentService;
import com.ymt.testplatform.service.position.PositionService;
import com.ymt.testplatform.service.token.TokenService;
import com.ymt.testplatform.service.user.UserService;
import com.ymt.testplatform.util.Utils;

@Controller
public class UserAction extends ActionSupport implements SessionAware{

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
	private String retCode;
	private String retMSG;
	private SessionMap<String, Object> sessionMap;

	public String register() {

		// if (username == null) {
		// this.setRetMSG("用户名不能为空！");
		// return "success";
		// }

//		String reg = "^(\\w+((-\\w+)|(\\.\\w+))*)\\+\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$";
//
//		Pattern p = Pattern.compile(reg);
//		Matcher m = p.matcher(username);
//		if (!m.find()) {
//			this.setRetCode("1001");
//			this.setRetMSG("用户名不符合要求");
//			return "success";
//		}

		User user = userService.findUserByUsername(username);

		if (user != null) {
			this.setRetMSG("用户名已存在！");
			this.setRetCode("1001");
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
			this.setRetMSG("注册成功！");
			this.setRetCode("1000");
			return "success";
		}else{
			this.setRetMSG("激活邮件发送失败");
			this.setRetCode("1001");
			return "success";
		}
	}

	public String changePassword() {

		String encryptedPwd = Utils.md5Encryption(password);
		
		User user = userService.findUserByUsernameAndPassword(username,
				encryptedPwd);

		if (user == null) {
			this.setRetMSG("用户名密码不正确");
			this.setRetCode("1001");
			return "success";
		}

		user.setPassword(Utils.md5Encryption(newpassword));
		userService.updateUser(user);
		this.setRetMSG("密码修改成功");
		this.setRetCode("1000");
		return "success";
	}

	public String updateUserInfo() {

		User user = userService.findUserById(id);

		if (user == null) {
			this.setRetMSG("该用户不存在");
			this.setRetCode("1001");
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

		this.setRetMSG("跟新成功");
		this.setRetCode("1000");
		return "success";
	}

	public String forgetPassword() {
		
		User user = userService.findUserById(id);

		if (user == null) {
			this.setRetMSG("该用户不存在");
			this.setRetCode("1001");
			return "success";
		}
		
		String pwd = Utils.getRandomString(8);
		String encryptedPwd = Utils.md5Encryption(pwd);
		
		user.setPassword(encryptedPwd);
		userService.saveUser(user);
		
		if(Utils.sendMail(username, "测试平台邮件", "新密码：" + pwd)){
			this.setRetMSG("新密码发送成功！");
			this.setRetCode("1000");
			return "success";
		}else{
			this.setRetMSG("新密码发送失败");
			this.setRetCode("1001");
			return "success";
		}

	}
	
	public String login(){
		
		User user = null;

		if (username == null || password == null) {

			this.setRetMSG("用户名或密码不能为空！");
			this.setRetCode("1001");
			return "success";
		}

		String password_md5 = Utils.md5Encryption(this.password);
		user = userService.findUserByUsernameAndPassword(username, password_md5);
		
		if (user != null) {		
			
			Token t = tokenService.findTokenByUserId(id);
			if(t!=null){
				t.setToken(UUID.randomUUID().toString());
				tokenService.updateToken(t);
			}else{
				t = new Token();
				t.setUserid(id);
				t.setToken(UUID.randomUUID().toString());
				tokenService.saveToken(t);
			}
			
			HttpServletResponse response = ServletActionContext.getResponse();
			Cookie cookie = new Cookie("userid",user.getId().toString());
			response.addCookie(cookie);
			cookie = new Cookie("token",tokenService.findTokenByUserId(id).getToken());
			response.addCookie(cookie);
			this.setUsername(user.getDisplayname());
			this.setRetMSG(user.getDisplayname() + "，欢迎回来！");
			this.setRetCode("1000");
			return "success";
		} else {
			this.setRetMSG("用户名或密码不正确！");
			this.setRetCode("1001");
			return "success";
		}		
	}
	
	public String logout() {
		HttpServletResponse response = ServletActionContext.getResponse();
		Cookie cookie = new Cookie("userid",null);
		response.addCookie(cookie);
		cookie = new Cookie("token",null);
		response.addCookie(cookie);
		this.setRetMSG("注销成功！");
		this.setRetCode("1000");
		return "success";
	}



	public String findUserByID(){
		User user = userService.findUserById(id);

		if (user == null) {
			this.setRetMSG("该用户不存在");
			this.setRetCode("1001");
			return "success";
		}

		this.setUser(user);
		this.setRetMSG("查询用户成功");
		this.setRetCode("1000");
		return "success";
	}
	
	public String deleteUserByID(){
		User user = userService.findUserById(id);

		if (user == null) {
			this.setRetMSG("该用户不存在");
			this.setRetCode("1001");
			return "success";
		}

		user.setDel(1);
		this.setUser(user);
		this.setRetMSG("删除用户成功");
		this.setRetCode("1000");
		return "success";
	}
	
	@Override
	public void setSession(Map<String, Object> session) {
		// TODO Auto-generated method stub
		this.sessionMap = (SessionMap) session;
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

	public String getDisplayName() {
		return displayname;
	}

	public void setDisplayName(String displayname) {
		this.displayname = displayname;
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

	public String getRetMSG() {
		return retMSG;
	}

	public void setRetMSG(String retMSG) {
		this.retMSG = retMSG;
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

	public String getRetCode() {
		return retCode;
	}

	public void setRetCode(String retCode) {
		this.retCode = retCode;
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

}
