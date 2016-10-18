package com.ymt.testplatform.action;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionSupport;
import com.ymt.testplatform.entity.StressMonitorConfig;
import com.ymt.testplatform.entity.StressMonitorInfo;
import com.ymt.testplatform.entity.StressMonitorItem;
import com.ymt.testplatform.entity.StressTask;
import com.ymt.testplatform.entity.VmInfo;
import com.ymt.testplatform.service.environment.EnvironmentService;
import com.ymt.testplatform.service.stress.StressService;
import com.ymt.testplatform.service.stressmonitor.StressMonitorService;

@Controller
public class StressMonitorAction extends ActionSupport {
	private static final long serialVersionUID = 1L;

	@Resource
	private StressMonitorService stressMonitorService;

	@Resource
	private StressService stressService;

	@Resource
	private EnvironmentService environmentService;

	// StressMonitorConfig
	private Integer configId;
	private Integer taskId;
	// private VmInfo vm;
	private Integer vmId;
	private String vmIp;
	private boolean isActive;
	private String configComment;
	private Date addTime;

	// StressMonitorItem
	private Integer itemId;
	// private StressMonitorConfig config;
	private Date startTime;
	private Date endTime;
	private Integer last;
	private String itemcomment;
	private Integer currentItemId;

	// StressMonitorInfo
	private int infoId;
	private int cpuData;
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
	
	// StressMonitorConfig
	public String createStressMonitorConfig() {

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

		StressMonitorConfig config = new StressMonitorConfig();

		config.setTask(st);
		config.setVm(vm);
		config.setIsActive(isActive);
		config.setComment(configComment);
		config.setAddTime(new java.util.Date());

		stressMonitorService.saveStressMonitorConfig(config);

		ret.put("retCode", "1000");
		ret.put("retMSG", "创建监控配置任务成功");
		return "success";
	}

	public String findStressMonitorConfigById() {
		StressMonitorConfig config = stressMonitorService
				.findStressMonitorConfigById(configId);

		if (config == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该压测配置项不存在");
			return "success";
		}

		ret.put("StressMonitorConfig", config);
		ret.put("retCode", "1000");
		ret.put("retMSG", "查询配置项成功");
		return "success";
	}

	public String findStressMonitorConfigListByTaskId() {
		List<StressMonitorConfig> configs = stressMonitorService
				.findStressMonitorConfigsByTaskId(taskId);

		if (configs == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该压测配置项不存在");
			return "success";
		}

		ret.put("StressMonitorConfigs", configs);
		ret.put("retCode", "1000");
		ret.put("retMSG", "查询配置项成功");
		return "success";
	}

	public String updateStressMonitorConfig() {

		StressMonitorConfig config = stressMonitorService
				.findStressMonitorConfigById(configId);

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

		stressMonitorService.updateStressMonitorConfig(config);

		ret.put("retCode", "1000");
		ret.put("retMSG", "更新配置项成功");
		return "success";
	}

	public String deleteStressMonitorConfig() {
		StressMonitorConfig config = stressMonitorService
				.findStressMonitorConfigById(configId);

		if (config == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该压测配置项不存在");
			return "success";
		}

		stressMonitorService.deleteStressMonitorConfig(config);

		ret.put("retCode", "1000");
		ret.put("retMSG", "删除配置项成功");
		return "success";
	}

	
	// StressMonitorItem
	public String findStressMonitorItemByTaskId()
	{
		List<StressMonitorItem> items = stressMonitorService
				.findStressMonitorItemsByTaskId(taskId);

		if (items == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该压测配置项不存在");
			return "success";
		}

		ret.put("items", items);
		ret.put("retCode", "1000");
		ret.put("retMSG", "查询配置项成功");
		return "success";
	}
	
	public String startMonitor()
	{
		StressTask st = stressService.findStressTaskById(taskId);
		if (st == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "任务不存在");
			return "success";
		}

		StressMonitorItem item = new StressMonitorItem();
		
		Date startDate = new Date();
		Calendar now = Calendar.getInstance(); 
		now.add(Calendar.MINUTE, last);
		
		item.setStressTask(st);		
		item.setStartTime(new Date());
		item.setEndTime(now.getTime());
		item.setComment(itemcomment);

		int itemId = (Integer) stressMonitorService.saveStressMonitorItem(item);

		ret.put("itemId", itemId);
		ret.put("retCode", "1000");
		ret.put("retMSG", "创建监控项成功");
		return "success";
	}
	
	public String stopMonitor()
	{
		StressMonitorItem item = stressMonitorService.findStressMonitorItemById(currentItemId);
		item.setEndTime(new Date());
		item.setComment(itemcomment);

		stressMonitorService.saveStressMonitorItem(item);

		ret.put("retCode", "1000");
		ret.put("retMSG", "关闭监控项成功");
		return "success";
	}
	
	public String getCurrentMonitorItem()
	{
		StressTask st = stressService.findStressTaskById(taskId);
		if (st == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "任务不存在");
			return "success";
		}

		List<StressMonitorItem> items = stressMonitorService.findStressMonitoredItemsByTaskId(taskId);
		if (items == null || items.size()==0) {
			ret.put("id", 0);
			ret.put("retCode", "1000");
			ret.put("retMSG", "没有正在监控的项");
			return "success";
		}
		if (items.size()>1) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "存在多个正在监控项");
			return "success";
		}
		
		StressMonitorItem item = items.get(0);

		ret.put("id", item.getId());
		ret.put("retCode", "1000");
		ret.put("retMSG", "获取正在监控项成功");
		return "success";
	}
	
	// StressMonitorInfo
	public String createStressMonitorInfo() {

		StressMonitorConfig config = stressMonitorService.findStressMonitorConfigById(configId);
		if (config == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "配置不存在");
			return "success";
		}

		StressMonitorItem item = stressMonitorService.findStressMonitorItemById(itemId);
				if (item == null) {
					ret.put("retCode", "1002");
					ret.put("retMSG", "监控项不存在");
					return "success";
				}

		StressMonitorInfo info = new StressMonitorInfo();
		
		info.setConfig(config);
		info.setItem(item);
		info.setCpu(cpuData);
		info.setMemory(memoryTotalData-memoryData);
		info.setDiskRead(diskReadData);
		info.setDiskWrite(diskWriteData);
		info.setNetworkReceive(networkReceiveData);
		info.setNetworkSend(networkSendData);
		info.setTime(addInfoTime);

		stressMonitorService.saveStressMonitorInfo(info);

		ret.put("retCode", "1000");
		ret.put("retMSG", "加入监控信息成功");
		return "success";
	} 
	
	public String getStressMonitorInfo() {

		List<StressMonitorConfig> configs = stressMonitorService.findStressMonitorConfigsByTaskId(taskId);
		if (configs == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "配置不存在");
			return "success";
		}
		
		StressMonitorItem item = stressMonitorService.findStressMonitorItemById(itemId);
		if (item == null) {
			ret.put("retCode", "1002");
			ret.put("retMSG", "监控项不存在");
			return "success";
		}
		
		int num = configs.size();
		String configStrs[] = new String[num];
		String times[][] = new String[num][];
		int cpus[][] = new int[num][];
		int memorys[][] = new int[num][];
		int dReads[][] = new int[num][];
		int dWrites[][] = new int[num][];
		int nReceives[][] = new int[num][];
		int nSends[][] = new int[num][];
		
		for(int i=0;i<num;i++)
		 {
			StressMonitorConfig stressMonitorConfig = configs.get(i);
			configStrs[i]=stressMonitorConfig.getComment()+"-"+stressMonitorConfig.getVm().getIp();
			
			List<StressMonitorInfo> infos = stressMonitorService.findStressMonitorInfosByConfigIdAndItemId(stressMonitorConfig.getId(), itemId);

			int n = infos.size();
			
			String time[] = new String[n];
    		int cpu[] = new int[n];
    		int memory[] = new int[n];
    		int dRead[] = new int[n];
    		int dWrite[] = new int[n];
    		int nReceive[] = new int[n];
    		int nSend[] = new int[n];
    		
	        for (int j=0;j<n;j++)
	        {
	        	StressMonitorInfo info = infos.get(j);
	        	// 给定模式
	    		SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
	            String t = sdf.format(info.getTime());
	            
	            time[j]=t;
	            cpu[j]=info.getCpu();
	            memory[j]=info.getMemory();
	            dRead[j]=-info.getDiskRead();
	            dWrite[j]=info.getDiskWrite();
	            nReceive[j]=-info.getNetworkReceive();
	            nSend[j]=info.getNetworkSend();
	        }
	        
	        times[i]=time;
	        cpus[i]=cpu;
	        memorys[i]=memory;
	        dReads[i]=dRead;
	        dWrites[i]=dWrite;
	        nReceives[i]=nReceive;
	        nSends[i]=nSend;
		}
		
		ret.put("configStrs", configStrs);
		ret.put("times", times);
		ret.put("cpus", cpus);
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
	public StressMonitorService getStressMonitorService() {
		return stressMonitorService;
	}

	public void setStressMonitorService(
			StressMonitorService stressMonitorService) {
		this.stressMonitorService = stressMonitorService;
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
	
	
}
