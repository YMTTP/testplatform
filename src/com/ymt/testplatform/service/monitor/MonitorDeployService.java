package com.ymt.testplatform.service.monitor;

import java.util.List;
import java.util.Map;

import com.ymt.testplatform.entity.MonitorDeploy;
import com.ymt.testplatform.entity.MonitorDeployInfo;
import com.ymt.testplatform.entity.MonitorTask;
import com.ymt.testplatform.entity.VmInfo;

public interface MonitorDeployService {
	
	public List<MonitorDeployInfo> findAllVmInfos(Integer pageIndex, Integer pageSize, Map<String, Object> map,String envType);
	
	public Long findAllVmInfoPages(Integer pageSize, Map<String, Object> map,String envType);
	
	public List<MonitorDeploy> findMonitorDeployByVmId(Integer vmId);
	
	public List<MonitorDeploy> findMonitorDeployByIp(String ip);
	
	public void updateMonitorDeploy(MonitorDeploy MonitorDeploy);
	
	public void saveMonitorDeploy(MonitorDeploy MonitorDeploy);
	
}
