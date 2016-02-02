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
public class AppAssert {

	private Integer id;
	private String IMEI;
	private String SN;
	private String resolution;
	private String OS;
	private String brand;
	private String type;
	private String remark;
	private String time;
	private User owner;
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


	@Column(name = "imei", length = 50)
	public String getIMEI() {
		return IMEI;
	}

	public void setIMEI(String iMEI) {
		IMEI = iMEI;
	}

	@Column(name = "sn", length = 50)
	public String getSN() {
		return SN;
	}

	public void setSN(String sN) {
		SN = sN;
	}

	@Column(name = "resolution", length = 50)
	public String getResolution() {
		return resolution;
	}

	public void setResolution(String resolution) {
		this.resolution = resolution;
	}

	@Column(name = "os", length = 50)
	public String getOS() {
		return OS;
	}

	public void setOS(String oS) {
		OS = oS;
	}

	@Column(name = "brand", length = 20)
	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	@Column(name = "type", length = 50)
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@Column(name = "time", length = 20)
	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "userid")
	public User getOwner() {
		return owner;
	}

	public void setOwner(User owner) {
		this.owner = owner;
	}

	@Column(name = "remark", length = 200)
	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public void setDel(Integer del) {
		this.del = del;
	}
	
	@Column(name = "del")
	public Integer getDel() {
		return del;
	}
}
