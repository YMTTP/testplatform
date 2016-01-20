package com.ymt.testplatform.entity;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import org.hibernate.annotations.GenericGenerator;

@Entity
public class ApplicationEnv {

	private Integer id;
	private Env env;
	private String port;
	private String localport;
	private VmInfo vminfo;
	private String dnsip;
	private Application application;
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

	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "envid")
	public Env getEnv() {
		return env;
	}

	public void setEnv(Env env) {
		this.env = env;
	}

	@Column(name = "port", length = 10)
	public String getPort() {
		return port;
	}

	public void setPort(String port) {
		this.port = port;
	}

	@Column(name = "localport", length = 10)
	public String getLocalport() {
		return localport;
	}

	public void setLocalport(String localport) {
		this.localport = localport;
	}


	@ManyToOne(cascade = CascadeType.DETACH, fetch = FetchType.EAGER)
	@JoinColumn(name = "vminfoid")
	public VmInfo getVminfo() {
		return vminfo;
	}

	public void setVminfo(VmInfo vminfo) {
		this.vminfo = vminfo;
	}

	@Column(name = "dnsip", length = 20)
	public String getDnsip() {
		return dnsip;
	}

	public void setDnsip(String dnsip) {
		this.dnsip = dnsip;
	}

	@ManyToOne(cascade = CascadeType.DETACH, fetch = FetchType.EAGER)
	@JoinColumn(name = "applicationid")
	public Application getApplication() {
		return application;
	}

	public void setApplication(Application application) {
		this.application = application;
	}


	public void setDel(Integer del) {
		this.del = del;
	}
	
	@Column(name = "del")
	public Integer getDel() {
		return del;
	}
}
