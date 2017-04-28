package com.ymt.testplatform.service.monitor;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import com.ymt.testplatform.entity.MonitorInfo;
import com.ymt.testplatform.entity.MonitorItem;
import com.ymt.testplatform.entity.MonitorConfig;
import com.ymt.testplatform.entity.MonitorRelation;
import com.ymt.testplatform.entity.MonitorShowItem;
import com.ymt.testplatform.entity.MonitorTask;


public interface MonitorService {
	//MonitorTask
	public void saveMonitorTask(MonitorTask MonitorTask);

	public void updateMonitorTask(MonitorTask MonitorTask);

	public MonitorTask findMonitorTaskById(int id);

	public void deleteMonitorTask(MonitorTask MonitorTask);
	
	public List<MonitorTask> findAllMonitorTasks(Integer pageIndex, Integer pageSize, Map<String, Object> map);
	
	public Long findMonitorTaskPages(Integer pageSize, Map<String, Object> map);
	
	//MonitorRelation
	public MonitorRelation findMonitorRelationById(int id);
	
	public void saveMonitorRelation(MonitorRelation MonitorRelation);

	public void updateMonitorRelation(MonitorRelation MonitorRelation);

	public List<MonitorRelation> findMonitorRelationByStressItemId(int itemid);

	public void deleteMonitorRelation(MonitorRelation MonitorRelation);
	
	public List<MonitorRelation> findMonitorRelatedItemByStressTaskId(int stressTaskId);

	// MonitorConfig
	public void saveMonitorConfig(MonitorConfig MonitorConfig);

	public void updateMonitorConfig(MonitorConfig MonitorConfig);

	public MonitorConfig findMonitorConfigById(int id);
	
	public MonitorConfig findValidMonitorConfigById(int id);

	public void deleteMonitorConfig(MonitorConfig MonitorConfig);
	
	public List<MonitorConfig> findMonitorConfigsByTaskId(Integer taskid);

	// MonitorItem
	public Serializable saveMonitorItem(MonitorItem MonitorItem);

	public void updateMonitorItem(MonitorItem MonitorItem);

	public MonitorItem findMonitorItemById(int id);

	public void deleteMonitorItem(MonitorItem MonitorItem);
	
	public List<MonitorShowItem> findMonitorItemsByTaskId(Integer taskId);
	
	public List<MonitorItem> findMonitoredItemsByTaskId(Integer taskId);
	
	// MonitorInfo
	public void saveMonitorInfo(MonitorInfo MonitorInfo);

	public void updateMonitorInfo(MonitorInfo MonitorInfo);

	public MonitorInfo findMonitorInfoById(int id);

	public void deleteMonitorInfo(MonitorInfo MonitorInfo);
		
	public List<Map> findMonitorInfosByConfigIdAndItemId(Integer configId,Integer itemId);

}
