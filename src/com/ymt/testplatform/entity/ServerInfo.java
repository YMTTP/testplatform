package com.ymt.testplatform.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.hibernate.annotations.GenericGenerator;

@Entity
public class ServerInfo {

	private Integer id;
	private String ip;
	private String cpu;
	private String ram;
	private String harddrive;
	//private List<VmInfo> vminfos;
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

//	@OneToMany(mappedBy = "serverinfo", cascade = CascadeType.REFRESH)
//	public List<VmInfo> getVminfos() {
//		return vminfos;
//	}
//
//	public void setVminfos(List<VmInfo> vminfos) {
//		this.vminfos = vminfos;
//	}

	@Column(name = "del")
	public void setDel(Integer del) {
		this.del = del;
	}
	
	public Integer getDel() {
		return del;
	}
}
