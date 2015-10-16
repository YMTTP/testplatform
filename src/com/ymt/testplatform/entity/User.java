package com.ymt.testplatform.entity;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.GenericGenerator;



@Entity
public class User {

	private Integer id;
	private String username;
	private String displayname;
	private String password;
	private Integer authorization;
	private Date createTime;
	private Userinfo userInfo;
	private Integer del;
	
	@Id
	@GenericGenerator(name = "generator", strategy = "increment")
	@GeneratedValue(generator = "generator")
	@Column(name = "id", length = 11,unique=true)
	public Integer getId() {
		return id;
	}
	
	public void setId(Integer id) {
		this.id = id;
	}
	
	@Column(name = "username", length = 30)
	public String getUsername() {		
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	@Column(name = "displayname", length = 30)
	public String getDisplayname() {
		return displayname;
	}
	
	public void setDisplayname(String displayname) {
		this.displayname = displayname;
	}
	
	@Column(name = "password", length = 50)
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	
	@Column(name = "authorization")
	public Integer getAuthorization() {
		return authorization;
	}
	
	public void setAuthorization(Integer authorization) {
		this.authorization = authorization;
	}
	
	//@Temporal(TemporalType.DATE)
	@Column(name = "createtime")
	public Date getCreateTime() {
		return createTime;
	}
	
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	
	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "userinfoid")
	public Userinfo getUserInfo() {
		return userInfo;
	};

	public void setUserInfo(Userinfo userInfo) {
		this.userInfo = userInfo;
	}
	
	@Column(name = "del")
	public void setDel(Integer del) {
		this.del = del;
	}
	
	public Integer getDel() {
		return del;
	}

}
