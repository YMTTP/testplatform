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
import com.ymt.testplatform.util.Utils;


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
	public Application findApplicationByDomain(String domain){
		return applicationDAO.get("from Application where domain = ? and del=0", new Object[] { domain });
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
		String queryString = " where del = 0 ";
		queryString = Utils.getQueryString(queryString, map);
		return applicationDAO.findByHql(" from Application " + queryString, map, pageSize, pageIndex);
	}
	
	@Override
	public Long findApplicationPages(Integer pageSize, Map<String, Object> map){
		String queryString = " where del = 0 ";
		queryString = Utils.getQueryString(queryString, map);
		String hql = "select count(*) from Application " + queryString;
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
	public ApplicationType findApplicationTypeByName(String name){
		return ApplicationTypeDAO.get("from ApplicationType where type = ? and del=0", new Object[] { name });
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
	public List<ApplicationEnv> findApplicationEnvsByApplicationId(int applicationid){
		return ApplicationEnvDAO.find("from ApplicationEnv where applicationid = ? and del=0", new Object[] { applicationid });
	}
	
	
	@Override
	public ApplicationEnv findApplicationEnvByEnv(int id , int envid){
		return ApplicationEnvDAO.get("from ApplicationEnv where id = ? envid = ? and del=0", new Object[] { id, envid });
	}
	
	@Override
	public List<ApplicationEnv> findApplicationEnvsByVmInfoId(int vminfoid){
		return ApplicationEnvDAO.find("from ApplicationEnv where vminfoid = ? and del=0", new Object[] { vminfoid });
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
