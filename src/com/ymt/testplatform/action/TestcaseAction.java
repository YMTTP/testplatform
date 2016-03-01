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
import com.ymt.testplatform.entity.ApplicationEnv;
import com.ymt.testplatform.entity.Env;
import com.ymt.testplatform.entity.ServerInfo;
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
	private Integer departmentid;
	private Integer pageSize;
	private Integer pageIndex;
	
	private JSONObject ret = new JSONObject();;

	
	public String listTestApplications(){
		List<Testsuite> testsuites = new ArrayList<Testsuite>();	
		testsuites = testcaseService.findAllTestsuitesByApplicationId(applicationid, departmentid, pageSize, pageIndex);
		//testsuites = testcaseService.findAllTestsuitesByApplicationId(22, 8, 20, 1);
		String[] domains = new String[testsuites.size()];
		String[] testsuitescount = new String[testsuites.size()];
		String[] testcasescount = new String[testsuites.size()];
		
		for(int i = 0; i < testsuites.size(); i++){
			domains[i] = testsuites.get(i).getApplication().getDomain();
			testsuitescount[i] = String.valueOf(testcaseService.getTestsuiteCountByApplicationId(testsuites.get(i).getApplication().getId()));
			testcasescount[i] = String.valueOf(testcaseService.getTestcaseCountByApplicationId(testsuites.get(i).getApplication().getId()));
		}
		
		Long pageNum = testcaseService.findAllTestsuitesPages(applicationid, departmentid, pageSize);
		//Long pageNum = testcaseService.findAllTestsuitesPages(22, 8, pageSize);
		
		ret.put("domains", domains);
		ret.put("testsuitescount", testsuitescount);
		ret.put("testcasescount", testcasescount);
		ret.put("pagenum", pageNum);
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
