package com.ymt.testplatform.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import org.hibernate.annotations.GenericGenerator;

@Entity
public class VmInfo {

	private Integer id;
	private String ip;
	private String name;
	private String os;
	private String cpu;
	private String ram;
	private String harddrive;
	private ServerInfo serverinfo;
	private String remark;
	private String type;
	//private List<ApplicationEnv> applicationenvs;
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

	@Column(name = "ip", length = 20)
	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	@Column(name = "name", length = 30)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "os", length = 50)
	public String getOs() {
		return os;
	}

	public void setOs(String os) {
		this.os = os;
	}

	@Column(name = "cpu", length = 30)
	public String getCpu() {
		return cpu;
	}

	public void setCpu(String cpu) {
		this.cpu = cpu;
	}

	@Column(name = "ram", length = 30)
	public String getRam() {
		return ram;
	}

	public void setRam(String ram) {
		this.ram = ram;
	}

	@Column(name = "harddrive", length = 30)
	public String getHarddrive() {
		return harddrive;
	}

	public void setHarddrive(String harddrive) {
		this.harddrive = harddrive;
	}

	@OneToOne(cascade = CascadeType.DETACH, fetch = FetchType.EAGER)
	@JoinColumn(name = "serverinfoid")
	public ServerInfo getServerinfo() {
		return serverinfo;
	}

	public void setServerinfo(ServerInfo serverinfo) {
		this.serverinfo = serverinfo;
	}

//	@OneToMany(mappedBy = "vminfo", cascade = CascadeType.REFRESH)
//	public List<ApplicationEnv> getApplicationenvs() {
//		return applicationenvs;
//	}
//
//	public void setApplicationenvs(List<ApplicationEnv> applicationenvs) {
//		this.applicationenvs = applicationenvs;
//	}

	@Column(name = "remark", length = 50)
	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	
	@Column(name = "type", length = 50)
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public void setDel(Integer del) {
		this.del = del;
	}
	
	@Column(name = "del")
	public Integer getDel() {
		return del;
	}
}
