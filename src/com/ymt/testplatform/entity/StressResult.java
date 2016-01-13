package com.ymt.testplatform.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.GenericGenerator;

@Entity
public class StressResult {

	// basic info
	private Integer id;
	private StressTask stressTask;
	private String url;
	private Integer tps;
	private Integer responseTime;
	private Integer concurrence;
	private Integer duration;
	private float passrate;
	private String precondition;
	private String comment;
	private Integer del;
	
	// server info
	private Integer serverCpu;
	private Integer serverMemory;
	private Integer serverDiskInput;
	private Integer serverDiskOutput;
	private Integer serverNetworkInput;
	private Integer serverNetworkOutput;
	
	// MSSQL info
	private Integer mssqlCpu;
	private Integer mssqlDiskInput;
	private Integer mssqlDiskOutput;
	private Integer mssqlNetworkInput;
	private Integer mssqlNetworkOutput;
	
	// MySQL info
	private Integer mysqlCpu;
	private Integer mysqlDiskInput;
	private Integer mysqlDiskOutput;
	private Integer mysqlNetworkInput;
	private Integer mysqlNetworkOutput;
	
	// Mongo info
	private Integer mongoCpu;
	private Integer mongoDiskInput;
	private Integer mongoDiskOutput;
	private Integer mongoNetworkInput;
	private Integer mongoNetworkOutput;
	
	
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

	@ManyToOne(cascade = CascadeType.DETACH, fetch = FetchType.EAGER)
	@JoinColumn(name = "stresstaskid")
	public StressTask getStressTask() {
		return stressTask;
	}

	public void setStressTask(StressTask stressTask) {
		this.stressTask = stressTask;
	}

	@Column(name = "url", length = 100)
	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	@Column(name = "tps")
	public Integer getTps() {
		return tps;
	}

	public void setTps(Integer tps) {
		this.tps = tps;
	}

	@Column(name = "responsetime")
	public Integer getResponseTime() {
		return responseTime;
	}

	public void setResponseTime(Integer responseTime) {
		this.responseTime = responseTime;
	}

	@Column(name = "concurrence")
	public Integer getConcurrence() {
		return concurrence;
	}

	public void setConcurrence(Integer concurrence) {
		this.concurrence = concurrence;
	}

	@Column(name = "duration")
	public Integer getDuration() {
		return duration;
	}

	public void setDuration(Integer duration) {
		this.duration = duration;
	}

	@Column(name = "passrate")
	public float getPassrate() {
		return passrate;
	}

	public void setPassrate(float passrate) {
		this.passrate = passrate;
	}

	@Column(name = "precondition", length = 200)
	public String getPrecondition() {
		return precondition;
	}

	public void setPrecondition(String precondition) {
		this.precondition = precondition;
	}

	@Column(name = "comment", length = 200)
	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	@Column(name = "servercpu")
	public Integer getServerCpu() {
		return serverCpu;
	}

	public void setServerCpu(Integer serverCpu) {
		this.serverCpu = serverCpu;
	}

	@Column(name = "servermemory")
	public Integer getServerMemory() {
		return serverMemory;
	}

	public void setServerMemory(Integer serverMemory) {
		this.serverMemory = serverMemory;
	}

	@Column(name = "serverdiskinput")
	public Integer getServerDiskInput() {
		return serverDiskInput;
	}

	public void setServerDiskInput(Integer serverDiskInput) {
		this.serverDiskInput = serverDiskInput;
	}

	@Column(name = "serverdiskoutput")
	public Integer getServerDiskOutput() {
		return serverDiskOutput;
	}

	public void setServerDiskOutput(Integer serverDiskOutput) {
		this.serverDiskOutput = serverDiskOutput;
	}

	@Column(name = "servernetworkinput")
	public Integer getServerNetworkInput() {
		return serverNetworkInput;
	}

	public void setServerNetworkInput(Integer serverNetworkInput) {
		this.serverNetworkInput = serverNetworkInput;
	}

	@Column(name = "servernetworkoutput")
	public Integer getServerNetworkOutput() {
		return serverNetworkOutput;
	}

	public void setServerNetworkOutput(Integer serverNetworkOutput) {
		this.serverNetworkOutput = serverNetworkOutput;
	}

	@Column(name = "mssqlcpu")
	public Integer getMssqlCpu() {
		return mssqlCpu;
	}

	public void setMssqlCpu(Integer mssqlCpu) {
		this.mssqlCpu = mssqlCpu;
	}

	@Column(name = "mssqldiskinput")
	public Integer getMssqlDiskInput() {
		return mssqlDiskInput;
	}

	public void setMssqlDiskInput(Integer mssqlDiskInput) {
		this.mssqlDiskInput = mssqlDiskInput;
	}

	@Column(name = "mssqldiskoutput")
	public Integer getMssqlDiskOutput() {
		return mssqlDiskOutput;
	}

	public void setMssqlDiskOutput(Integer mssqlDiskOutput) {
		this.mssqlDiskOutput = mssqlDiskOutput;
	}

	@Column(name = "mssqlnetworkinput")
	public Integer getMssqlNetworkInput() {
		return mssqlNetworkInput;
	}

	public void setMssqlNetworkInput(Integer mssqlNetworkInput) {
		this.mssqlNetworkInput = mssqlNetworkInput;
	}

	@Column(name = "mssqlnetworkoutput")
	public Integer getMssqlNetworkOutput() {
		return mssqlNetworkOutput;
	}

	public void setMssqlNetworkOutput(Integer mssqlNetworkOutput) {
		this.mssqlNetworkOutput = mssqlNetworkOutput;
	}

	@Column(name = "mysqlcpu")
	public Integer getMysqlCpu() {
		return mysqlCpu;
	}

	public void setMysqlCpu(Integer mysqlCpu) {
		this.mysqlCpu = mysqlCpu;
	}

	@Column(name = "mysqldiskinput")
	public Integer getMysqlDiskInput() {
		return mysqlDiskInput;
	}

	public void setMysqlDiskInput(Integer mysqlDiskInput) {
		this.mysqlDiskInput = mysqlDiskInput;
	}

	@Column(name = "mysqldiskoutput")
	public Integer getMysqlDiskOutput() {
		return mysqlDiskOutput;
	}

	public void setMysqlDiskOutput(Integer mysqlDiskOutput) {
		this.mysqlDiskOutput = mysqlDiskOutput;
	}

	@Column(name = "mysqlnetworkinput")
	public Integer getMysqlNetworkInput() {
		return mysqlNetworkInput;
	}

	public void setMysqlNetworkInput(Integer mysqlNetworkInput) {
		this.mysqlNetworkInput = mysqlNetworkInput;
	}

	@Column(name = "mysqlnetworkoutput")
	public Integer getMysqlNetworkOutput() {
		return mysqlNetworkOutput;
	}

	public void setMysqlNetworkOutput(Integer mysqlNetworkOutput) {
		this.mysqlNetworkOutput = mysqlNetworkOutput;
	}

	@Column(name = "mongocpu")
	public Integer getMongoCpu() {
		return mongoCpu;
	}

	public void setMongoCpu(Integer mongoCpu) {
		this.mongoCpu = mongoCpu;
	}

	@Column(name = "mongodiskinput")
	public Integer getMongoDiskInput() {
		return mongoDiskInput;
	}

	public void setMongoDiskInput(Integer mongoDiskInput) {
		this.mongoDiskInput = mongoDiskInput;
	}

	@Column(name = "mongodiskoutput")
	public Integer getMongoDiskOutput() {
		return mongoDiskOutput;
	}

	public void setMongoDiskOutput(Integer mongoDiskOutput) {
		this.mongoDiskOutput = mongoDiskOutput;
	}

	@Column(name = "mongonetworkinput")
	public Integer getMongoNetworkInput() {
		return mongoNetworkInput;
	}

	public void setMongoNetworkInput(Integer mongoNetworkInput) {
		this.mongoNetworkInput = mongoNetworkInput;
	}

	@Column(name = "mongonetworkoutput")
	public Integer getMongoNetworkOutput() {
		return mongoNetworkOutput;
	}

	public void setMongoNetworkOutput(Integer mongoNetworkOutput) {
		this.mongoNetworkOutput = mongoNetworkOutput;
	}

	@Column(name = "del")
	public Integer getDel() {
		return del;
	}

	public void setDel(Integer del) {
		this.del = del;
	}
	
}
