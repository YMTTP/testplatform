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
public class H5DomainResult {
	private Integer id;
	private H5Record h5Record;
	private String name;
	private Float size;
	private Integer num;
	private String time;

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
	@JoinColumn(name = "recordid")
	public H5Record getH5Record() {
		return h5Record;
	}

	public void setH5Record(H5Record h5Record) {
		this.h5Record = h5Record;
	}

	@Column(name = "name", length = 40)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "size")
	public Float getSize() {
		return size;
	}

	public void setSize(Float size) {
		this.size = size;
	}

	@Column(name = "num")
	public Integer getNum() {
		return num;
	}

	public void setNum(Integer num) {
		this.num = num;
	}

	@Column(name = "time", length = 40)
	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

}
