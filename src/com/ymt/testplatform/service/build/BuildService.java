package com.ymt.testplatform.service.build;

import java.util.List;
import java.util.Map;

import com.ymt.testplatform.entity.BuildHistory;

public interface BuildService {
	
	public List<BuildHistory> findAllBuildHistory(Integer pageIndex, Integer pageSize, Map<String, Object> map, String today);
	
	public Long findBuildHistoryPages(Integer pageSize, Map<String, Object> map, String today);
	
	public List<BuildHistory> findBuildHistoryByTime(Integer pageIndex, Integer pageSize, Integer appid, String start, String end);
	
	public Long findBuildHistoryByTimePages(Integer pageSize, Integer appid, String start, String end);
	
	public Long findBuildHistoryCountByAppid( Integer appid, Integer envid, String start, String end);
	
	public Long findDailyBuildHistoryCountByTimeAndEvn( String time, Integer envid);
	
	public Long findMonthlyBuildHistoryCountByYearAndEvn( String year, String month, Integer envid);
	
	public Long findDailyBuildAppCountByByTimeAndEvn( String time, Integer envid);
	
	public Long findMonthlyBuildAppCountByYearAndEvn( String year, String month, Integer envid);
}
