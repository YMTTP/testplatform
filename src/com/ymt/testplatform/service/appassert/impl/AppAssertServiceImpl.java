package com.ymt.testplatform.service.appassert.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ymt.testplatform.dao.BaseDAO;
import com.ymt.testplatform.entity.AppAssert;
import com.ymt.testplatform.entity.Department;
import com.ymt.testplatform.service.appassert.AppAssertService;
import com.ymt.testplatform.service.department.DepartmentService;


@Service("appAssertService")
public class AppAssertServiceImpl implements AppAssertService {

	@Resource
	private BaseDAO<AppAssert> appAssertDAO;

	@Override
	public AppAssert findAppAssertById(int id){
		return appAssertDAO.get("from AppAssert where id = ? and del=0", new Object[] { id });
	}
	
	@Override
	public void saveAppAssert(AppAssert appAssert) {
		appAssertDAO.save(appAssert);
	}

	@Override
	public void updateAppAssert(AppAssert appAssert) {
		appAssertDAO.update(appAssert);
	}

	@Override
	public void deleteAppAssert(AppAssert appAssert) {
		appAssertDAO.delete(appAssert);
	}

	@Override
	public List<AppAssert> findAllList(Integer pageIndex, Integer pageSize) {
		return appAssertDAO.findByHql("from AppAssert where del=0", null, pageSize, pageIndex);
	}

	
	@Override
	public Long findPages(Integer pageSize){
		String hql = "select count(*) from AppAssert where del=0";
		Long pages = appAssertDAO.count(hql);
		if(pages%pageSize!=0){
			pages = pages/pageSize + 1;
		}else{
			pages = pages/pageSize;
		}
		return pages;
	}
	


	

}
