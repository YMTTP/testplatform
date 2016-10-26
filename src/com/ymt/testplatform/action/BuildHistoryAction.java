package com.ymt.testplatform.action;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionSupport;
import com.ymt.testplatform.entity.BuildHistory;
import com.ymt.testplatform.entity.Env;
import com.ymt.testplatform.service.application.ApplicationService;
import com.ymt.testplatform.service.build.BuildService;
import com.ymt.testplatform.service.environment.EnvironmentService;
import com.ymt.testplatform.util.Utils;

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
	private String start;
	private String end;
	private String month;
	private String year;
	
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
			//Application apps = applicationService.findApplicationById(buildHistory.get(i).getAppid());
			appArr[i] = buildHistory.get(i).getApplication().getDomain();
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

	public String listBuildHistoryCount(){
		List<BuildHistory> buildHistory = new ArrayList<BuildHistory>();
//		HashMap<String, Object> conditions = new HashMap<String, Object>();

		buildHistory = buildService.findBuildHistoryByTime(pageindex, pagesize, this.appid, this.start, this.end);
		
		String[] domain = new String[buildHistory.size()];
		Long[] sit1 = new Long[buildHistory.size()];
		Long[] sit2 = new Long[buildHistory.size()];
		Long[] uat = new Long[buildHistory.size()];
		Long[] stress = new Long[buildHistory.size()];
		Long[] total = new Long[buildHistory.size()];
		
		for(int i=0; i<buildHistory.size(); i++){
			domain[i] = buildHistory.get(i).getApplication().getDomain();
			sit1[i] = buildService.findBuildHistoryCountByAppid(buildHistory.get(i).getApplication().getId(), 1, this.start, this.end);
			sit2[i] = buildService.findBuildHistoryCountByAppid(buildHistory.get(i).getApplication().getId(), 2, this.start, this.end);
			uat[i] = buildService.findBuildHistoryCountByAppid(buildHistory.get(i).getApplication().getId(), 3, this.start, this.end);
			stress[i] = buildService.findBuildHistoryCountByAppid(buildHistory.get(i).getApplication().getId(), 4, this.start, this.end);
			total[i] = sit1[i] + sit2[i] + uat[i] + stress[i];
		}
		
		Long pageNum = buildService.findBuildHistoryByTimePages(pagesize, this.appid, this.start, this.end);

		ret.put("domain", domain);
		ret.put("sit1", sit1);
		ret.put("sit2", sit2);
		ret.put("uat", uat);
		ret.put("stress", stress);
		ret.put("total", total);
		ret.put("pagenum", pageNum);
		ret.put("retCode", "1000");
		ret.put("retMSG", "操作成功");
		return "success";
		
	}
	
	public String buildHistoryMonthly(){
		Long[] sit1 = new Long[12] ;
		Long[] sit2 = new Long[12] ;
		Long[] uat = new Long[12] ;
		Long[] stress = new Long[12] ;
		for(int i= 0; i<12; i++){
			sit1[i] = buildService.findMonthlyBuildHistoryCountByYearAndEvn(this.year, i+1+"", 1);
			sit2[i] = buildService.findMonthlyBuildHistoryCountByYearAndEvn(this.year, i+1+"", 2);
			uat[i] = buildService.findMonthlyBuildHistoryCountByYearAndEvn(this.year, i+1+"", 3);
			stress[i] = buildService.findMonthlyBuildHistoryCountByYearAndEvn(this.year, i+1+"", 4);
		}

		ret.put("sit1", sit1);
		ret.put("sit2", sit2);
		ret.put("uat", uat);
		ret.put("stress", stress);
		ret.put("retCode", "1000");
		ret.put("retMSG", "操作成功");
		return "success";

	}
	
	public String buildHistoryDaily(){
		int days = Utils.getDaysByMonth(Integer.parseInt(this.year), Integer.parseInt(this.month));
		Long[] sit1 = new Long[days] ;
		Long[] sit2 = new Long[days] ;
		Long[] uat = new Long[days] ;
		Long[] stress = new Long[days] ;
		for(int i= 0; i<days; i++){
			sit1[i] = buildService.findDailyBuildHistoryCountByTimeAndEvn(this.year+"-"+this.month+"-"+ (i+1), 1);
			sit2[i] = buildService.findDailyBuildHistoryCountByTimeAndEvn(this.year+"-"+this.month+"-"+ (i+1), 2);
			uat[i] = buildService.findDailyBuildHistoryCountByTimeAndEvn(this.year+"-"+this.month+"-"+ (i+1), 3);
			stress[i] = buildService.findDailyBuildHistoryCountByTimeAndEvn(this.year+"-"+this.month+"-"+ (i+1), 4);
		}

		ret.put("sit1", sit1);
		ret.put("sit2", sit2);
		ret.put("uat", uat);
		ret.put("stress", stress);
		ret.put("retCode", "1000");
		ret.put("retMSG", "操作成功");
		return "success";
	}

	
	
	public String buildHistoryDailyAppCount(){
		int days = Utils.getDaysByMonth(Integer.parseInt(this.year), Integer.parseInt(this.month));
		Long[] count = new Long[days] ;
		for(int i= 0; i<days; i++){
			count[i] = buildService.findDailyBuildAppCountByByTime(this.year+"-"+this.month+"-"+ (i+1));
		}
		ret.put("count", count);
		ret.put("retCode", "1000");
		ret.put("retMSG", "操作成功");
		return "success";
	}
	
	public String buildHistoryMonthlyAppCount(){
		Long[] count = new Long[12] ;

		for(int i= 0; i<12; i++){
			count[i] = buildService.findMonthlyBuildAppCountByYear(this.year, i+1+"");
		}

		ret.put("count", count);

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

	public String getStart() {
		return start;
	}

	public void setStart(String start) {
		this.start = start;
	}

	public String getEnd() {
		return end;
	}

	public void setEnd(String end) {
		this.end = end;
	}

	public String getMonth() {
		return month;
	}

	public void setMonth(String month) {
		this.month = month;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}
}
