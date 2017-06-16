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
public class H5Record {
	private Integer id;
	private H5Task h5Task;
	private H5Machine h5Machine;
	private String Device;
	private Integer status;
	private String time;
	private User creator;
	private Integer del;

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

	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "taskid")
	public H5Task getH5Task() {
		return h5Task;
	}

	public void setH5Task(H5Task h5Task) {
		this.h5Task = h5Task;
	}

	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "machineid")
	public H5Machine getH5Machine() {
		return h5Machine;
	}

	public void setH5Machine(H5Machine h5Machine) {
		this.h5Machine = h5Machine;
	}
	
	@Column(name = "device", length = 500)
	public String getDevice() {
		return Device;
	}

	public void setDevice(String device) {
		Device = device;
	}

	@Column(name = "status")
	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	@Column(name = "time", length = 20)
	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}


	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "creatorid")
	public User getCreator() {
		return creator;
	}

	public void setCreator(User creator) {
		this.creator = creator;
	}

	@Column(name = "del")
	public Integer getDel() {
		return del;
	}

	public void setDel(Integer del) {
		this.del = del;
	}
}
