package com.ymt.testplatform.service.stress.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ymt.testplatform.dao.BaseDAO;
import com.ymt.testplatform.entity.StressResult;
import com.ymt.testplatform.entity.StressTask;
import com.ymt.testplatform.service.stress.StressService;
import com.ymt.testplatform.util.Utils;


@Service("stressService")
public class StressServiceImpl implements StressService {

	@Resource
	private BaseDAO<StressTask> stressTaskDAO;
	
	@Resource
	private BaseDAO<StressResult> stressResultDAO;


	// StressTask
	@Override
	public StressTask findStressTaskById(int id){
		return stressTaskDAO.get("from StressTask where id = ? and del=0", new Object[] { id });
	}
	
	@Override
	public void saveStressTask(StressTask stressTask) {
		stressTaskDAO.save(stressTask);
	}

	@Override
	public void updateStressTask(StressTask stressTask) {
		stressTaskDAO.update(stressTask);
	}

	@Override
	public void deleteStressTask(StressTask stressTask) {
		stressTaskDAO.delete(stressTask);
	}

	@Override
	public List<StressTask> findAllStressTasks(Integer pageIndex, Integer pageSize, Map<String, Object> map, Integer departmentid){	
		String queryString = " where s.del = 0 ";
		queryString = Utils.getQueryString(queryString, map);
		if(departmentid!=null){
			queryString += " and s.application.department.id = " + departmentid;
		}
		queryString = queryString + " order by createtime";
		return stressTaskDAO.findByHql(" from StressTask s" + queryString, map, pageSize, pageIndex);
	}
	
	@Override
	public Long findStressTaskPages(Integer pageSize, Map<String, Object> map, Integer departmentid){
		String queryString = " where del = 0 ";
		queryString = Utils.getQueryString(queryString, map);
		if(departmentid!=null){
			queryString += " and s.application.department.id = " + departmentid;
		}
		String hql = "select count(*) from StressTask " + queryString;
		Long pages = stressTaskDAO.count(hql, map);
		if(pages%pageSize!=0){
			pages = pages/pageSize + 1;
		}else{
			pages = pages/pageSize;
		}
		return pages;
	}
	
	// StressResult
	@Override
	public void saveStressResult(StressResult stressResult) {
		stressResultDAO.save(stressResult);
	}

	@Override
	public void updateStressResult(StressResult stressResult) {
		stressResultDAO.update(stressResult);
	}

	@Override
	public void deleteStressResult(StressResult stressResult) {
		stressResultDAO.delete(stressResult);
	}

	@Override
	public StressResult findStressResultById(int id){
		return stressResultDAO.get("from StressResult where id = ? and del=0", new Object[] { id });
	}
	
	@Override
	public List<StressResult> findStressResultsByStressTask(Integer stresstaskid){	
		return stressResultDAO.find("from StressResult where stresstaskid = ? and del=0", new Object[] { stresstaskid });
	}
	
	
}
