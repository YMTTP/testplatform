package com.ymt.testplatform.service.stressmonitor;

import java.io.Serializable;
import java.util.List;

import com.ymt.testplatform.entity.StressMonitorInfo;
import com.ymt.testplatform.entity.StressMonitorItem;
import com.ymt.testplatform.entity.StressMonitorConfig;
import com.ymt.testplatform.entity.StressMonitorCpuInfo;
import com.ymt.testplatform.entity.StressMonitorMemoryInfo;
import com.ymt.testplatform.entity.StressMonitorDiskReadInfo;
import com.ymt.testplatform.entity.StressMonitorDiskWriteInfo;
import com.ymt.testplatform.entity.StressMonitorNetworkReceiveInfo;
import com.ymt.testplatform.entity.StressMonitorNetworkSendInfo;

public interface StressMonitorService {

	// StressMonitorConfig
	public void saveStressMonitorConfig(StressMonitorConfig stressMonitorConfig);

	public void updateStressMonitorConfig(StressMonitorConfig stressMonitorConfig);

	public StressMonitorConfig findStressMonitorConfigById(int id);

	public void deleteStressMonitorConfig(StressMonitorConfig stressMonitorConfig);
	
	public List<StressMonitorConfig> findStressMonitorConfigsByTaskId(Integer stresstaskid);

	// StressMonitorItem
	public Serializable saveStressMonitorItem(StressMonitorItem StressMonitorItem);

	public void updateStressMonitorItem(StressMonitorItem StressMonitorItem);

	public StressMonitorItem findStressMonitorItemById(int id);

	public void deleteStressMonitorItem(StressMonitorItem StressMonitorItem);
	
	public List<StressMonitorItem> findStressMonitorItemsByTaskId(Integer taskId);
	
	public List<StressMonitorItem> findStressMonitoredItemsByTaskId(Integer taskId);
	
	// StressMonitorInfo
	public void saveStressMonitorInfo(StressMonitorInfo StressMonitorInfo);

	public void updateStressMonitorInfo(StressMonitorInfo StressMonitorInfo);

	public StressMonitorInfo findStressMonitorInfoById(int id);

	public void deleteStressMonitorInfo(StressMonitorInfo StressMonitorInfo);
		
	public List<StressMonitorInfo> findStressMonitorInfosByConfigIdAndItemId(Integer configId,Integer itemId);

}
