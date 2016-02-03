package com.ymt.testplatform.service.appassert;

import java.util.List;

import com.ymt.testplatform.entity.AppAssert;


public interface AppAssertService {
	
	public AppAssert findAppAssertById(int id);
	
	public void saveAppAssert(AppAssert appAssert);

	public void updateAppAssert(AppAssert appAssert);

	public void deleteAppAssert(AppAssert appAssert);

	public List<AppAssert> findAllList(Integer pageIndex, Integer pageSize);
	
	public Long findPages(Integer pageSize);

	

	

}
