package com.ymt.testplatform.service.build;

import java.util.List;
import java.util.Map;

import com.ymt.testplatform.entity.BuildHistory;

public interface BuildService {
	public List<BuildHistory> findAllBuildHistory(Integer pageIndex, Integer pageSize, Map<String, Object> map);
	public Long findBuildHistoryPages(Integer pageSize, Map<String, Object> map);
}
