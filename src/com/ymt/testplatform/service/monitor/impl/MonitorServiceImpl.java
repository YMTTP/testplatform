package com.ymt.testplatform.service.monitor.impl;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ymt.testplatform.dao.BaseDAO;
import com.ymt.testplatform.entity.MonitorInfo;
import com.ymt.testplatform.entity.MonitorItem;
import com.ymt.testplatform.entity.MonitorConfig;
import com.ymt.testplatform.entity.MonitorRelation;
import com.ymt.testplatform.entity.MonitorShowItem;
import com.ymt.testplatform.entity.MonitorTask;
import com.ymt.testplatform.entity.StressTask;
import com.ymt.testplatform.entity.StressTaskNameInfo;
import com.ymt.testplatform.service.monitor.MonitorService;
import com.ymt.testplatform.util.Utils;

@Service("MonitorService")
public class MonitorServiceImpl implements MonitorService {

	@Resource
	private BaseDAO<MonitorTask> MonitorTaskDao;

	@Resource
	private BaseDAO<MonitorRelation> MonitorRelationDao;

	@Resource
	private BaseDAO<MonitorConfig> MonitorConfigDao;

	@Resource
	private BaseDAO<MonitorItem> MonitorItemDao;

	@Resource
	private BaseDAO<MonitorInfo> MonitorInfoDao;

	// MonitorTask
	@Override
	public MonitorTask findMonitorTaskById(int id) {
		return MonitorTaskDao.get("from MonitorTask where id = ? and del=0",
				new Object[] { id });
	}

	@Override
	public void saveMonitorTask(MonitorTask MonitorTask) {
		MonitorTaskDao.save(MonitorTask);
	}

	@Override
	public void updateMonitorTask(MonitorTask MonitorTask) {
		MonitorTaskDao.update(MonitorTask);
	}

	@Override
	public void deleteMonitorTask(MonitorTask MonitorTask) {
		MonitorTaskDao.delete(MonitorTask);
	}

	@Override
	public List<MonitorTask> findAllMonitorTasks(Integer pageIndex,
			Integer pageSize, Map<String, Object> map) {
		String queryString = " where s.del = 0 ";
		queryString = Utils.getQueryString(queryString, map);
		queryString = queryString + " order by time desc";
		return MonitorTaskDao.findByHql(" from MonitorTask s" + queryString,
				map, pageSize, pageIndex);
	}

	@Override
	public Long findMonitorTaskPages(Integer pageSize, Map<String, Object> map) {
		String queryString = " where s.del = 0  ";
		queryString = Utils.getQueryString(queryString, map);
		String hql = "select count(*) from MonitorTask s" + queryString;
		Long pages = MonitorTaskDao.count(hql, map);
		if (pages % pageSize != 0) {
			pages = pages / pageSize + 1;
		} else {
			pages = pages / pageSize;
		}
		return pages;
	}

	// MonitorRelation
	@Override
	public MonitorRelation findMonitorRelationById(int id) {
		return MonitorRelationDao.get("from MonitorRelation where id = ?",
				new Object[] { id });
	}

	@Override
	public List<MonitorRelation> findMonitorRelationByStressItemId(int itemid) {
		return MonitorRelationDao.find(
				"from MonitorRelation where monitorItemId = ?  and del=0",
				new Object[] { itemid });
	}

	@Override
	public void saveMonitorRelation(MonitorRelation MonitorRelation) {
		MonitorRelationDao.save(MonitorRelation);
	}

	@Override
	public void updateMonitorRelation(MonitorRelation MonitorRelation) {
		MonitorRelationDao.update(MonitorRelation);
	}

	@Override
	public void deleteMonitorRelation(MonitorRelation MonitorRelation) {
		MonitorRelationDao.delete(MonitorRelation);
	}

	public List<MonitorRelation> findMonitorRelatedItemByStressTaskId(
			int stressTaskId) {
		return MonitorRelationDao.find(
				"from MonitorRelation where stressTaskId = ? and del=0",
				new Object[] { stressTaskId });
	}

	// MonitorConfig
	@Override
	public void saveMonitorConfig(MonitorConfig MonitorConfig) {
		MonitorConfigDao.save(MonitorConfig);
	}

	@Override
	public void updateMonitorConfig(MonitorConfig MonitorConfig) {
		MonitorConfigDao.update(MonitorConfig);

	}

	@Override
	public MonitorConfig findMonitorConfigById(int id) {
		return MonitorConfigDao.get("from MonitorConfig where id = ?",
				new Object[] { id });
	}

	@Override
	public MonitorConfig findValidMonitorConfigById(int id) {
		return MonitorConfigDao.get(
				"from MonitorConfig where id = ? and del=0",
				new Object[] { id });
	}

	@Override
	public void deleteMonitorConfig(MonitorConfig MonitorConfig) {
		MonitorConfigDao.update(MonitorConfig);
	}

	@Override
	public List<MonitorConfig> findMonitorConfigsByTaskId(Integer taskid) {
		return MonitorConfigDao.find(
				"from MonitorConfig where taskid = ? and del=0",
				new Object[] { taskid });
	}

	// StreeMonitorItem
	@Override
	public Serializable saveMonitorItem(MonitorItem MonitorItem) {
		return MonitorItemDao.save(MonitorItem);
	}

	@Override
	public void updateMonitorItem(MonitorItem MonitorItem) {
		MonitorItemDao.update(MonitorItem);
	}

	@Override
	public MonitorItem findMonitorItemById(int id) {
		return MonitorItemDao.get(
				"from MonitorItem where id = ? order by startTime asc",
				new Object[] { id });
	}

	@Override
	public void deleteMonitorItem(MonitorItem MonitorItem) {
		MonitorItemDao.delete(MonitorItem);
	}

	@Override
	public List<MonitorShowItem> findMonitorItemsByTaskId(Integer taskId) {
		String queryString = "SELECT item.id as id,item.comment as comment,item.endTime as endTime,item.startTime as startTime,task.title as title FROM MonitorItem as item left join (select * from MonitorRelation where del=0) as relation on item.id=relation.monitorItemId left join StressTask as task on relation.stressTaskId=task.id where item.taskId=? order by item.startTime desc";
		List<Map> maps = MonitorItemDao.findBySqlReturnMap(queryString, new Object[] { taskId });
		
		List<MonitorShowItem> tasks = new ArrayList<MonitorShowItem>();
		
		for (Map map : maps) {
			MonitorShowItem info = new MonitorShowItem();
			info.setId(Integer.parseInt(map.get("id").toString()));
			info.setComment(map.get("comment").toString());		
			info.setStartTime(map.get("startTime").toString().substring(0, 19));		
			info.setEndTime(map.get("endTime").toString().substring(0, 19));		
			if(map.get("title")!=null)
			{
				info.setTitle(map.get("title").toString());	
			}
			tasks.add(info);
		}
		
		
		return tasks;
	}

	@Override
	public List<MonitorItem> findMonitoredItemsByTaskId(Integer taskId) {
		return MonitorItemDao.find(
				"from MonitorItem where taskId = ?  and endTime>now()",
				new Object[] { taskId });
	}

	// MonitorCpuInfo
	@Override
	public void saveMonitorInfo(MonitorInfo MonitorInfo) {
		MonitorInfoDao.save(MonitorInfo);
	}

	@Override
	public void updateMonitorInfo(MonitorInfo MonitorInfo) {
		MonitorInfoDao.update(MonitorInfo);
	}

	@Override
	public MonitorInfo findMonitorInfoById(int id) {
		return MonitorInfoDao.get("from MonitorInfo where id = ?",
				new Object[] { id });
	}

	@Override
	public void deleteMonitorInfo(MonitorInfo MonitorInfo) {
		MonitorInfoDao.delete(MonitorInfo);
	}

	@Override
	public List<Map> findMonitorInfosByConfigIdAndItemId(
			Integer configId, Integer itemId) {
		return MonitorInfoDao.findBySqlReturnMap(
				"call sp_getMonitorInfo_2(?,?,?)",
				new Object[] { itemId, configId,150 });

	}

}
