package com.ymt.testplatform.action;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionSupport;
import com.ymt.testplatform.entity.AppAssert;
import com.ymt.testplatform.entity.Department;
import com.ymt.testplatform.entity.User;
import com.ymt.testplatform.service.appassert.AppAssertService;
import com.ymt.testplatform.service.department.DepartmentService;
import com.ymt.testplatform.service.user.UserService;



@Controller
public class AppAssertAction extends ActionSupport {

	private static final long serialVersionUID = 1L;

	@Resource
	private AppAssertService appAssertService;
	
	@Resource
	private UserService userService;

	private Integer id;
	private AppAssert appAssert;
	private String IMEI;
	private String SN;
	private String resolution;
	private String OS;
	private String brand;
	private String type;
	private String remark;
	private String time;
	private Integer userid;
	private List<AppAssert> appAsserts;
	private Integer pagesize;
	private Integer pageindex;
	private JSONObject ret = new JSONObject();

	public String createAppAssert(){
		
		AppAssert appa = new AppAssert();
		
		User user = userService.findUserById(userid);
		
		if(user!=null){
			appa.setOwner(user);
		}else{
			ret.put("retCode", "1001");
			ret.put("retMSG", "负责人不存在");
			return "success";
		}
		
		appa.setBrand(brand);
		appa.setDel(0);
		appa.setIMEI(IMEI);
		appa.setOS(OS);
		appa.setRemark(remark);
		appa.setResolution(resolution);
		appa.setSN(SN);
		appa.setTime(time);
		appa.setType(type);
		
		
		appAssertService.saveAppAssert(appa);
		ret.put("retCode", "1000");
		ret.put("retMSG", "添加设备成功");
		return "success";
	}
	
	public String deleteAppAssert(){
		AppAssert appa = appAssertService.findAppAssertById(id);
		
		if (appa == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该设备不存在");
			return "success";
		}
		
		appa.setDel(1);
		appAssertService.saveAppAssert(appa);
		ret.put("retCode", "1000");
		ret.put("retMSG", "删除设备成功");
		return "success";
	}
	
	public String findAppAssertById(){
		AppAssert appa = appAssertService.findAppAssertById(id);
		
		if (appa == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该设备不存在");
			return "success";
		}
		ret.put("appassert", appa);
		ret.put("retCode", "1000");
		ret.put("retMSG", "查询设备成功");
		return "success";
	}
	
	public String updateAppAssert() {
		AppAssert appa = appAssertService.findAppAssertById(id);
		
		if (appa == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该设备不存在");
			return "success";
		}
		
		User user = userService.findUserById(userid);
		
		if(user!=null){
			appa.setOwner(user);
		}else{
			ret.put("retCode", "1001");
			ret.put("retMSG", "负责人不存在");
			return "success";
		}
		
		appa.setBrand(brand);
		appa.setDel(0);
		appa.setIMEI(IMEI);
		appa.setOS(OS);
		appa.setRemark(remark);
		appa.setResolution(resolution);
		appa.setSN(SN);
		appa.setTime(time);
		appa.setType(type);

		
		appAssertService.updateAppAssert(appa);
		
		ret.put("retCode", "1000");
		ret.put("retMSG", "部门设备成功");
		return "success";
	}

	public String listAppAsserts() {	
		List<AppAssert> appas = new ArrayList<AppAssert>();
		appas = appAssertService.findAllList(pageindex,pagesize);
		Long pageNum = appAssertService.findPages(pagesize);
		JSONArray ja = JSONArray.fromObject(appas);
		ret.put("pagenum", pageNum);
		ret.put("appasserts", ja);
		ret.put("retCode", "1000");
		ret.put("retMSG", "操作成功");
		return "success";
	}
	

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public AppAssert getAppAssert() {
		return appAssert;
	}

	public void setAppAssert(AppAssert appAssert) {
		this.appAssert = appAssert;
	}

	public String getIMEI() {
		return IMEI;
	}

	public void setIMEI(String iMEI) {
		IMEI = iMEI;
	}

	public String getSN() {
		return SN;
	}

	public void setSN(String sN) {
		SN = sN;
	}

	public String getResolution() {
		return resolution;
	}

	public void setResolution(String resolution) {
		this.resolution = resolution;
	}

	public String getOS() {
		return OS;
	}

	public void setOS(String oS) {
		OS = oS;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public Integer getUserid() {
		return userid;
	}

	public void setUserid(Integer userid) {
		this.userid = userid;
	}

	public List<AppAssert> getAppAsserts() {
		return appAsserts;
	}

	public void setAppAsserts(List<AppAssert> appAsserts) {
		this.appAsserts = appAsserts;
	}

	public Integer getPagesize() {
		return pagesize;
	}

	public void setPagesize(Integer pagesize) {
		this.pagesize = pagesize;
	}

	public Integer getPageindex() {
		return pageindex;
	}

	public void setPageindex(Integer pageindex) {
		this.pageindex = pageindex;
	}

	public JSONObject getRet() {
		return ret;
	}

	public void setRet(JSONObject ret) {
		this.ret = ret;
	}

	


}
