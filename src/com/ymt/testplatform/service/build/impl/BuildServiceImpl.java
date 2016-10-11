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
	public List<BuildHistory> findAllBuildHistory(Integer pageIndex, Integer pageSize, Map<String, Object> map, String today) {
		String queryString = " where  1 = 1 ";
		queryString = Utils.getQueryString(queryString, map);
		if(today!=null&&today.equals("true")){
			Date date = new Date();
			DateFormat df = new SimpleDateFormat("yyyy-MM-dd");	
			queryString = queryString + " and time > " + "'" + df.format(date) + "'";
		}
		queryString = queryString + " order by time desc ";
		return buildHistoryDAO.findByHql(" from BuildHistory" + queryString, map, pageSize, pageIndex);
	}

	@Override
	public Long findBuildHistoryPages(Integer pageSize, Map<String, Object> map, String today) {
		String queryString = " where 1 = 1 ";
		queryString = Utils.getQueryString(queryString, map);
		if(today!=null&&today.equals("true")){
			Date date = new Date();
			DateFormat df = new SimpleDateFormat("yyyy-MM-dd");	
			queryString = queryString + " and time > " + "'" + df.format(date) + "'";
		}
		String hql = "select count(*) from BuildHistory " + queryString;
		Long pages = buildHistoryDAO.count(hql, map);
		if(pages%pageSize!=0){
			pages = pages/pageSize + 1;
		}else{
			pages = pages/pageSize;
		}
		return pages;
	}
}
