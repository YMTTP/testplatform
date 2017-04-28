package com.ymt.testplatform.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

@Entity
public class MonitorDeploy {
	private Integer id;
	private VmInfo vmInfo;
	private String version;
	private String setupVersion;
	private String time;
	private boolean isClientOn;
	private boolean isSetupOn;
	
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

	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "vmid")
	public VmInfo getVmInfo() {
		return vmInfo;
	}

	public void setVmInfo(VmInfo vmInfo) {
		this.vmInfo = vmInfo;
	}

	@Column(name = "version", length = 256)
	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	@Column(name = "time", length = 256)
	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}
	
	@Column(name = "setupVersion", length = 256)
	public String getSetupVersion() {
		return setupVersion;
	}

	@Column(name = "isClientOn")
	@Type(type="yes_no")
	public boolean isClientOn() {
		return isClientOn;
	}

	public void setClientOn(boolean isClientOn) {
		this.isClientOn = isClientOn;
	}

	@Column(name = "isSetupOn")
	@Type(type="yes_no")
	public boolean isSetupOn() {
		return isSetupOn;
	}

	public void setSetupOn(boolean isSetupOn) {
		this.isSetupOn = isSetupOn;
	}

	public void setSetupVersion(String setupVersion) {
		this.setupVersion = setupVersion;
	}
	
	
}
