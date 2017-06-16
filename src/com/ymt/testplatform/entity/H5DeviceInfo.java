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
public class H5DeviceInfo {
	private Integer id;
	private H5Record h5Record;
	private String name;
	private String fingerprint;

	private String user;
	private String brand;
	private String board;
	private String product;
	private String manufacturer;
	private String tags;
	private String device;
	private String model;
	private String display;
	private String cpu_abi;
	private String sdk;
	private String version;

	private String deviceid;
	private String version_codes;
	private String resolution;

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
	
	@Column(name = "name", length = 20)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "fingerprint", length = 200)
	public String getFingerprint() {
		return fingerprint;
	}

	public void setFingerprint(String fingerprint) {
		this.fingerprint = fingerprint;
	}

	@Column(name = "user", length = 20)
	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	@Column(name = "brand", length = 20)
	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	@Column(name = "board", length = 20)
	public String getBoard() {
		return board;
	}

	public void setBoard(String board) {
		this.board = board;
	}

	@Column(name = "product", length = 20)
	public String getProduct() {
		return product;
	}

	public void setProduct(String product) {
		this.product = product;
	}

	@Column(name = "manufacturer", length = 20)
	public String getManufacturer() {
		return manufacturer;
	}

	public void setManufacturer(String manufacturer) {
		this.manufacturer = manufacturer;
	}

	@Column(name = "tags", length = 20)
	public String getTags() {
		return tags;
	}

	public void setTags(String tags) {
		this.tags = tags;
	}

	@Column(name = "device", length = 20)
	public String getDevice() {
		return device;
	}

	public void setDevice(String device) {
		this.device = device;
	}

	@Column(name = "model", length = 100)
	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	@Column(name = "display", length = 100)
	public String getDisplay() {
		return display;
	}

	public void setDisplay(String display) {
		this.display = display;
	}

	@Column(name = "cpu_abi", length = 20)
	public String getCpu_abi() {
		return cpu_abi;
	}

	public void setCpu_abi(String cpu_abi) {
		this.cpu_abi = cpu_abi;
	}

	@Column(name = "sdk", length = 20)
	public String getSdk() {
		return sdk;
	}

	public void setSdk(String sdk) {
		this.sdk = sdk;
	}

	@Column(name = "version", length = 20)
	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	@Column(name = "deviceid", length = 20)
	public String getDeviceid() {
		return deviceid;
	}

	public void setDeviceid(String deviceid) {
		this.deviceid = deviceid;
	}

	@Column(name = "version_codes", length = 20)
	public String getVersion_codes() {
		return version_codes;
	}

	public void setVersion_codes(String version_codes) {
		this.version_codes = version_codes;
	}

	@Column(name = "resolution", length = 20)
	public String getResolution() {
		return resolution;
	}

	public void setResolution(String resolution) {
		this.resolution = resolution;
	}

	@Column(name = "time", length = 20)
	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

}
