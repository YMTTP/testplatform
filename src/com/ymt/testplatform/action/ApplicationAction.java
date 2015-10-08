package com.ymt.testplatform.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionSupport;
import com.ymt.testplatform.entity.Application;
import com.ymt.testplatform.entity.ApplicationType;
import com.ymt.testplatform.entity.Department;
import com.ymt.testplatform.service.application.ApplicationService;
import com.ymt.testplatform.service.department.DepartmentService;



@Controller
public class ApplicationAction extends ActionSupport {

	private static final long serialVersionUID = 1L;

	@Resource
	private ApplicationService applicationService;
	
	@Resource
	private DepartmentService departmentService;

	private Integer applicationid;
	private String name;	
	private String domain;
	private Integer applicationtypeid;
	private String devs;
	private String dependencies;
	private Integer departmentid;
	private String remark;
	
	private List<Application> applications;
	private Application application;
	
	private Integer pagesize;
	private Integer pageindex;
	
	private Long pageNum;
	private String retCode;
	private String retMSG;

	public String createApplication(){
		
		Application app = new Application();
		
		ApplicationType apptype = applicationService.findApplicationTypeById(applicationtypeid);
		if(apptype!=null){
			app.setApplicationtype(apptype);
		}
	
		app.setDel(0);
		
		Department dep = departmentService.findDepartmentById(departmentid);
		if(dep!=null){
			app.setDepartment(dep);
		}
		
		app.setDevs(devs);
		app.setDomain(domain);
		app.setDependencies(dependencies);
		app.setName(name);
		app.setRemark(remark);
		
		applicationService.saveApplication(app);
		this.setRetMSG("创建应用成功");
		this.setRetCode("1000");
		return "success";
	}
	
	public String deleteDepartment(){
		Application app = applicationService.findApplicationById(applicationid);
		
		if (app == null) {
			this.setRetMSG("该应用不存在");
			this.setRetCode("1001");
			return "success";
		}
		
		app.setDel(1);
		applicationService.saveApplication(app);
		this.setRetMSG("删除应用成功");
		this.setRetCode("1000");
		return "success";
	}
	
	public String findApplicationById(){
		Application app = applicationService.findApplicationById(applicationid);
		
		if (app == null) {
			this.setRetMSG("该应用不存在");
			this.setRetCode("1001");
			return "success";
		}
		this.setApplication(app);
		this.setRetMSG("查询部门应用成功");
		this.setRetCode("1000");
		return "success";
	}
	
	public String updateApplication() {
		Application app = applicationService.findApplicationById(applicationid);
		
		if (app == null) {
			this.setRetMSG("该应用不存在");
			this.setRetCode("1001");
			return "success";
		}
		
		ApplicationType apptype = applicationService.findApplicationTypeById(applicationtypeid);
		if(apptype!=null){
			app.setApplicationtype(apptype);
		}else{
			app.setApplicationtype(null);
		}
	
		app.setDel(0);
		
		Department dep = departmentService.findDepartmentById(departmentid);
		if(dep!=null){
			app.setDepartment(dep);
		}else{
			app.setDepartment(null);
		}
		
		app.setDevs(devs);
		app.setDomain(domain);
		app.setDependencies(dependencies);
		app.setName(name);
		app.setRemark(remark);
		
		applicationService.updateApplication(app);
		
		this.setRetMSG("应用更新成功");
		this.setRetCode("1000");
		return "success";
	}

	public String listApplications() {	
		List<Application> apps = new ArrayList<Application>();
		HashMap<String, Object> conditions = new HashMap<String, Object>();
			
		if(this.domain!=null&&!this.domain.equals("")){
			conditions.put("domain", this.domain);
		}
		if(this.applicationtypeid!=null&&!this.applicationtypeid.equals("")){
			conditions.put("applicationtypeid", this.applicationtypeid);
		}
		if(this.departmentid!=null&&!this.departmentid.equals("")){
			conditions.put("departmentid", this.departmentid);
		}
		
		apps = applicationService.findAllApplications(pageindex,pagesize,conditions);
		Long pageNum = applicationService.findApplicationPages(pagesize, conditions);
		this.setApplications(apps);
		this.setPageNum(pageNum);
		this.setRetMSG("操作成功");
		this.setRetCode("1000");
		return "success";
	}

	public String getRetMSG() {
		return retMSG;
	}

	public void setRetMSG(String retMSG) {
		this.retMSG = retMSG;
	}

	public String getRetCode() {
		return retCode;
	}

	public void setRetCode(String retCode) {
		this.retCode = retCode;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDomain() {
		return domain;
	}

	public void setDomain(String domain) {
		this.domain = domain;
	}

	public Integer getApplicationtypeid() {
		return applicationtypeid;
	}

	public void setApplicationtypeid(Integer applicationtypeid) {
		this.applicationtypeid = applicationtypeid;
	}

	public String getDevs() {
		return devs;
	}

	public void setDevs(String devs) {
		this.devs = devs;
	}

	public String getDependencies() {
		return dependencies;
	}

	public void setDependencies(String dependencies) {
		this.dependencies = dependencies;
	}

	public Integer getDepartmentid() {
		return departmentid;
	}

	public void setDepartmentid(Integer departmentid) {
		this.departmentid = departmentid;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
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

	public Integer getApplicationid() {
		return applicationid;
	}

	public void setApplicationid(Integer applicationid) {
		this.applicationid = applicationid;
	}

	public Application getApplication() {
		return application;
	}

	public void setApplication(Application application) {
		this.application = application;
	}

	public List<Application> getApplications() {
		return applications;
	}

	public void setApplications(List<Application> applications) {
		this.applications = applications;
	}

	public Long getPageNum() {
		return pageNum;
	}

	public void setPageNum(Long pageNum) {
		this.pageNum = pageNum;
	}


}
