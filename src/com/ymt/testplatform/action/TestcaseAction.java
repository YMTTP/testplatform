package com.ymt.testplatform.action;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionSupport;
import com.ymt.testplatform.entity.Application;
import com.ymt.testplatform.entity.ApplicationEnv;
import com.ymt.testplatform.entity.Env;
import com.ymt.testplatform.entity.ResultContent;
import com.ymt.testplatform.entity.ServerInfo;
import com.ymt.testplatform.entity.Testcase;
import com.ymt.testplatform.entity.Testpass;
import com.ymt.testplatform.entity.Testsuite;
import com.ymt.testplatform.entity.VmInfo;
import com.ymt.testplatform.service.application.ApplicationService;
import com.ymt.testplatform.service.environment.EnvironmentService;
import com.ymt.testplatform.service.testcase.TestcaseService;



@Controller
public class TestcaseAction extends ActionSupport {

	private static final long serialVersionUID = 1L;

	@Resource
	private TestcaseService testcaseService;
	
	@Resource
	private ApplicationService applicationService;

	
	private Integer applicationid;
	private Integer testsuiteid;
	private Integer testcaseid;
	private Integer departmentid;	
	private Integer envid;
	private Integer testpassid;
	private Integer status;
	private Integer pageSize;
	private Integer pageIndex;
	
	private JSONObject ret = new JSONObject();;

	// test case
	public String listTestApplications(){
		List<Testsuite> testsuites = new ArrayList<Testsuite>();	
		testsuites = testcaseService.findAllTestsuitesByApplicationId(applicationid, departmentid, pageSize, pageIndex);
		List<Application> applications  = new ArrayList<Application>();
		String[] testsuitescount = new String[testsuites.size()];
		String[] testcasescount = new String[testsuites.size()];
		
		for(int i = 0; i < testsuites.size(); i++){
			applications.add(testsuites.get(i).getApplication());
			testsuitescount[i] = String.valueOf(testcaseService.getTestsuiteCountByApplicationId(testsuites.get(i).getApplication().getId()));
			testcasescount[i] = String.valueOf(testcaseService.getTestcaseCountByApplicationId(testsuites.get(i).getApplication().getId()));
		}
		
		Long pageNum = testcaseService.findAllTestsuitesPages(applicationid, departmentid, pageSize);
		JSONArray ja = JSONArray.fromObject(applications);
		ret.put("applications", ja);
		ret.put("testsuitescount", testsuitescount);
		ret.put("testcasescount", testcasescount);
		ret.put("pagenum", pageNum);
		ret.put("retCode", "1000");
		ret.put("retMSG", "操作成功");
		return "success";
	}

	
	public String listTestsuitesByApplicationId(){
		List<Testsuite> testsuites = new ArrayList<Testsuite>();	
		testsuites = testcaseService.findAllTestsuitesByApplicationId(applicationid);
		JSONArray ja = JSONArray.fromObject(testsuites);
		Long[] testcasescount = new Long[testsuites.size()];
		for(int i = 0; i < testsuites.size(); i++){
			testcasescount[i] = testcaseService.getTestcaseCountByTestsuiteId(testsuites.get(i).getId());
		}

		String domain = applicationService.findApplicationById(applicationid).getDomain();
		
		ret.put("domain", domain);
		ret.put("testcasescount", testcasescount);
		ret.put("testsuites", ja);
		ret.put("retCode", "1000");
		ret.put("retMSG", "操作成功");
		return "success";
	}

	public String listTestcaseByTestsuiteId(){
		List<Testcase> testcases = new ArrayList<Testcase>();	
		testcases = testcaseService.findAllTestcasesByTestuiteid(testsuiteid);
		JSONArray ja = JSONArray.fromObject(testcases);
		
		String url = testcaseService.findTestsuiteById(testsuiteid).getUrl();
		ret.put("url", url);
		ret.put("testcases", ja);
		ret.put("retCode", "1000");
		ret.put("retMSG", "操作成功");
		return "success";
	}
	

	public String updateTestsuiteStatus(){
		Testsuite testsuite = testcaseService.findTestsuiteById(testsuiteid);
		if(testsuite==null){
			ret.put("retCode", "1001");
			ret.put("retMSG", "该接口不存在");
			return "success";
		}
		
		testsuite.setDel(status);
		testcaseService.updateTestsuite(testsuite);
		
		ret.put("retCode", "1000");
		ret.put("retMSG", "操作成功");
		return "success";
	}
	
	public String updateTestcaseStatus(){
		Testcase testcase = testcaseService.findTestcaseById(testcaseid);
		if(testcase==null){
			ret.put("retCode", "1001");
			ret.put("retMSG", "该用例不存在");
			return "success";
		}
		
		testcase.setDel(status);
		testcaseService.updateTestcase(testcase);
		ret.put("retCode", "1000");
		ret.put("retMSG", "操作成功");
		return "success";
	}
	
	
	// test result
	public String getTestpass(){
		List<Testpass> tps = new ArrayList<Testpass>();
		
		HashMap<String, Object> conditions = new HashMap<String, Object>();
		
		if(this.applicationid!=null&&!this.applicationid.equals("")){
			conditions.put("applicationid", this.applicationid);
		}
		if(this.envid!=null&&!this.envid.equals("")){
			conditions.put("envid", this.envid);
		}
		
		tps = testcaseService.findAllTestpass(pageIndex, pageSize, departmentid, conditions);
		JSONArray ja = JSONArray.fromObject(tps);
		
		Long[] urlcount = new Long[tps.size()];
		Long[] totalcasecount = new Long[tps.size()];
		Long[] failedcasecount = new Long[tps.size()];
		String[] passrate = new String[tps.size()];
		DecimalFormat df = new DecimalFormat("######0.00");
		
		for(int i =0 ; i < tps.size(); i++){
			urlcount[i] = testcaseService.getTestsuiteResultCount(tps.get(i).getId());
			Long total = testcaseService.getTotalTestcaseResultCountByTestpass(tps.get(i).getId());
			Long failed = testcaseService.getFailedTestcaseResultCountByTestpass(tps.get(i).getId());
			totalcasecount[i] = total;
			failedcasecount[i] = failed;
			passrate[i] = df.format((total-failed)*100.00/total) + "%";
		}
		
		ret.put("testpass", ja);
		ret.put("urlcount", urlcount);
		ret.put("totalcasecount", totalcasecount);
		ret.put("failedcasecount", failedcasecount);
		ret.put("passrate", passrate);
		ret.put("retCode", "1000");
		ret.put("retMSG", "操作成功");
		return "success";
	}
	
	public Integer getApplicationid() {
		return applicationid;
	}


	public void setApplicationid(Integer applicationid) {
		this.applicationid = applicationid;
	}


	public Integer getDepartmentid() {
		return departmentid;
	}


	public void setDepartmentid(Integer departmentid) {
		this.departmentid = departmentid;
	}


	public Integer getTestsuiteid() {
		return testsuiteid;
	}


	public void setTestsuiteid(Integer testsuiteid) {
		this.testsuiteid = testsuiteid;
	}


	public Integer getTestcaseid() {
		return testcaseid;
	}


	public void setTestcaseid(Integer testcaseid) {
		this.testcaseid = testcaseid;
	}


	public Integer getStatus() {
		return status;
	}


	public void setStatus(Integer status) {
		this.status = status;
	}


	public Integer getEnvid() {
		return envid;
	}


	public void setEnvid(Integer envid) {
		this.envid = envid;
	}


	public Integer getTestpassid() {
		return testpassid;
	}


	public void setTestpassid(Integer testpassid) {
		this.testpassid = testpassid;
	}


	public Integer getPageSize() {
		return pageSize;
	}


	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}


	public Integer getPageIndex() {
		return pageIndex;
	}


	public void setPageIndex(Integer pageIndex) {
		this.pageIndex = pageIndex;
	}


	public JSONObject getRet() {
		return ret;
	}


	public void setRet(JSONObject ret) {
		this.ret = ret;
	}
	
}
