package com.ymt.testplatform.action;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;

import com.ymt.testplatform.entity.CpuInfo;
import com.ymt.testplatform.entity.MonitorRelation;
import com.ymt.testplatform.entity.MonitorShowItem;
import com.ymt.testplatform.entity.MonitorTask;
import com.ymt.testplatform.entity.MonitorConfig;
import com.ymt.testplatform.entity.MonitorInfo;
import com.ymt.testplatform.entity.MonitorItem;
import com.ymt.testplatform.entity.StressTask;
import com.ymt.testplatform.entity.User;
import com.ymt.testplatform.entity.VmInfo;
import com.ymt.testplatform.service.environment.EnvironmentService;
import com.ymt.testplatform.service.monitor.MonitorService;
import com.ymt.testplatform.service.stress.StressService;
import com.ymt.testplatform.service.user.UserService;

@Controller
public class MonitorAction {
	private static final long serialVersionUID = 1L;

	@Resource
	private StressService stressService;
	@Resource
	private MonitorService monitorService;
	@Resource
	private UserService userService;
	@Resource
	private EnvironmentService environmentService;

	private Integer creatorid;

	// MonitorTask
	private String desc;

	// MonitorRelation
	private Integer relationId;
	private Integer stressTaskId;
	private Integer minotorItemId;

	// MonitorConfig
	private Integer configId;
	private Integer taskId;
	// private VmInfo vm;
	private Integer vmId;
	private String vmIp;
	private boolean isActive;
	private String configComment;
	private Date addTime;

	// MonitorItem
	private Integer itemId;
	// private MonitorConfig config;
	private Date startTime;
	private Date endTime;
	private Integer last;
	private String itemcomment;
	private Integer currentItemId;

	// MonitorInfo
	private int infoId;
	private int cpuData;
	private int cpu1Data;
	private int cpu2Data;
	private int cpu3Data;
	private int coreNumber;
	// 可用内存
	private int memoryData;
	private int memoryTotalData;
	private int diskReadData;
	private int diskWriteData;
	private int networkReceiveData;
	private int networkSendData;
	private Date addInfoTime;

	private JSONObject ret = new JSONObject();

	public String Test() {
		ret.put("retCode", "1000");
		ret.put("retMSG", "连接正常");
		return "success";
	}

	private Integer pagesize;
	private Integer pageindex;

	// MinotorTask
	public String listMonitorTasks() {
		List<MonitorTask> sts = new ArrayList<MonitorTask>();

		HashMap<String, Object> conditions = new HashMap<String, Object>();

		if (this.creatorid != null && !this.creatorid.equals("")) {
			conditions.put("creatorid", this.creatorid);
		}

		sts = monitorService.findAllMonitorTasks(this.pageindex, this.pagesize,
				conditions);

		Long pageNum = monitorService.findMonitorTaskPages(this.pagesize,
				conditions);

		JSONArray ja = JSONArray.fromObject(sts);
		ret.put("MonitorTasks", ja);
		ret.put("pagenum", pageNum);
		ret.put("retCode", "1000");
		ret.put("retMSG", "操作成功");
		return "success";
	}

	public String createMonitorTask() {

		User user = userService.findUserById(creatorid);
		if (user == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "创建人不存在");
			return "success";
		}

		// if(!Utils.authorized(user.getAuthorization(), 2)){
		// ret.put("retCode", "1001");
		// ret.put("retMSG", "你没有该操作权限");
		// return "success";
		// }

		MonitorTask mt = new MonitorTask();
		mt.setCreator(user);
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		mt.setTime(df.format(new Date()));
		mt.setDel(0);
		mt.setDesc(desc);

		monitorService.saveMonitorTask(mt);
		ret.put("retCode", "1000");
		ret.put("retMSG", "创建压测任务成功");
		return "success";
	}

	public String findMonitorTaskById() {
		MonitorTask st = monitorService.findMonitorTaskById(taskId);

		if (st == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该监控任务不存在");
			return "success";
		}

		ret.put("monitortask", st);
		ret.put("retCode", "1000");
		ret.put("retMSG", "查询监控任务成功");
		return "success";
	}

	public String updateMonitorTask() {
		MonitorTask mt = monitorService.findMonitorTaskById(taskId);

		if (mt == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该监控任务不存在");
			return "success";
		}

		mt.setDesc(desc);
		monitorService.updateMonitorTask(mt);

		ret.put("retCode", "1000");
		ret.put("retMSG", "更新监控任务成功");
		return "success";
	}

	// MonitorRelation	
	public String findMonitorRelationByStressItemId() {
		List<MonitorRelation> mrs = monitorService.findMonitorRelationByStressItemId(currentItemId);

		if(mrs.size()>0)
		{
		ret.put("relation", mrs.get(0));
		ret.put("retCode", "1000");
		ret.put("retMSG", "查询监控项目成功");
		}
		else {
			ret.put("retCode", "0");
			ret.put("retMSG", "未查询到监控项目");
		}
		return "success";
	}
	
	public String findMonitorRelatedItemByStressTaskId() {
		List<MonitorRelation> mr = monitorService.findMonitorRelatedItemByStressTaskId(stressTaskId);

		JSONArray ja = JSONArray.fromObject(mr);
		ret.put("items", ja);
		ret.put("retCode", "1000");
		ret.put("retMSG", "查询监控项目成功");
		return "success";
	}
	
	public String updateMonitorRelation() {

		MonitorItem mi = monitorService.findMonitorItemById(itemId);
		if (mi == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "监控项目不存在");
			return "success";
		}
		
		User user = userService.findUserById(creatorid);
		if (user == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "创建人不存在");
			return "success";
		}
		
		List<MonitorRelation> relations = monitorService.findMonitorRelationByStressItemId(itemId);

		if(stressTaskId == null||stressTaskId==0)
		{
				//删除关联
				if(relations.size()!=0)
				{
					MonitorRelation relation = relations.get(0);
					relation.setDel(1);
					monitorService.updateMonitorRelation(relation);
				}	
		}
		else {
			StressTask st = stressService.findStressTaskById(stressTaskId);
			
			if(relations.size()==0)
			{
				//新增relation
				MonitorRelation relation = new MonitorRelation();
		
				relation.setStressTask(st);
				relation.setMonitorItem(mi);
				relation.setCreator(user);
				relation.setCreateTime(new java.util.Date());
		
				monitorService.saveMonitorRelation(relation);
			}
			else {
				//更改relation
				MonitorRelation relation =relations.get(0);
				relation.setStressTask(st);
				relation.setMonitorItem(mi);
				relation.setCreateTime(new java.util.Date());

				monitorService.updateMonitorRelation(relation);
			}	
		}
		
		// 更改comment
		if(desc!=mi.getComment())
		{
			mi.setComment(desc);
			monitorService.updateMonitorItem(mi);
		}

		ret.put("retCode", "1000");
		ret.put("retMSG", "创建监控关联成功");
		return "success";
	}

	// MonitorConfig
	public String createMonitorConfig() {

		StressTask st = stressService.findStressTaskById(taskId);
		if (st == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "任务不存在");
			return "success";
		}

		vmIp = vmIp.trim();
		VmInfo vm = environmentService.findVmInfoByIp(vmIp);
		if (vm == null) {
			ret.put("retCode", "1002");
			ret.put("retMSG", "机器不存在");
			return "success";
		}

		MonitorConfig config = new MonitorConfig();

		config.setTask(st);
		config.setVm(vm);
		config.setIsActive(isActive);
		config.setComment(configComment);
		config.setAddTime(new java.util.Date());

		monitorService.saveMonitorConfig(config);

		ret.put("retCode", "1000");
		ret.put("retMSG", "创建监控配置任务成功");
		return "success";
	}

	public String findMonitorConfigById() {
		MonitorConfig config = monitorService.findMonitorConfigById(configId);

		if (config == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该压测配置项不存在");
			return "success";
		}

		ret.put("MonitorConfig", config);
		ret.put("retCode", "1000");
		ret.put("retMSG", "查询配置项成功");
		return "success";
	}
	
	public String findValidMonitorConfigById() {
		MonitorConfig config = monitorService.findValidMonitorConfigById(configId);

		if (config == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该压测配置项不存在");
			return "success";
		}

		ret.put("MonitorConfig", config);
		ret.put("retCode", "1000");
		ret.put("retMSG", "查询配置项成功");
		return "success";
	}
	
	public String findMonitorConfigListByTaskId() {
		List<MonitorConfig> configs = monitorService
				.findMonitorConfigsByTaskId(taskId);

		if (configs == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该压测配置项不存在");
			return "success";
		}

		ret.put("MonitorConfigs", configs);
		ret.put("retCode", "1000");
		ret.put("retMSG", "查询配置项成功");
		return "success";
	}

	public String updateMonitorConfig() {

		MonitorConfig config = monitorService.findMonitorConfigById(configId);

		if (config == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该压测配置项不存在");
			return "success";
		}

		StressTask st = stressService.findStressTaskById(taskId);
		if (st == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "任务不存在");
			return "success";
		}

		vmIp = vmIp.trim();
		VmInfo vm = environmentService.findVmInfoByIp(vmIp);
		if (vm == null) {
			ret.put("retCode", "1002");
			ret.put("retMSG", "机器不存在");
			return "success";
		}

		config.setTask(st);
		config.setVm(vm);
		config.setIsActive(isActive);
		config.setComment(configComment);
		config.setAddTime(new java.util.Date());

		monitorService.updateMonitorConfig(config);

		ret.put("retCode", "1000");
		ret.put("retMSG", "更新配置项成功");
		return "success";
	}

	public String deleteMonitorConfig() {
		MonitorConfig config = monitorService.findMonitorConfigById(configId);

		if (config == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该压测配置项不存在");
			return "success";
		}

		config.setDel(-1);
		monitorService.updateMonitorConfig(config);

		ret.put("retCode", "1000");
		ret.put("retMSG", "删除配置项成功");
		return "success";
	}

	// MonitorItem
	public String findMonitorItemByTaskId() {
		List<MonitorShowItem> items = monitorService
				.findMonitorItemsByTaskId(taskId);

		if (items == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该压测配置项不存在");
			return "success";
		}

		//JSONArray ja = JSONArray.fromObject(items);
		
		ret.put("items", items);
		ret.put("retCode", "1000");
		ret.put("retMSG", "查询配置项成功");
		return "success";
	}

	public String startMonitor() {
		MonitorTask st = monitorService.findMonitorTaskById(taskId);
		if (st == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "任务不存在");
			return "success";
		}

		MonitorItem item = new MonitorItem();

		Date startDate = new Date();
		Calendar now = Calendar.getInstance();
		now.add(Calendar.MINUTE, last);

		item.setTask(st);
		item.setStartTime(new Date());
		item.setEndTime(now.getTime());
		item.setComment(itemcomment);

		int itemId = (Integer) monitorService.saveMonitorItem(item);

		ret.put("itemId", itemId);
		ret.put("retCode", "1000");
		ret.put("retMSG", "创建监控项成功");
		return "success";
	}

	public String stopMonitor() {
		MonitorItem item = monitorService.findMonitorItemById(currentItemId);
		item.setEndTime(new Date());
		item.setComment(itemcomment);

		monitorService.saveMonitorItem(item);

		ret.put("retCode", "1000");
		ret.put("retMSG", "关闭监控项成功");
		return "success";
	}

	public String getCurrentMonitorItem() {
		StressTask st = stressService.findStressTaskById(taskId);
		if (st == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "任务不存在");
			return "success";
		}

		List<MonitorItem> items = monitorService
				.findMonitoredItemsByTaskId(taskId);
		if (items == null || items.size() == 0) {
			ret.put("id", 0);
			ret.put("retCode", "1000");
			ret.put("retMSG", "没有正在监控的项");
			return "success";
		}
		if (items.size() > 1) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "存在多个正在监控项");
			return "success";
		}

		MonitorItem item = items.get(0);

		ret.put("id", item.getId());
		ret.put("retCode", "1000");
		ret.put("retMSG", "获取正在监控项成功");
		return "success";
	}

	// MonitorInfo
	public String createStressMonitorInfo() {

		MonitorConfig config = monitorService.findMonitorConfigById(configId);
		if (config == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "配置不存在");
			return "success";
		}

		MonitorItem item = monitorService.findMonitorItemById(itemId);
		if (item == null) {
			ret.put("retCode", "1002");
			ret.put("retMSG", "监控项不存在");
			return "success";
		}

		MonitorInfo info = new MonitorInfo();

		info.setConfig(config);
		info.setItem(item);
		info.setCpu(cpuData);

		info.setCpu1(cpu1Data);
		info.setCpu2(cpu2Data);
		info.setCpu3(cpu3Data);
	
		info.setMemory(memoryTotalData - memoryData);
		info.setDiskRead(diskReadData);
		info.setDiskWrite(diskWriteData);
		info.setNetworkReceive(networkReceiveData);
		info.setNetworkSend(networkSendData);
		info.setTime(addInfoTime);

		monitorService.saveMonitorInfo(info);

		ret.put("retCode", "1000");
		ret.put("retMSG", "加入监控信息成功");
		return "success";
	}
	
	public String getMonitorInfoByItemId() {

		MonitorItem item = monitorService.findMonitorItemById(itemId);
		MonitorTask task = item.getTask();
		List<MonitorConfig> configs = monitorService.findMonitorConfigsByTaskId(task.getId());
		
		if (item == null) {
			ret.put("retCode", "1002");
			ret.put("retMSG", "监控项不存在");
			return "success";
		}

		int num = configs.size();
		String configStrs[] = new String[num];
		String times[][] = new String[num][];

		CpuInfo cpus[][] = new CpuInfo[num][];
		CpuInfo cpus1[][] = new CpuInfo[num][];
		CpuInfo cpus2[][] = new CpuInfo[num][];
		CpuInfo cpus3[][] = new CpuInfo[num][];
		int memorys[][] = new int[num][];
		int dReads[][] = new int[num][];
		int dWrites[][] = new int[num][];
		int nReceives[][] = new int[num][];
		int nSends[][] = new int[num][];

		for (int i = 0; i < num; i++) {
			MonitorConfig MonitorConfig = configs.get(i);
			configStrs[i] = MonitorConfig.getComment() + "-"
					+ MonitorConfig.getVm().getIp();

			List<MonitorInfo> infos = monitorService
					.findMonitorInfosByConfigIdAndItemId(MonitorConfig.getId(),
							itemId);

			int n = infos.size();

			String time[] = new String[n];
			CpuInfo cpu[] = new CpuInfo[n];
			CpuInfo cpu1[] = new CpuInfo[n];
			CpuInfo cpu2[] = new CpuInfo[n];
			CpuInfo cpu3[] = new CpuInfo[n];
			int memory[] = new int[n];
			int dRead[] = new int[n];
			int dWrite[] = new int[n];
			int nReceive[] = new int[n];
			int nSend[] = new int[n];

			for (int j = 0; j < n; j++) {
				MonitorInfo info = infos.get(j);
				// 给定模式
				SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
				String t = sdf.format(info.getTime());

				time[j] = t;
				
				CpuInfo cpuInfo=new CpuInfo();
				cpuInfo.setTime(t);
				cpuInfo.setData1(0);
				cpuInfo.setData2(info.getCpu());
				cpu[j]=cpuInfo;
				
				CpuInfo cpuInfo1=new CpuInfo();
				cpuInfo1.setTime(t);
				cpuInfo1.setData1(info.getCpu());
				cpuInfo1.setData2(info.getCpu()+info.getCpu1());
				cpu1[j]=cpuInfo1;
				
				CpuInfo cpuInfo2=new CpuInfo();
				cpuInfo2.setTime(t);
				cpuInfo2.setData1(info.getCpu());
				cpuInfo2.setData2(info.getCpu()+info.getCpu1()+info.getCpu2());
				cpu2[j]=cpuInfo2;
				
				CpuInfo cpuInfo3=new CpuInfo();
				cpuInfo3.setTime(t);
				cpuInfo3.setData1(info.getCpu()+info.getCpu1()+info.getCpu2());
				cpuInfo3.setData2(info.getCpu()+info.getCpu1()+info.getCpu2()+info.getCpu3());
				cpu3[j]=cpuInfo3;				
				
				memory[j] = info.getMemory();
				dRead[j] = -info.getDiskRead();
				dWrite[j] = info.getDiskWrite();
				nReceive[j] = -info.getNetworkReceive();
				nSend[j] = info.getNetworkSend();
			}

			times[i] = time;
			cpus[i] = cpu;
			cpus1[i] = cpu1;
			cpus2[i] = cpu2;
			cpus3[i] = cpu3;
			memorys[i] = memory;
			dReads[i] = dRead;
			dWrites[i] = dWrite;
			nReceives[i] = nReceive;
			nSends[i] = nSend;
		}

		ret.put("configStrs", configStrs);
		ret.put("times", times);
		ret.put("cpus", cpus);
		ret.put("cpus1", cpus1);
		ret.put("cpus2", cpus2);
		ret.put("cpus3", cpus3);
		ret.put("memorys", memorys);
		ret.put("dReads", dReads);
		ret.put("dWrites", dWrites);
		ret.put("nReceives", nReceives);
		ret.put("nSends", nSends);

		ret.put("retCode", "1000");
		ret.put("retMSG", "加入监控信息成功");
		return "success";
	}

	// Get(),Set()
	public MonitorService getMonitorService() {
		return monitorService;
	}

	public void setMonitorService(MonitorService monitorService) {
		this.monitorService = monitorService;
	}

	public StressService getStressService() {
		return stressService;
	}

	public void setStressService(StressService stressService) {
		this.stressService = stressService;
	}

	public EnvironmentService getEnvironmentService() {
		return environmentService;
	}

	public void setEnvironmentService(EnvironmentService environmentService) {
		this.environmentService = environmentService;
	}

	public UserService getUserService() {
		return userService;
	}

	public void setUserService(UserService userService) {
		this.userService = userService;
	}

	public Integer getStressTaskId() {
		return stressTaskId;
	}

	public void setStressTaskId(Integer stressTaskId) {
		this.stressTaskId = stressTaskId;
	}
	
	public Integer getRelationId() {
		return relationId;
	}

	public void setRelationId(Integer relationId) {
		this.relationId = relationId;
	}

	public Integer getMinotorItemId() {
		return minotorItemId;
	}

	public void setMinotorItemId(Integer minotorItemId) {
		this.minotorItemId = minotorItemId;
	}

	public Integer getCreatorid() {
		return creatorid;
	}

	public void setCreatorid(Integer creatorid) {
		this.creatorid = creatorid;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
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

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}

	public Integer getConfigId() {
		return configId;
	}

	public void setConfigId(Integer configId) {
		this.configId = configId;
	}

	public Integer getTaskId() {
		return taskId;
	}

	public void setTaskId(Integer taskId) {
		this.taskId = taskId;
	}

	public Integer getVmId() {
		return vmId;
	}

	public void setVmId(Integer vmId) {
		this.vmId = vmId;
	}

	public boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(boolean isActive) {
		this.isActive = isActive;
	}

	public String getConfigComment() {
		return configComment;
	}

	public void setConfigComment(String configComment) {
		this.configComment = configComment;
	}

	public Date getAddTime() {
		return addTime;
	}

	public void setAddTime(Date addTime) {
		this.addTime = addTime;
	}

	public Integer getItemId() {
		return itemId;
	}

	public void setItemId(Integer itemId) {
		this.itemId = itemId;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public String getItemComment() {
		return itemcomment;
	}

	public void setItemComment(String itemcomment) {
		this.itemcomment = itemcomment;
	}

	public int getCpuData() {
		return cpuData;
	}

	public void setCpuData(int cpuData) {
		this.cpuData = cpuData;
	}

	public int getMemoryData() {
		return memoryData;
	}

	public void setMemoryData(int memoryData) {
		this.memoryData = memoryData;
	}

	public int getDiskReadData() {
		return diskReadData;
	}

	public void setDiskReadData(int diskReadData) {
		this.diskReadData = diskReadData;
	}

	public int getDiskWriteData() {
		return diskWriteData;
	}

	public void setDiskWriteData(int diskWriteData) {
		this.diskWriteData = diskWriteData;
	}

	public int getNetworkReceiveData() {
		return networkReceiveData;
	}

	public void setNetworkReceiveData(int networkReceiveData) {
		this.networkReceiveData = networkReceiveData;
	}

	public int getNetworkSendData() {
		return networkSendData;
	}

	public void setNetworkSendData(int networkSendData) {
		this.networkSendData = networkSendData;
	}

	public JSONObject getRet() {
		return ret;
	}

	public void setRet(JSONObject ret) {
		this.ret = ret;
	}

	public String getVmIp() {
		return vmIp;
	}

	public void setVmIp(String vmIp) {
		this.vmIp = vmIp;
	}

	public Integer getLast() {
		return last;
	}

	public void setLast(Integer last) {
		this.last = last;
	}

	public String getItemcomment() {
		return itemcomment;
	}

	public void setItemcomment(String itemcomment) {
		this.itemcomment = itemcomment;
	}

	public Integer getCurrentItemId() {
		return currentItemId;
	}

	public void setCurrentItemId(Integer currentItemId) {
		this.currentItemId = currentItemId;
	}

	public int getInfoId() {
		return infoId;
	}

	public void setInfoId(int infoId) {
		this.infoId = infoId;
	}

	public int getCoreNumber() {
		return coreNumber;
	}

	public void setCoreNumber(int coreNumber) {
		this.coreNumber = coreNumber;
	}

	public int getMemoryTotalData() {
		return memoryTotalData;
	}

	public void setMemoryTotalData(int memoryTotalData) {
		this.memoryTotalData = memoryTotalData;
	}

	public Date getAddInfoTime() {
		return addInfoTime;
	}

	public void setAddInfoTime(Date addInfoTime) {
		this.addInfoTime = addInfoTime;
	}

	public int getCpu1Data() {
		return cpu1Data;
	}

	public void setCpu1Data(int cpu1Data) {
		this.cpu1Data = cpu1Data;
	}

	public int getCpu2Data() {
		return cpu2Data;
	}

	public void setCpu2Data(int cpu2Data) {
		this.cpu2Data = cpu2Data;
	}

	public int getCpu3Data() {
		return cpu3Data;
	}

	public void setCpu3Data(int cpu3Data) {
		this.cpu3Data = cpu3Data;
	}

}
