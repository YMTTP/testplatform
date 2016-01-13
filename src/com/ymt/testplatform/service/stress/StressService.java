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
	
	public List<StressTask> findAllStressTasks(Integer pageIndex, Integer pageSize, Map<String, Object> map);
	
	public Long findStressTaskPages(Integer pageSize, Map<String, Object> map);
	
	// StressResult
	public void saveStressResult(StressResult stressResult);

	public void updateStressResult(StressResult stressResult);

	public StressResult findStressResultById(int id);

	public void deleteStressResult(StressResult stressResult);
	
	public List<StressResult> findStressResultsByStressTask(Integer stresstaskid);
	
}
