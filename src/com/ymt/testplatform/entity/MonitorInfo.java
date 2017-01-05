package com.ymt.testplatform.entity;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.GenericGenerator;

@Entity
public class MonitorInfo {
	private Integer id;
	private MonitorConfig config;
	private MonitorItem item;
	private Integer cpu;
	private Integer cpu1;
	private Integer cpu2;
	private Integer cpu3;
	private Integer memory;
	private Integer diskRead;
	private Integer diskWrite;
	private Integer networkReceive;
	private Integer networkSend;
	private Date time;

	@Id
	@GenericGenerator(name = "generator", strategy = "increment")
	@GeneratedValue(generator = "generator")
	@Column(name = "id", length = 11, unique = true)
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "configId")
	public MonitorConfig getConfig() {
		return config;
	}

	public void setConfig(MonitorConfig config) {
		this.config = config;
	}

	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "itemId")
	public MonitorItem getItem() {
		return item;
	}

	public void setItem(MonitorItem item) {
		this.item = item;
	}

	@Column(name = "cpu",nullable=false,columnDefinition="INT default 0")
	public Integer getCpu() {
		return cpu;
	}

	public void setCpu(Integer cpu) {
		this.cpu = cpu;
	}  
	
	@Column(name = "cpu1",nullable=false,columnDefinition="INT default 0")
	public Integer getCpu1() {
		return cpu1;
	}

	public void setCpu1(Integer cpu1) {
		this.cpu1 = cpu1;
	}  
	
	@Column(name = "cpu2",nullable=false,columnDefinition="INT default 0")
	public Integer getCpu2() {
		return cpu2;
	}

	public void setCpu2(Integer cpu2) {
		this.cpu2 = cpu2;
	}  
	
	@Column(name = "cpu3",nullable=false,columnDefinition="INT default 0")
	public Integer getCpu3() {
		return cpu3;
	}

	public void setCpu3(Integer cpu3) {
		this.cpu3 = cpu3;
	}  

	@Column(name = "memory")
	public Integer getMemory() {
		return memory;
	}

	public void setMemory(Integer memory) {
		this.memory = memory;
	}

	@Column(name = "diskRead")
	public Integer getDiskRead() {
		return diskRead;
	}

	public void setDiskRead(Integer diskRead) {
		this.diskRead = diskRead;
	}

	@Column(name = "diskWrite")
	public Integer getDiskWrite() {
		return diskWrite;
	}

	public void setDiskWrite(Integer diskWrite) {
		this.diskWrite = diskWrite;
	}

	@Column(name = "networkReceive")
	public Integer getNetworkReceive() {
		return networkReceive;
	}

	public void setNetworkReceive(Integer networkReceive) {
		this.networkReceive = networkReceive;
	}

	@Column(name = "networkSend")
	public Integer getNetworkSend() {
		return networkSend; 
	}

	public void setNetworkSend(Integer networkSend) {
		this.networkSend = networkSend;
	}

	//@Column(name = "time",columnDefinition="timestamp", nullable=true, length=19)
	@Column(name = "time")
	@Temporal(TemporalType.TIMESTAMP)
	public Date getTime() {
		return time;
	}

	public void setTime(Date time) {
		this.time = time;
	}

}
