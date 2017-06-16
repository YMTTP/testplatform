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
public class H5OriginalSource {
	private Integer id;
	private H5Record h5Record;
	private Integer size;
	private String type;
	private String mimetype;
	private String host;
	private String status;
	private String startTime;
	private Integer time;
	private String endTime;
	private String compress;
	private String cache;
	private String encoding;
	private String method;
	private String url;
	private Integer responsesize;
	private Integer compression;
	private String createTime;

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
	
	@Column(name = "size")
	public Integer getSize() {
		return size;
	}

	public void setSize(Integer size) {
		this.size = size;
	}

	@Column(name = "type", length = 50)
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@Column(name = "host", length = 100)
	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	@Column(name = "status")
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Column(name = "starttime", length = 40)
	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	@Column(name = "time")
	public Integer getTime() {
		return time;
	}

	public void setTime(Integer time) {
		this.time = time;
	}

	@Column(name = "compress", length = 20)
	public String getCompress() {
		return compress;
	}

	public void setCompress(String compress) {
		this.compress = compress;
	}

	@Column(name = "cache", length = 20)
	public String getCache() {
		return cache;
	}

	public void setCache(String cache) {
		this.cache = cache;
	}

	@Column(name = "encoding", length = 20)
	public String getEncoding() {
		return encoding;
	}

	public void setEncoding(String encoding) {
		this.encoding = encoding;
	}

	@Column(name = "method", length = 20)
	public String getMethod() {
		return method;
	}

	public void setMethod(String method) {
		this.method = method;
	}

	@Column(name = "responsesize")
	public Integer getResponsesize() {
		return responsesize;
	}

	public void setResponsesize(Integer responsesize) {
		this.responsesize = responsesize;
	}

	@Column(name = "compression")
	public Integer getCompression() {
		return compression;
	}

	public void setCompression(Integer compression) {
		this.compression = compression;
	}
	
	@Column(name = "mimetype", length = 100)
	public String getMimetype() {
		return mimetype;
	}

	public void setMimetype(String mimetype) {
		this.mimetype = mimetype;
	}

	@Column(name = "endTime", length = 40)
	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	@Column(name = "url", length = 1000)
	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
	
	@Column(name = "createTime", length = 40)
	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	
	
}
