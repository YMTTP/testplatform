package com.ymt.testplatform.entity;

public class MonitorDeployInfo {
	private int id;
	private String name;
	private String ip;
	private String os;
	private int vmid;
	private String version;
	private String setupVersion;
	private boolean clientOn;
	private boolean setupOn;
	private String time;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public String getOs() {
		return os;
	}

	public void setOs(String os) {
		this.os = os;
	}

	public int getVmid() {
		return vmid;
	}

	public void setVmid(int vmid) {
		this.vmid = vmid;
	}

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public String getSetupVersion() {
		return setupVersion;
	}

	public void setSetupVersion(String setupVersion) {
		this.setupVersion = setupVersion;
	}

	public boolean isClientOn() {
		return clientOn;
	}

	public void setClientOn(boolean clientOn) {
		this.clientOn = clientOn;
	}

	public boolean isSetupOn() {
		return setupOn;
	}

	public void setSetupOn(boolean setupOn) {
		this.setupOn = setupOn;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}
}
