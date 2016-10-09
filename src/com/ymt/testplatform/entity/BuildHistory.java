package com.ymt.testplatform.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;

@Entity
public class BuildHistory {

	private Integer id;
	private Integer appid;
	private Integer envid;
	private String revision;
	private String buildnumber;
	private String nodename;
	private String time; 
	private String user;
	
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

	@Column(name = "appid", length = 10)
	public Integer getAppid() {
		return appid;
	}

	public void setAppid(Integer appid) {
		this.appid = appid;
	}

	@Column(name = "envid", length = 10)
	public Integer getEnvid() {
		return envid;
	}

	public void setEnvid(Integer envid) {
		this.envid = envid;
	}

	@Column(name = "revision", length = 50)
	public String getRevision() {
		return revision;
	}

	public void setRevision(String revision) {
		this.revision = revision;
	}

	@Column(name = "buildnumber", length = 20)
	public String getBuildnumber() {
		return buildnumber;
	}

	public void setBuildnumber(String buildnumber) {
		this.buildnumber = buildnumber;
	}

	@Column(name = "nodename", length = 20)
	public String getNodename() {
		return nodename;
	}

	public void setNodename(String nodename) {
		this.nodename = nodename;
	}

	@Column(name = "time", length = 20)
	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	@Column(name = "user", length = 50)
	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}


}
