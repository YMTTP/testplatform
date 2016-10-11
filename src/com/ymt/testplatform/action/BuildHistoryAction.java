package com.ymt.testplatform.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionSupport;
import com.ymt.testplatform.entity.Application;
import com.ymt.testplatform.entity.BuildHistory;
import com.ymt.testplatform.entity.Env;
import com.ymt.testplatform.service.application.ApplicationService;
import com.ymt.testplatform.service.build.BuildService;
import com.ymt.testplatform.service.environment.EnvironmentService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
public class BuildHistoryAction extends ActionSupport {
	private static final long serialVersionUID = 1L;
	
	@Resource
	private BuildService buildService;
	
	@Resource
	private ApplicationService applicationService;
	
	@Resource
	private EnvironmentService environmentService;
	
	private Integer appid;
	private Integer envid;
	private String revision;
	private String today;
	
	private Integer pagesize;
	private Integer pageindex;
	
	private JSONObject ret = new JSONObject();

	
	public String listBuildHistory() {	
		List<BuildHistory> buildHistory = new ArrayList<BuildHistory>();
		HashMap<String, Object> conditions = new HashMap<String, Object>();
			
		if(this.appid!=null&&!this.appid.equals("")){
			conditions.put("appid", this.appid);
		}
		if(this.envid!=null&&!this.envid.equals("")){
			conditions.put("envid", this.envid);
		}
		if(this.revision!=null&&!this.revision.equals("")){
			conditions.put("revision", this.revision);
		}
		
		buildHistory = buildService.findAllBuildHistory(pageindex,pagesize,conditions,this.today);
		
		String[] appArr = new String[buildHistory.size()];
		String[] envArr = new String[buildHistory.size()];
		for(int i=0; i<buildHistory.size(); i++){
			Env appenvs = environmentService.findEnvById(buildHistory.get(i).getEnvid());
			Application apps = applicationService.findApplicationById(buildHistory.get(i).getAppid());
			appArr[i] = apps.getDomain();
			envArr[i] = appenvs.getName();
		}
		
		
		Long pageNum = buildService.findBuildHistoryPages(pagesize, conditions,this.today);
		JSONArray ja = JSONArray.fromObject(buildHistory);
		ret.put("buildHistory", ja);
		ret.put("appNames", appArr);
		ret.put("envs", envArr);
		ret.put("pagenum", pageNum);
		ret.put("retCode", "1000");
		ret.put("retMSG", "操作成功");
		return "success";
	}


	public Integer getAppid() {
		return appid;
	}


	public void setAppid(Integer appid) {
		this.appid = appid;
	}


	public Integer getEnvid() {
		return envid;
	}


	public void setEnvid(Integer envid) {
		this.envid = envid;
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


	public String getRevision() {
		return revision;
	}


	public void setRevision(String revision) {
		this.revision = revision;
	}


	public String getToday() {
		return today;
	}


	public void setToday(String today) {
		this.today = today;
	}
}
