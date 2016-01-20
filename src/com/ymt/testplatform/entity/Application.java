package com.ymt.testplatform.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.hibernate.annotations.GenericGenerator;

@Entity
public class Application {

	private Integer id;
	private String name;
	private String domain;
	private ApplicationType applicationtype;
	private String devs;
	//private List<ApplicationEnv> applicationenvs;
	private String dependencies;
	private Department department;
	private String remark;
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
	
	@Column(name = "name", length = 20)
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	@Column(name = "domain", length = 50)
	public String getDomain() {
		return domain;
	}

	public void setDomain(String domain) {
		this.domain = domain;
	}


	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "applicationtypeid")
	public ApplicationType getApplicationtype() {
		return applicationtype;
	}

	public void setApplicationtype(ApplicationType applicationtype) {
		this.applicationtype = applicationtype;
	}

//	@OneToMany(mappedBy = "application", cascade = CascadeType.REFRESH)
//	public List<ApplicationEnv> getApplicationenvs() {
//		return applicationenvs;
//	}
//
//	public void setApplicationenvs(List<ApplicationEnv> applicationenvs) {
//		this.applicationenvs = applicationenvs;
//	}

	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "departmentid")
	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}

	@Column(name = "remark", length = 200)
	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	@Column(name = "dependencies", length = 200)
	public String getDependencies() {
		return dependencies;
	}

	public void setDependencies(String dependencies) {
		this.dependencies = dependencies;
	}

	@Column(name = "devs", length = 50)
	public String getDevs() {
		return devs;
	}

	public void setDevs(String devs) {
		this.devs = devs;
	}


	public void setDel(Integer del) {
		this.del = del;
	}
	
	@Column(name = "del")
	public Integer getDel() {
		return del;
	}
}
