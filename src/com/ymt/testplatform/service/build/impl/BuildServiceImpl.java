package com.ymt.testplatform.service.build.impl;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ymt.testplatform.dao.BaseDAO;
import com.ymt.testplatform.entity.BuildHistory;
import com.ymt.testplatform.service.build.BuildService;
import com.ymt.testplatform.util.Utils;

@Service("buildService")
public class BuildServiceImpl implements BuildService {

	@Resource
	private BaseDAO<BuildHistory> buildHistoryDAO;
	
	@Override
	public List<BuildHistory> findAllBuildHistory(Integer pageIndex, Integer pageSize, Integer departmentid, Map<String, Object> map, String today) {
		String queryString = " where  1 = 1 ";
		queryString = Utils.getQueryString(queryString, map);
		if(today!=null&&today.equals("true")){
			Date date = new Date();
			DateFormat df = new SimpleDateFormat("yyyy-MM-dd");	
			queryString = queryString + " and time > " + "'" + df.format(date) + "'";
		}
		if(departmentid!=null){
			queryString += " and b.application.department.id = " + departmentid;
		}
		queryString = queryString + " order by time desc ";
		return buildHistoryDAO.findByHql(" from BuildHistory b" + queryString, map, pageSize, pageIndex);
	}

	@Override
	public Long findBuildHistoryPages(Integer pageSize, Integer departmentid, Map<String, Object> map, String today) {
		String queryString = " where 1 = 1 ";
		queryString = Utils.getQueryString(queryString, map);
		if(today!=null&&today.equals("true")){
			Date date = new Date();
			DateFormat df = new SimpleDateFormat("yyyy-MM-dd");	
			queryString = queryString + " and time > " + "'" + df.format(date) + "'";
		}
		String hql = "select count(*) from BuildHistory b" + queryString;
		if(departmentid!=null){
			hql += " and b.application.department.id = " + departmentid;
		}
		Long pages = buildHistoryDAO.count(hql, map);
		if(pages%pageSize!=0){
			pages = pages/pageSize + 1;
		}else{
			pages = pages/pageSize;
		}
		return pages;
	}
	
	public List<BuildHistory> findBuildHistoryByTime(Integer pageIndex, Integer pageSize, Integer departmentid, Integer appid, String start, String end){
		String queryString = " where 1=1 ";
		if(appid!=null){
			queryString += " and b.application.id = " + appid;
		}
		if(departmentid!=null){
			queryString += " and b.application.department.id = " + departmentid;
		}
		queryString = queryString + " and time > " + "'" + start + "'" + "and time < " + "'" + end + " 23:59:59" +  "'" + " group by b.application.id order by count(b.application.id) desc";
		return buildHistoryDAO.findByHql(" from BuildHistory b " + queryString, null, pageSize, pageIndex);
	}
	
	public Long findBuildHistoryByTimePages(Integer pageSize, Integer departmentid, Integer appid, String start, String end){
		String queryString = " where 1=1 ";
		if(appid!=null){
			queryString += " and b.application.id = " + appid;
		}
		if(departmentid!=null){
			queryString += " and b.application.department.id = " + departmentid;
		}
		queryString = queryString + " and time > " + "'" + start + "'" + "and time < " + "'" + end + " 23:59:59" + "'";
		String hql = "select count(distinct b.application.id) from BuildHistory b " + queryString;
		Long pages = buildHistoryDAO.count(hql);
		if(pages%pageSize!=0){
			pages = pages/pageSize + 1;
		}else{
			pages = pages/pageSize;
		}
		return pages;
	}
	
	public Long findBuildHistoryCountByAppid( Integer appid, Integer envid, String start, String end){
		String queryString = " where appid = " + appid + "and envid = " + envid + " and time > " + "'" + start + "'" + "and time < " + "'" + end + " 23:59:59" + "'";
		String hql = "select count(*) from BuildHistory " + queryString;
		return buildHistoryDAO.count(hql);
	}
	
	
	public Long findDailyBuildHistoryCountByTimeAndEvn( String time, Integer envid){
		String queryString = " where DATE_FORMAT(time,'%Y-%m-%e') = '" + time + "'" + " and envid=" + envid;
		String hql = "select count(*) from BuildHistory " + queryString;
		return buildHistoryDAO.count(hql);
	}
	
	public Long findMonthlyBuildHistoryCountByYearAndEvn( String year, String month, Integer envid){
		String queryString = " where year(time) = " + year + " and month(time) =" + month + " and envid=" + envid;
		String hql = "select count(*) from BuildHistory " + queryString;
		return buildHistoryDAO.count(hql);
	}
	
	public Long findDailyBuildAppCountByByTime( String time){
		String queryString = " where DATE_FORMAT(time,'%Y-%m-%e') = '" + time + "'";
		String hql = "select count(distinct appid) from BuildHistory " + queryString;
		return buildHistoryDAO.count(hql);
	}
	
	public Long findMonthlyBuildAppCountByYear( String year, String month){
		String queryString = " where year(time) = " + year + " and month(time) =" + month;
		String hql = "select count(distinct appid) from BuildHistory " + queryString;
		return buildHistoryDAO.count(hql);
	}
}
