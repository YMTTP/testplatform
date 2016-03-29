package com.ymt.testplatform.service.stress;


import java.util.List;
import java.util.Map;

import com.ymt.testplatform.entity.StressTask;
import com.ymt.testplatform.entity.StressResult;

public interface StressService {

	// StressTask
	public void saveStressTask(StressTask stressTask);

	public void updateStressTask(StressTask stressTask);

	public StressTask findStressTaskById(int id);

	public void deleteStressTask(StressTask stressTask);
	
	public List<StressTask> findAllStressTasks(Integer pageIndex, Integer pageSize, Map<String, Object> map, Integer departmentid);
	
	public Long findStressTaskPages(Integer pageSize, Map<String, Object> map, Integer departmentid);
	
	public List<StressResult> findAllStressResultGroupByApplicationid(Integer applicationid, Integer departmentid, Integer pageIndex, Integer pageSize);
	
	public Long findStressApplicationsPages(Integer pageSize, Integer applicationid, Integer departmentid);
	
	public Long getStressUrlCountByApplicationId(Integer applicationid);
	
	// StressResult
	public void saveStressResult(StressResult stressResult);

	public void updateStressResult(StressResult stressResult);

	public StressResult findStressResultById(int id);

	public void deleteStressResult(StressResult stressResult);
	
	public List<StressResult> findStressResultsByStressTask(Integer stresstaskid);
	
}
