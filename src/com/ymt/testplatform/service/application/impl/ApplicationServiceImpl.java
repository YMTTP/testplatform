package com.ymt.testplatform.service.application.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ymt.testplatform.dao.BaseDAO;
import com.ymt.testplatform.entity.Application;
import com.ymt.testplatform.entity.ApplicationEnv;
import com.ymt.testplatform.entity.ApplicationType;
import com.ymt.testplatform.service.application.ApplicationService;


@Service("applicationService")
public class ApplicationServiceImpl implements ApplicationService {

	@Resource
	private BaseDAO<Application> applicationDAO;
	
	@Resource
	private BaseDAO<ApplicationType> ApplicationTypeDAO;
	
	@Resource
	private BaseDAO<ApplicationEnv> ApplicationEnvDAO;

	// Application
	@Override
	public Application findApplicationById(int id){
		return applicationDAO.get("from Application where id = ? and del=0", new Object[] { id });
	}
	
	@Override
	public void saveApplication(Application application) {
		applicationDAO.save(application);
	}

	@Override
	public void updateApplication(Application application) {
		applicationDAO.update(application);
	}

	@Override
	public void deleteApplication(Application application) {
		applicationDAO.delete(application);
	}

	@Override
	public List<Application> findAllApplications(Integer pageIndex, Integer pageSize, Map<String, Object> map){	
		return applicationDAO.findByHql(" from Application where del = 0 ", map, pageSize, pageIndex);
	}
	
	@Override
	public Long findApplicationPages(Integer pageSize, Map<String, Object> map){
		String hql = "select count(*) from Application where del=0";
		Long pages = applicationDAO.count(hql, map);
		if(pages%pageSize!=0){
			pages = pages/pageSize + 1;
		}else{
			pages = pages/pageSize;
		}
		return pages;
	}
	
	// ApplicationType
	@Override
	public ApplicationType findApplicationTypeById(int id){
		return ApplicationTypeDAO.get("from ApplicationType where id = ? and del=0", new Object[] { id });
	}
	
	@Override
	public void saveApplicationType(ApplicationType applicationType) {
		ApplicationTypeDAO.save(applicationType);
	}

	@Override
	public void updateApplicationType(ApplicationType applicationType) {
		ApplicationTypeDAO.update(applicationType);
	}

	@Override
	public void deleteApplicationType(ApplicationType applicationType) {
		ApplicationTypeDAO.delete(applicationType);
	}

	@Override
	public List<ApplicationType> findAllApplicationTypes(){	
		return ApplicationTypeDAO.find(" from ApplicationType where del = 0 ");
	}
	
	// ApplicationEnv
	@Override
	public ApplicationEnv findApplicationEnvById(int id){
		return ApplicationEnvDAO.get("from ApplicationEnv where id = ? and del=0", new Object[] { id });
	}
	
	@Override
	public void saveApplicationEnv(ApplicationEnv applicationEnv) {
		ApplicationEnvDAO.save(applicationEnv);
	}

	@Override
	public void updateApplicationEnv(ApplicationEnv applicationEnv) {
		ApplicationEnvDAO.update(applicationEnv);
	}

	@Override
	public void deleteApplicationEnv(ApplicationEnv applicationEnv) {
		ApplicationEnvDAO.delete(applicationEnv);
	}

}
