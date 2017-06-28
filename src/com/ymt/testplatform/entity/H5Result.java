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
public class H5Result {
	private Integer id;
	private H5Record h5Record;
	private String lastOnLoadResource;
	private String webViewloadurl;
	private String onPageFinished;
	private String loadTime;
	private String fristOnLoadResource;
	private String domContentLoaded;
	private String fristOnPageStarted;
	private String fristOnReceivedTitle;
	private String fristOnLoadMedia;
	private String onPageCommitVisible;

	private float firstTime;
	private float blackTime;
	private float domTime;
	private float allTime;
	private float onloadTime;
	private float onResourceTime;

	private Integer httpNum;
	private float pageSize;
	private Integer domNum;
	private Integer redirectNum;
	private Integer domainNum;
	private Integer failNum;
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
	
	@Column(name = "lastonloadresource", length = 30)
	public String getLastOnLoadResource() {
		return lastOnLoadResource;
	}

	public void setLastOnLoadResource(String lastOnLoadResource) {
		this.lastOnLoadResource = lastOnLoadResource;
	}

	@Column(name = "webviewloadurl", length = 30)
	public String getWebViewloadurl() {
		return webViewloadurl;
	}

	public void setWebViewloadurl(String webViewloadurl) {
		this.webViewloadurl = webViewloadurl;
	}

	@Column(name = "onpagefinished", length = 30)
	public String getOnPageFinished() {
		return onPageFinished;
	}

	public void setOnPageFinished(String onPageFinished) {
		this.onPageFinished = onPageFinished;
	}

	@Column(name = "loadtime", length = 30)
	public String getLoadTime() {
		return loadTime;
	}

	public void setLoadTime(String loadTime) {
		this.loadTime = loadTime;
	}

	@Column(name = "fristonloadresource", length = 30)
	public String getFristOnLoadResource() {
		return fristOnLoadResource;
	}

	public void setFristOnLoadResource(String fristOnLoadResource) {
		this.fristOnLoadResource = fristOnLoadResource;
	}

	@Column(name = "domcontentloaded", length = 30)
	public String getDomContentLoaded() {
		return domContentLoaded;
	}

	public void setDomContentLoaded(String domContentLoaded) {
		this.domContentLoaded = domContentLoaded;
	}

	@Column(name = "fristonpagestarted", length = 30)
	public String getFristOnPageStarted() {
		return fristOnPageStarted;
	}

	public void setFristOnPageStarted(String fristOnPageStarted) {
		this.fristOnPageStarted = fristOnPageStarted;
	}

	@Column(name = "fristonreceivedtitle", length = 30)
	public String getFristOnReceivedTitle() {
		return fristOnReceivedTitle;
	}

	public void setFristOnReceivedTitle(String fristOnReceivedTitle) {
		this.fristOnReceivedTitle = fristOnReceivedTitle;
	}

	@Column(name = "fristonloadmedia", length = 30)
	public String getFristOnLoadMedia() {
		return fristOnLoadMedia;
	}

	public void setFristOnLoadMedia(String fristOnLoadMedia) {
		this.fristOnLoadMedia = fristOnLoadMedia;
	}

	@Column(name = "httpnum")
	public Integer getHttpNum() {
		return httpNum;
	}

	public void setHttpNum(Integer httpNum) {
		this.httpNum = httpNum;
	}

	@Column(name = "pagesize")
	public float getPageSize() {
		return pageSize;
	}

	public void setPageSize(float pageSize) {
		this.pageSize = pageSize;
	}

	@Column(name = "domnum")
	public Integer getDomNum() {
		return domNum;
	}

	public void setDomNum(Integer domNum) {
		this.domNum = domNum;
	}

	@Column(name = "redirectnum")
	public Integer getRedirectNum() {
		return redirectNum;
	}

	public void setRedirectNum(Integer redirectNum) {
		this.redirectNum = redirectNum;
	}

	@Column(name = "domainnum")
	public Integer getDomainNum() {
		return domainNum;
	}

	public void setDomainNum(Integer domainNum) {
		this.domainNum = domainNum;
	}

	@Column(name = "failnum")
	public Integer getFailNum() {
		return failNum;
	}

	public void setFailNum(Integer failNum) {
		this.failNum = failNum;
	}

	@Column(name = "time",length=30)
	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	@Column(name = "firstTime")
	public float getFirstTime() {
		return firstTime;
	}

	public void setFirstTime(float firstTime) {
		this.firstTime = firstTime;
	}

	@Column(name = "blackTime")
	public float getBlackTime() {
		return blackTime;
	}

	public void setBlackTime(float blackTime) {
		this.blackTime = blackTime;
	}

	@Column(name = "domTime")
	public float getDomTime() {
		return domTime;
	}

	public void setDomTime(float domTime) {
		this.domTime = domTime;
	}

	@Column(name = "allTime")
	public float getAllTime() {
		return allTime;
	}

	public void setAllTime(float allTime) {
		this.allTime = allTime;
	}
	
	@Column(name = "onloadTime")
	public float getOnloadTime() {
		return onloadTime;
	}

	public void setOnloadTime(float onloadTime) {
		this.onloadTime = onloadTime;
	}

	public String getOnPageCommitVisible() {
		return onPageCommitVisible;
	}

	public void setOnPageCommitVisible(String onPageCommitVisible) {
		this.onPageCommitVisible = onPageCommitVisible;
	}

	public float getOnResourceTime() {
		return onResourceTime;
	}

	public void setOnResourceTime(float onResourceTime) {
		this.onResourceTime = onResourceTime;
	}

	
}
