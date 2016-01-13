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
	private Integer status;
	
	// stressresult
	// basic info
	private Integer stressresultid;
	private String url;
	private Integer tps;
	private Integer responseTime;
	private Integer concurrence;
	private Integer duration;
	private float passrate;
	private String precondition;
	private String comment;
	
	// server info
	private Integer serverCpu;
	private Integer serverMemory;
	private Integer serverDiskInput;
	private Integer serverDiskOutput;
	private Integer serverNetworkInput;
	private Integer serverNetworkOutput;
	
	// MSSQL info
	private Integer mssqlCpu;
	private Integer mssqlDiskInput;
	private Integer mssqlDiskOutput;
	private Integer mssqlNetworkInput;
	private Integer mssqlNetworkOutput;
	
	// MySQL info
	private Integer mysqlCpu;
	private Integer mysqlDiskInput;
	private Integer mysqlDiskOutput;
	private Integer mysqlNetworkInput;
	private Integer mysqlNetworkOutput;
	
	// Mongo info
	private Integer mongoCpu;
	private Integer mongoDiskInput;
	private Integer mongoDiskOutput;
	private Integer mongoNetworkInput;
	private Integer mongoNetworkOutput;
	
	
	
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
		st.setBackground(background);
		st.setCreateTime(new Date());
		st.setCreator(user);
		st.setDev(dev);
		st.setStatus(status);
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
			conditions.put("userid", this.creatorid);
		}
//		if(this.departmentid!=null&&!this.departmentid.equals("")){
//			conditions.put("a.departmentid", this.departmentid);
//		}
		
		sts = stressService.findAllStressTasks(this.pageindex, this.pagesize, conditions);
		
		Long pageNum = stressService.findStressTaskPages(this.pagesize, conditions);
		
		JSONArray ja = JSONArray.fromObject(sts);
		ret.put("StressTasks", ja);
		ret.put("pagenum", pageNum);
		ret.put("retCode", "1000");
		ret.put("retMSG", "操作成功");
		return "success";
	}

	
	public StressService getStressService() {
		return stressService;
	}


	public void setStressService(StressService stressService) {
		this.stressService = stressService;
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


	public Integer getStatus() {
		return status;
	}


	public void setStatus(Integer status) {
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


	public Integer getTps() {
		return tps;
	}


	public void setTps(Integer tps) {
		this.tps = tps;
	}


	public Integer getResponseTime() {
		return responseTime;
	}


	public void setResponseTime(Integer responseTime) {
		this.responseTime = responseTime;
	}


	public Integer getConcurrence() {
		return concurrence;
	}


	public void setConcurrence(Integer concurrence) {
		this.concurrence = concurrence;
	}


	public Integer getDuration() {
		return duration;
	}


	public void setDuration(Integer duration) {
		this.duration = duration;
	}


	public float getPassrate() {
		return passrate;
	}


	public void setPassrate(float passrate) {
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


	public Integer getServerCpu() {
		return serverCpu;
	}


	public void setServerCpu(Integer serverCpu) {
		this.serverCpu = serverCpu;
	}


	public Integer getServerMemory() {
		return serverMemory;
	}


	public void setServerMemory(Integer serverMemory) {
		this.serverMemory = serverMemory;
	}


	public Integer getServerDiskInput() {
		return serverDiskInput;
	}


	public void setServerDiskInput(Integer serverDiskInput) {
		this.serverDiskInput = serverDiskInput;
	}


	public Integer getServerDiskOutput() {
		return serverDiskOutput;
	}


	public void setServerDiskOutput(Integer serverDiskOutput) {
		this.serverDiskOutput = serverDiskOutput;
	}


	public Integer getServerNetworkInput() {
		return serverNetworkInput;
	}


	public void setServerNetworkInput(Integer serverNetworkInput) {
		this.serverNetworkInput = serverNetworkInput;
	}


	public Integer getServerNetworkOutput() {
		return serverNetworkOutput;
	}


	public void setServerNetworkOutput(Integer serverNetworkOutput) {
		this.serverNetworkOutput = serverNetworkOutput;
	}


	public Integer getMssqlCpu() {
		return mssqlCpu;
	}


	public void setMssqlCpu(Integer mssqlCpu) {
		this.mssqlCpu = mssqlCpu;
	}


	public Integer getMssqlDiskInput() {
		return mssqlDiskInput;
	}


	public void setMssqlDiskInput(Integer mssqlDiskInput) {
		this.mssqlDiskInput = mssqlDiskInput;
	}


	public Integer getMssqlDiskOutput() {
		return mssqlDiskOutput;
	}


	public void setMssqlDiskOutput(Integer mssqlDiskOutput) {
		this.mssqlDiskOutput = mssqlDiskOutput;
	}


	public Integer getMssqlNetworkInput() {
		return mssqlNetworkInput;
	}


	public void setMssqlNetworkInput(Integer mssqlNetworkInput) {
		this.mssqlNetworkInput = mssqlNetworkInput;
	}


	public Integer getMssqlNetworkOutput() {
		return mssqlNetworkOutput;
	}


	public void setMssqlNetworkOutput(Integer mssqlNetworkOutput) {
		this.mssqlNetworkOutput = mssqlNetworkOutput;
	}


	public Integer getMysqlCpu() {
		return mysqlCpu;
	}


	public void setMysqlCpu(Integer mysqlCpu) {
		this.mysqlCpu = mysqlCpu;
	}


	public Integer getMysqlDiskInput() {
		return mysqlDiskInput;
	}


	public void setMysqlDiskInput(Integer mysqlDiskInput) {
		this.mysqlDiskInput = mysqlDiskInput;
	}


	public Integer getMysqlDiskOutput() {
		return mysqlDiskOutput;
	}


	public void setMysqlDiskOutput(Integer mysqlDiskOutput) {
		this.mysqlDiskOutput = mysqlDiskOutput;
	}


	public Integer getMysqlNetworkInput() {
		return mysqlNetworkInput;
	}


	public void setMysqlNetworkInput(Integer mysqlNetworkInput) {
		this.mysqlNetworkInput = mysqlNetworkInput;
	}


	public Integer getMysqlNetworkOutput() {
		return mysqlNetworkOutput;
	}


	public void setMysqlNetworkOutput(Integer mysqlNetworkOutput) {
		this.mysqlNetworkOutput = mysqlNetworkOutput;
	}


	public Integer getMongoCpu() {
		return mongoCpu;
	}


	public void setMongoCpu(Integer mongoCpu) {
		this.mongoCpu = mongoCpu;
	}


	public Integer getMongoDiskInput() {
		return mongoDiskInput;
	}


	public void setMongoDiskInput(Integer mongoDiskInput) {
		this.mongoDiskInput = mongoDiskInput;
	}


	public Integer getMongoDiskOutput() {
		return mongoDiskOutput;
	}


	public void setMongoDiskOutput(Integer mongoDiskOutput) {
		this.mongoDiskOutput = mongoDiskOutput;
	}


	public Integer getMongoNetworkInput() {
		return mongoNetworkInput;
	}


	public void setMongoNetworkInput(Integer mongoNetworkInput) {
		this.mongoNetworkInput = mongoNetworkInput;
	}


	public Integer getMongoNetworkOutput() {
		return mongoNetworkOutput;
	}


	public void setMongoNetworkOutput(Integer mongoNetworkOutput) {
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
