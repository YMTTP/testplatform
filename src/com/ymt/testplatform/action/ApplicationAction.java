package com.ymt.testplatform.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

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

	private String type;
	private String typeremark;
	
	private List<Application> applications;
	private Application application;
	
	private Integer pagesize;
	private Integer pageindex;
	
	private JSONObject ret = new JSONObject();

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
		ret.put("retCode", "1000");
		ret.put("retMSG", "创建应用成功");
		return "success";
	}
	
	public String deleteApplication(){
		Application app = applicationService.findApplicationById(applicationid);
		
		if (app == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该应用不存在");
			return "success";
		}
		
		app.setDel(1);
		applicationService.saveApplication(app);
		ret.put("retCode", "1000");
		ret.put("retMSG", "删除应用成功");
		return "success";
	}
	
	public String findApplicationById(){
		Application app = applicationService.findApplicationById(applicationid);
		
		if (app == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该应用不存在");
			return "success";
		}
		this.setApplication(app);
		ret.put("retCode", "1000");
		ret.put("retMSG", "查询部门应用成功");
		return "success";
	}
	
	public String updateApplication() {
		Application app = applicationService.findApplicationById(applicationid);
		
		if (app == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该应用不存在");
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
		ret.put("retCode", "1000");
		ret.put("retMSG", "应用更新成功");
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
		JSONArray ja = JSONArray.fromObject(apps);
		ret.put("apps", ja);
		ret.put("pagenum", pageNum);
		ret.put("retCode", "1000");
		ret.put("retMSG", "操作成功");
		return "success";
	}

	public String createApplicationType(){
		
		ApplicationType appType = applicationService.findApplicationTypeByName(type);
		
		if(appType != null){
			ret.put("retCode", "1001");
			ret.put("retMSG", "该类型已存在");
			return "success";
		}
		
		appType = new ApplicationType();
		appType.setType(type);
		appType.setRemark(typeremark);
		appType.setDel(0);
		
		applicationService.saveApplicationType(appType);
			
		ret.put("retCode", "1000");
		ret.put("retMSG", "创建成功");
		return "success";
	}
	
	
	public String findApplicationTypeById(){
		ApplicationType appType = applicationService.findApplicationTypeById(applicationtypeid);
		
		if(appType == null){
			ret.put("retCode", "1001");
			ret.put("retMSG", "该类型不存在");
			return "success";
		}
		
		ret.put("apptype", appType);
		ret.put("retCode", "1000");
		ret.put("retMSG", "操作成功");
		return "success";
	}
	
	public String updateApplicationType(){
		ApplicationType appType = applicationService.findApplicationTypeById(applicationtypeid);
		
		if(appType == null){
			ret.put("retCode", "1001");
			ret.put("retMSG", "该类型不存在");
			return "success";
		}
		
		appType.setRemark(typeremark);
		appType.setType(type);
		applicationService.saveApplicationType(appType);
		
		ret.put("retCode", "1000");
		ret.put("retMSG", "更新成功");
		return "success";
	}
	
	public String deleteApplicationType(){
		ApplicationType appType = applicationService.findApplicationTypeById(applicationtypeid);
		
		if(appType == null){
			ret.put("retCode", "1001");
			ret.put("retMSG", "该类型不存在");
			return "success";
		}
		
		appType.setDel(1);
		applicationService.saveApplicationType(appType);
		
		ret.put("retCode", "1000");
		ret.put("retMSG", "删除成功");
		return "success";
	}
	
	
	public String listApplicationTypes() {	
		List<ApplicationType> apptypes = new ArrayList<ApplicationType>();		
		apptypes = applicationService.findAllApplicationTypes();
		JSONArray ja = JSONArray.fromObject(apptypes);
		ret.put("apptypes", ja);
		ret.put("retCode", "1000");
		ret.put("retMSG", "操作成功");
		return "success";
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

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getTyperemark() {
		return typeremark;
	}

	public void setTyperemark(String typeremark) {
		this.typeremark = typeremark;
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

	public JSONObject getRet() {
		return ret;
	}

	public void setRet(JSONObject ret) {
		this.ret = ret;
	}


}
