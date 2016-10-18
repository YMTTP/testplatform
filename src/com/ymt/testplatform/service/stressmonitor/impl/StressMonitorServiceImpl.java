package com.ymt.testplatform.service.stressmonitor.impl;

import java.io.Serializable;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ymt.testplatform.dao.BaseDAO;
import com.ymt.testplatform.entity.StressMonitorInfo;
import com.ymt.testplatform.entity.StressMonitorItem;
import com.ymt.testplatform.entity.StressMonitorConfig;
import com.ymt.testplatform.entity.StressMonitorCpuInfo;
import com.ymt.testplatform.entity.StressMonitorDiskReadInfo;
import com.ymt.testplatform.entity.StressMonitorDiskWriteInfo;
import com.ymt.testplatform.entity.StressMonitorMemoryInfo;
import com.ymt.testplatform.entity.StressMonitorNetworkReceiveInfo;
import com.ymt.testplatform.entity.StressMonitorNetworkSendInfo;
import com.ymt.testplatform.service.stressmonitor.StressMonitorService;

@Service("StressMonitorService")
public class StressMonitorServiceImpl implements StressMonitorService{

	@Resource
	private BaseDAO<StressMonitorConfig> stressMonitorConfigDao;
	
	@Resource
	private BaseDAO<StressMonitorItem> stressMonitorItemDao;
	
	@Resource
	private BaseDAO<StressMonitorInfo> stressMonitorInfoDao;

	// StressMonitorConfig
	@Override
	public void saveStressMonitorConfig(StressMonitorConfig stressMonitorConfig) {
		stressMonitorConfigDao.save(stressMonitorConfig);
	}

	@Override
	public void updateStressMonitorConfig(
			StressMonitorConfig stressMonitorConfig) {
		stressMonitorConfigDao.update(stressMonitorConfig);
		
	}

	@Override
	public StressMonitorConfig findStressMonitorConfigById(int id) {
		return stressMonitorConfigDao.get("from StressMonitorConfig where id = ?", new Object[] { id });
	}

	@Override
	public void deleteStressMonitorConfig(
			StressMonitorConfig stressMonitorConfig) {
		stressMonitorConfigDao.delete(stressMonitorConfig);
	}

	@Override
	public List<StressMonitorConfig> findStressMonitorConfigsByTaskId(
			Integer stresstaskid) {
		return stressMonitorConfigDao.find("from StressMonitorConfig where taskid = ?", new Object[] { stresstaskid });
	}

	// StreeMonitorItem
	@Override
	public Serializable saveStressMonitorItem(StressMonitorItem StressMonitorItem) {
		return stressMonitorItemDao.save(StressMonitorItem);
	}

	@Override
	public void updateStressMonitorItem(StressMonitorItem StressMonitorItem) {
		stressMonitorItemDao.update(StressMonitorItem);
	}

	@Override
	public StressMonitorItem findStressMonitorItemById(int id) {
		return stressMonitorItemDao.get("from StressMonitorItem where id = ? order by startTime asc", new Object[] { id });
	}

	@Override
	public void deleteStressMonitorItem(StressMonitorItem StressMonitorItem) {
		stressMonitorItemDao.delete(StressMonitorItem);
	}

	@Override
	public List<StressMonitorItem> findStressMonitorItemsByTaskId(
			Integer taskId) {
		return stressMonitorItemDao.find("from StressMonitorItem where taskId = ?", new Object[] { taskId });
	}
	
	@Override         
	public List<StressMonitorItem> findStressMonitoredItemsByTaskId(
			Integer taskId) {
		return stressMonitorItemDao.find("from StressMonitorItem where taskId = ?  and endTime>now()", new Object[] { taskId });
	}

	// StressMonitorCpuInfo
	@Override
	public void saveStressMonitorInfo(StressMonitorInfo StressMonitorInfo) {
		stressMonitorInfoDao.save(StressMonitorInfo);
	}

	@Override
	public void updateStressMonitorInfo(StressMonitorInfo StressMonitorInfo) {
		stressMonitorInfoDao.update(StressMonitorInfo);
	}

	@Override
	public StressMonitorInfo findStressMonitorInfoById(int id) {
		return stressMonitorInfoDao.get("from StressMonitorInfo where id = ?", new Object[] { id });
	}

	@Override
	public void deleteStressMonitorInfo(StressMonitorInfo StressMonitorInfo) {
		stressMonitorInfoDao.delete(StressMonitorInfo);
	}

	@Override
	public List<StressMonitorInfo> findStressMonitorInfosByConfigIdAndItemId(
			Integer configId, Integer itemId) {
		return stressMonitorInfoDao.find("from StressMonitorInfo where configId = ?  and itemId = ?", new Object[] { configId, itemId });
	}
}
