package com.ymt.testplatform.action;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionSupport;
import com.ymt.testplatform.entity.Application;
import com.ymt.testplatform.entity.Env;
import com.ymt.testplatform.entity.StressTask;
import com.ymt.testplatform.entity.StressResult;
import com.ymt.testplatform.entity.User;
import com.ymt.testplatform.service.application.ApplicationService;
import com.ymt.testplatform.service.environment.EnvironmentService;
import com.ymt.testplatform.service.stress.StressService;
import com.ymt.testplatform.service.user.UserService;


@Controller
public class StressAction extends ActionSupport {

	private static final long serialVersionUID = 1L;

	@Resource
	private StressService stressService;
	@Resource
	private ApplicationService applicationService;
	@Resource
	private UserService userService;
	@Resource
	private EnvironmentService environmentService;
	
	
	// stresstask
	private Integer stresstaskid;
	private String title;
	private Integer creatorid;
	private String dev;
	private String background;
	private String conclusion;
	private Integer applicationid;
	private Integer departmentid;
	private Integer envid;
	private String status;
	
	// stressresult
	// basic info
	private Integer stressresultid;
	private String url;
	private String tps;
	private String responseTime;
	private String concurrence;
	private String duration;
	private String passrate;
	private String precondition;
	private String comment;
	
	// server info
	private String serverCpu;
	private String serverMemory;
	private String serverDiskInput;
	private String serverDiskOutput;
	private String serverNetworkInput;
	private String serverNetworkOutput;
	
	// MSSQL info
	private String mssqlCpu;
	private String mssqlDiskInput;
	private String mssqlDiskOutput;
	private String mssqlNetworkInput;
	private String mssqlNetworkOutput;
	
	// MySQL info
	private String mysqlCpu;
	private String mysqlDiskInput;
	private String mysqlDiskOutput;
	private String mysqlNetworkInput;
	private String mysqlNetworkOutput;
	
	// Mongo info
	private String mongoCpu;
	private String mongoDiskInput;
	private String mongoDiskOutput;
	private String mongoNetworkInput;
	private String mongoNetworkOutput;
	
	
	
	private Integer pagesize;
	private Integer pageindex;
	
	private JSONObject ret = new JSONObject();

	public String createStressTask(){
		
		StressTask st = new StressTask();
		
		
		Application app = applicationService.findApplicationById(applicationid);
		if(app==null){
			ret.put("retCode", "1001");
			ret.put("retMSG", "应用不存在");
			return "success";
		}
		
		User user = userService.findUserById(creatorid);
		if(user==null){
			ret.put("retCode", "1001");
			ret.put("retMSG", "创建人不存在");
			return "success";
		}
		
		Env env = environmentService.findEnvById(envid);
		if(env==null){
			ret.put("retCode", "1001");
			ret.put("retMSG", "环境不存在");
			return "success";
		}
		
		st.setApplication(app);
		st.setTitle(title);
		st.setBackground(background);
		Date d = new Date();
		st.setCreateTime(d.toLocaleString());
		st.setCreator(user);
		st.setDev(dev);
		st.setStatus("0");
		st.setEnv(env);
		st.setDel(0);
		
		stressService.saveStressTask(st);
		ret.put("retCode", "1000");
		ret.put("retMSG", "创建压测任务成功");
		return "success";
	}

	
	public String findStressTaskById(){
		StressTask st = stressService.findStressTaskById(stresstaskid);
		
		if (st == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该压测任务不存在");
			return "success";
		}
		

		ret.put("stresstask", st);
		ret.put("retCode", "1000");
		ret.put("retMSG", "查询压测任务成功");
		return "success";
	}
	
	public String updateStressTask() {
		StressTask st = stressService.findStressTaskById(stresstaskid);
		
		if (st == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该压测任务不存在");
			return "success";
		}
			
		Application app = applicationService.findApplicationById(applicationid);
		if(app==null){
			ret.put("retCode", "1001");
			ret.put("retMSG", "应用不存在");
			return "success";
		}
		
		Env env = environmentService.findEnvById(envid);
		if(env==null){
			ret.put("retCode", "1001");
			ret.put("retMSG", "环境不存在");
			return "success";
		}
		
		st.setApplication(app);
		st.setBackground(background);
		st.setConclusion(conclusion);
		st.setTitle(title);
		st.setDev(dev);
		st.setStatus(status);
		st.setEnv(env);

		
		stressService.updateStressTask(st);
		
		ret.put("retCode", "1000");
		ret.put("retMSG", "职位压测任务成功");
		return "success";
	}

	public String listStressTasks() {	
		List<StressTask> sts = new ArrayList<StressTask>();
		
		HashMap<String, Object> conditions = new HashMap<String, Object>();
		
		if(this.applicationid!=null&&!this.applicationid.equals("")){
			conditions.put("applicationid", this.applicationid);
		}
		if(this.status!=null&&!this.status.equals("")){
			conditions.put("status", this.status);
		}
		if(this.creatorid!=null&&!this.creatorid.equals("")){
			conditions.put("creatorid", this.creatorid);
		}
		
		sts = stressService.findAllStressTasks(this.pageindex, this.pagesize, conditions);
		
		Long pageNum = stressService.findStressTaskPages(this.pagesize, conditions);
		
		JSONArray ja = JSONArray.fromObject(sts);
		ret.put("StressTasks", ja);
		ret.put("pagenum", pageNum);
		ret.put("retCode", "1000");
		ret.put("retMSG", "操作成功");
		return "success";
	}
	
	public String createTaskResult(){
		
		StressResult sr = new StressResult();
		
		StressTask st = stressService.findStressTaskById(stresstaskid);
		
		if(st == null){
			ret.put("retCode", "1001");
			ret.put("retMSG", "压测任务不存在");
			return "success";
		}
		
		sr.setStressTask(st);
		sr.setTps(tps);
		sr.setUrl(url);
		sr.setDuration(duration);
		sr.setPassrate(passrate);
		sr.setPrecondition(precondition);
		sr.setResponseTime(responseTime);
		sr.setComment(comment);
		sr.setConcurrence(concurrence);
		sr.setDel(0);
		
		sr.setServerCpu(serverCpu);
		sr.setServerDiskInput(serverDiskInput);
		sr.setServerDiskOutput(serverDiskOutput);
		sr.setServerMemory(serverMemory);
		sr.setServerNetworkInput(serverNetworkInput);
		sr.setServerNetworkOutput(serverNetworkOutput);
		sr.setMongoCpu(mongoCpu);
		sr.setMongoDiskInput(mongoDiskInput);
		sr.setMongoDiskOutput(mongoDiskOutput);
		sr.setMongoNetworkInput(mongoNetworkInput);
		sr.setMongoNetworkOutput(mongoNetworkOutput);
		sr.setMssqlCpu(mssqlCpu);
		sr.setMssqlDiskInput(mssqlDiskInput);
		sr.setMssqlDiskOutput(mssqlDiskOutput);
		sr.setMssqlNetworkInput(mssqlNetworkInput);
		sr.setMssqlNetworkOutput(mssqlNetworkOutput);
		sr.setMysqlCpu(mysqlCpu);
		sr.setMysqlDiskInput(mysqlDiskInput);
		sr.setMysqlDiskOutput(mysqlDiskOutput);
		sr.setMysqlNetworkInput(mysqlNetworkInput);
		sr.setMysqlNetworkOutput(mysqlNetworkOutput);
		
		stressService.saveStressResult(sr);
		ret.put("retCode", "1000");
		ret.put("retMSG", "操作成功");
		return "success";
	}

	public String updateStressResult(){
		StressResult sr = stressService.findStressResultById(stressresultid);
	
		if(sr == null){
			ret.put("retCode", "1001");
			ret.put("retMSG", "压测任务不存在");
			return "success";
		}
		
		sr.setTps(tps);
		sr.setUrl(url);
		sr.setDuration(duration);
		sr.setPassrate(passrate);
		sr.setPrecondition(precondition);
		sr.setResponseTime(responseTime);
		sr.setComment(comment);
		sr.setConcurrence(concurrence);
		
		sr.setServerCpu(serverCpu);
		sr.setServerDiskInput(serverDiskInput);
		sr.setServerDiskOutput(serverDiskOutput);
		sr.setServerMemory(serverMemory);
		sr.setServerNetworkInput(serverNetworkInput);
		sr.setServerNetworkOutput(serverNetworkOutput);
		sr.setMongoCpu(mongoCpu);
		sr.setMongoDiskInput(mongoDiskInput);
		sr.setMongoDiskInput(mongoDiskInput);
		sr.setMongoDiskOutput(mongoDiskOutput);
		sr.setMongoNetworkInput(mongoNetworkInput);
		sr.setMongoNetworkOutput(mongoNetworkOutput);
		sr.setMssqlCpu(mssqlCpu);
		sr.setMssqlDiskInput(mssqlDiskInput);
		sr.setMssqlDiskOutput(mssqlDiskOutput);
		sr.setMssqlNetworkInput(mssqlNetworkInput);
		sr.setMssqlNetworkOutput(mssqlNetworkOutput);
		sr.setMysqlCpu(mysqlCpu);
		sr.setMysqlDiskInput(mysqlDiskInput);
		sr.setMysqlDiskOutput(mysqlDiskOutput);
		sr.setMysqlNetworkInput(mysqlNetworkInput);
		sr.setMysqlNetworkOutput(mysqlNetworkOutput);
		
		stressService.updateStressResult(sr);
		
		ret.put("retCode", "1000");
		ret.put("retMSG", "操作成功");
		return "success";
	}
	
	public String findStressResultById(){
		
		StressResult sr = stressService.findStressResultById(stressresultid);
		
		ret.put("stressResult", sr);
		ret.put("retCode", "1000");
		ret.put("retMSG", "操作成功");
		return "success";
	}
	
	public String findStressResultsByStressTask(){
		
		List<StressResult> srs = stressService.findStressResultsByStressTask(stresstaskid);
		
		JSONArray ja = JSONArray.fromObject(srs);
		ret.put("StressResults", ja);
		ret.put("retCode", "1000");
		ret.put("retMSG", "操作成功");
		return "success";
		
	}
	
	public Integer getStresstaskid() {
		return stresstaskid;
	}


	public void setStresstaskid(Integer stresstaskid) {
		this.stresstaskid = stresstaskid;
	}


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}


	public Integer getCreatorid() {
		return creatorid;
	}


	public void setCreatorid(Integer creatorid) {
		this.creatorid = creatorid;
	}


	public String getDev() {
		return dev;
	}


	public void setDev(String dev) {
		this.dev = dev;
	}


	public String getBackground() {
		return background;
	}


	public void setBackground(String background) {
		this.background = background;
	}


	public String getConclusion() {
		return conclusion;
	}


	public void setConclusion(String conclusion) {
		this.conclusion = conclusion;
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


	public Integer getEnvid() {
		return envid;
	}


	public void setEnvid(Integer envid) {
		this.envid = envid;
	}


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	public Integer getStressresultid() {
		return stressresultid;
	}


	public void setStressresultid(Integer stressresultid) {
		this.stressresultid = stressresultid;
	}


	public String getUrl() {
		return url;
	}


	public void setUrl(String url) {
		this.url = url;
	}





	public String getTps() {
		return tps;
	}


	public void setTps(String tps) {
		this.tps = tps;
	}


	public String getResponseTime() {
		return responseTime;
	}


	public void setResponseTime(String responseTime) {
		this.responseTime = responseTime;
	}


	public String getConcurrence() {
		return concurrence;
	}


	public void setConcurrence(String concurrence) {
		this.concurrence = concurrence;
	}


	public String getDuration() {
		return duration;
	}


	public void setDuration(String duration) {
		this.duration = duration;
	}


	public String getPassrate() {
		return passrate;
	}


	public void setPassrate(String passrate) {
		this.passrate = passrate;
	}


	public String getPrecondition() {
		return precondition;
	}


	public void setPrecondition(String precondition) {
		this.precondition = precondition;
	}


	public String getComment() {
		return comment;
	}


	public void setComment(String comment) {
		this.comment = comment;
	}


	public String getServerCpu() {
		return serverCpu;
	}


	public void setServerCpu(String serverCpu) {
		this.serverCpu = serverCpu;
	}


	public String getServerMemory() {
		return serverMemory;
	}


	public void setServerMemory(String serverMemory) {
		this.serverMemory = serverMemory;
	}


	public String getServerDiskInput() {
		return serverDiskInput;
	}


	public void setServerDiskInput(String serverDiskInput) {
		this.serverDiskInput = serverDiskInput;
	}


	public String getServerDiskOutput() {
		return serverDiskOutput;
	}


	public void setServerDiskOutput(String serverDiskOutput) {
		this.serverDiskOutput = serverDiskOutput;
	}


	public String getServerNetworkInput() {
		return serverNetworkInput;
	}


	public void setServerNetworkInput(String serverNetworkInput) {
		this.serverNetworkInput = serverNetworkInput;
	}


	public String getServerNetworkOutput() {
		return serverNetworkOutput;
	}


	public void setServerNetworkOutput(String serverNetworkOutput) {
		this.serverNetworkOutput = serverNetworkOutput;
	}


	public String getMssqlCpu() {
		return mssqlCpu;
	}


	public void setMssqlCpu(String mssqlCpu) {
		this.mssqlCpu = mssqlCpu;
	}


	public String getMssqlDiskInput() {
		return mssqlDiskInput;
	}


	public void setMssqlDiskInput(String mssqlDiskInput) {
		this.mssqlDiskInput = mssqlDiskInput;
	}


	public String getMssqlDiskOutput() {
		return mssqlDiskOutput;
	}


	public void setMssqlDiskOutput(String mssqlDiskOutput) {
		this.mssqlDiskOutput = mssqlDiskOutput;
	}


	public String getMssqlNetworkInput() {
		return mssqlNetworkInput;
	}


	public void setMssqlNetworkInput(String mssqlNetworkInput) {
		this.mssqlNetworkInput = mssqlNetworkInput;
	}


	public String getMssqlNetworkOutput() {
		return mssqlNetworkOutput;
	}


	public void setMssqlNetworkOutput(String mssqlNetworkOutput) {
		this.mssqlNetworkOutput = mssqlNetworkOutput;
	}


	public String getMysqlCpu() {
		return mysqlCpu;
	}


	public void setMysqlCpu(String mysqlCpu) {
		this.mysqlCpu = mysqlCpu;
	}


	public String getMysqlDiskInput() {
		return mysqlDiskInput;
	}


	public void setMysqlDiskInput(String mysqlDiskInput) {
		this.mysqlDiskInput = mysqlDiskInput;
	}


	public String getMysqlDiskOutput() {
		return mysqlDiskOutput;
	}


	public void setMysqlDiskOutput(String mysqlDiskOutput) {
		this.mysqlDiskOutput = mysqlDiskOutput;
	}


	public String getMysqlNetworkInput() {
		return mysqlNetworkInput;
	}


	public void setMysqlNetworkInput(String mysqlNetworkInput) {
		this.mysqlNetworkInput = mysqlNetworkInput;
	}


	public String getMysqlNetworkOutput() {
		return mysqlNetworkOutput;
	}


	public void setMysqlNetworkOutput(String mysqlNetworkOutput) {
		this.mysqlNetworkOutput = mysqlNetworkOutput;
	}


	public String getMongoCpu() {
		return mongoCpu;
	}


	public void setMongoCpu(String mongoCpu) {
		this.mongoCpu = mongoCpu;
	}


	public String getMongoDiskInput() {
		return mongoDiskInput;
	}


	public void setMongoDiskInput(String mongoDiskInput) {
		this.mongoDiskInput = mongoDiskInput;
	}


	public String getMongoDiskOutput() {
		return mongoDiskOutput;
	}


	public void setMongoDiskOutput(String mongoDiskOutput) {
		this.mongoDiskOutput = mongoDiskOutput;
	}


	public String getMongoNetworkInput() {
		return mongoNetworkInput;
	}


	public void setMongoNetworkInput(String mongoNetworkInput) {
		this.mongoNetworkInput = mongoNetworkInput;
	}


	public String getMongoNetworkOutput() {
		return mongoNetworkOutput;
	}


	public void setMongoNetworkOutput(String mongoNetworkOutput) {
		this.mongoNetworkOutput = mongoNetworkOutput;
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
