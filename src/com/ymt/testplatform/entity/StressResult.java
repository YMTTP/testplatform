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
	private String tps;
	private String responseTime;
	private String concurrence;
	private String duration;
	private String passrate;
	private String precondition;
	private String comment;
	private Integer del;
	
	// server info
	private String serverCpu;
	private String serverMemory;
	private String serverDiskInput;
	private String serverDiskOutput;
	private String serverNetworkInput;
	private String serverNetworkOutput;
	
	// MSSQL info
	private String mssqlCpu;
	private String mssqlDiskInput;
	private String mssqlDiskOutput;
	private String mssqlNetworkInput;
	private String mssqlNetworkOutput;
	
	// MySQL info
	private String mysqlCpu;
	private String mysqlDiskInput;
	private String mysqlDiskOutput;
	private String mysqlNetworkInput;
	private String mysqlNetworkOutput;
	
	// Mongo info
	private String mongoCpu;
	private String mongoDiskInput;
	private String mongoDiskOutput;
	private String mongoNetworkInput;
	private String mongoNetworkOutput;
	
	
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

	@Column(name = "tps", length = 10)
	public String getTps() {
		return tps;
	}

	public void setTps(String tps) {
		this.tps = tps;
	}

	@Column(name = "responsetime", length = 10)
	public String getResponseTime() {
		return responseTime;
	}

	public void setResponseTime(String responseTime) {
		this.responseTime = responseTime;
	}

	@Column(name = "concurrence", length = 10)
	public String getConcurrence() {
		return concurrence;
	}

	public void setConcurrence(String concurrence) {
		this.concurrence = concurrence;
	}

	@Column(name = "duration", length = 10)
	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	@Column(name = "passrate", length = 10)
	public String getPassrate() {
		return passrate;
	}

	public void setPassrate(String passrate) {
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

	@Column(name = "servercpu", length = 10)
	public String getServerCpu() {
		return serverCpu;
	}

	public void setServerCpu(String serverCpu) {
		this.serverCpu = serverCpu;
	}

	@Column(name = "servermemory", length = 10)
	public String getServerMemory() {
		return serverMemory;
	}

	public void setServerMemory(String serverMemory) {
		this.serverMemory = serverMemory;
	}

	@Column(name = "serverdiskinput", length = 10)
	public String getServerDiskInput() {
		return serverDiskInput;
	}

	public void setServerDiskInput(String serverDiskInput) {
		this.serverDiskInput = serverDiskInput;
	}

	@Column(name = "serverdiskoutput", length = 10)
	public String getServerDiskOutput() {
		return serverDiskOutput;
	}

	public void setServerDiskOutput(String serverDiskOutput) {
		this.serverDiskOutput = serverDiskOutput;
	}

	@Column(name = "servernetworkinput", length = 10)
	public String getServerNetworkInput() {
		return serverNetworkInput;
	}

	public void setServerNetworkInput(String serverNetworkInput) {
		this.serverNetworkInput = serverNetworkInput;
	}

	@Column(name = "servernetworkoutput", length = 10)
	public String getServerNetworkOutput() {
		return serverNetworkOutput;
	}

	public void setServerNetworkOutput(String serverNetworkOutput) {
		this.serverNetworkOutput = serverNetworkOutput;
	}

	@Column(name = "mssqlcpu", length = 10)
	public String getMssqlCpu() {
		return mssqlCpu;
	}

	public void setMssqlCpu(String mssqlCpu) {
		this.mssqlCpu = mssqlCpu;
	}

	@Column(name = "mssqldiskinput", length = 10)
	public String getMssqlDiskInput() {
		return mssqlDiskInput;
	}

	public void setMssqlDiskInput(String mssqlDiskInput) {
		this.mssqlDiskInput = mssqlDiskInput;
	}

	@Column(name = "mssqldiskoutput", length = 10)
	public String getMssqlDiskOutput() {
		return mssqlDiskOutput;
	}

	public void setMssqlDiskOutput(String mssqlDiskOutput) {
		this.mssqlDiskOutput = mssqlDiskOutput;
	}

	@Column(name = "mssqlnetworkinput", length = 10)
	public String getMssqlNetworkInput() {
		return mssqlNetworkInput;
	}

	public void setMssqlNetworkInput(String mssqlNetworkInput) {
		this.mssqlNetworkInput = mssqlNetworkInput;
	}

	@Column(name = "mssqlnetworkoutput", length = 10)
	public String getMssqlNetworkOutput() {
		return mssqlNetworkOutput;
	}

	public void setMssqlNetworkOutput(String mssqlNetworkOutput) {
		this.mssqlNetworkOutput = mssqlNetworkOutput;
	}

	@Column(name = "mysqlcpu", length = 10)
	public String getMysqlCpu() {
		return mysqlCpu;
	}

	public void setMysqlCpu(String mysqlCpu) {
		this.mysqlCpu = mysqlCpu;
	}

	@Column(name = "mysqldiskinput", length = 10)
	public String getMysqlDiskInput() {
		return mysqlDiskInput;
	}

	public void setMysqlDiskInput(String mysqlDiskInput) {
		this.mysqlDiskInput = mysqlDiskInput;
	}

	@Column(name = "mysqldiskoutput", length = 10)
	public String getMysqlDiskOutput() {
		return mysqlDiskOutput;
	}

	public void setMysqlDiskOutput(String mysqlDiskOutput) {
		this.mysqlDiskOutput = mysqlDiskOutput;
	}

	@Column(name = "mysqlnetworkinput", length = 10)
	public String getMysqlNetworkInput() {
		return mysqlNetworkInput;
	}

	public void setMysqlNetworkInput(String mysqlNetworkInput) {
		this.mysqlNetworkInput = mysqlNetworkInput;
	}

	@Column(name = "mysqlnetworkoutput", length = 10)
	public String getMysqlNetworkOutput() {
		return mysqlNetworkOutput;
	}

	public void setMysqlNetworkOutput(String mysqlNetworkOutput) {
		this.mysqlNetworkOutput = mysqlNetworkOutput;
	}

	@Column(name = "mongocpu", length = 10)
	public String getMongoCpu() {
		return mongoCpu;
	}

	public void setMongoCpu(String mongoCpu) {
		this.mongoCpu = mongoCpu;
	}

	@Column(name = "mongodiskinput", length = 10)
	public String getMongoDiskInput() {
		return mongoDiskInput;
	}

	public void setMongoDiskInput(String mongoDiskInput) {
		this.mongoDiskInput = mongoDiskInput;
	}

	@Column(name = "mongodiskoutput", length = 10)
	public String getMongoDiskOutput() {
		return mongoDiskOutput;
	}

	public void setMongoDiskOutput(String mongoDiskOutput) {
		this.mongoDiskOutput = mongoDiskOutput;
	}

	@Column(name = "mongonetworkinput", length = 10)
	public String getMongoNetworkInput() {
		return mongoNetworkInput;
	}

	public void setMongoNetworkInput(String mongoNetworkInput) {
		this.mongoNetworkInput = mongoNetworkInput;
	}

	@Column(name = "mongonetworkoutput", length = 10)
	public String getMongoNetworkOutput() {
		return mongoNetworkOutput;
	}

	public void setMongoNetworkOutput(String mongoNetworkOutput) {
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
