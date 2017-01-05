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
public class MonitorConfig {
	private Integer id;
	private StressTask task;
	private VmInfo vm;
	private boolean isActive;
	private String comment;
	private Date addTime;
	private int del;

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
	@JoinColumn(name = "taskId")
	public StressTask getTask() {
		return task;
	}
	public void setTask(StressTask task) {
		this.task = task;
	}
	
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "vmId")
	public VmInfo getVm() {
		return vm;
	}
	public void setVm(VmInfo vm) {
		this.vm = vm;
	}
	
	@Column(name = "comment", length = 256)
	public String getComment() {
		return comment;
	}	
	
	public void setComment(String comment) {
		this.comment = comment;
	}
	
	@Column(name = "addTime", columnDefinition="timestamp", nullable=true, length=19)
	@Temporal(TemporalType.TIMESTAMP)
	public Date getAddTime() {
		return addTime;
	}
	public void setAddTime(Date addTime) {
		this.addTime = addTime;
	}

	@Column(name = "isActive", length = 11)
	public boolean getIsActive() {
		return isActive;
	}
	
	public void setIsActive(boolean isActive) {
		this.isActive = isActive;
	}
	
	@Column(name = "del",nullable=false,columnDefinition="INT default 0")
	public int getDel() {
		return del;
	}
	public void setDel(int del) {
		this.del = del;
	}
}
