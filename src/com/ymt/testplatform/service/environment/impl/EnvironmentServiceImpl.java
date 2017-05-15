package com.ymt.testplatform.service.environment.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ymt.testplatform.dao.BaseDAO;
import com.ymt.testplatform.entity.ApplicationEnv;
import com.ymt.testplatform.entity.Env;
import com.ymt.testplatform.entity.ServerInfo;
import com.ymt.testplatform.entity.VmInfo;
import com.ymt.testplatform.service.environment.EnvironmentService;
import com.ymt.testplatform.util.Utils;


@Service("environmentService")
public class EnvironmentServiceImpl implements EnvironmentService {

	@Resource
	private BaseDAO<Env> envDAO;
	
	@Resource
	private BaseDAO<ServerInfo> serverinfoDAO;
	
	@Resource
	private BaseDAO<VmInfo> vminfoDAO;
	
	@Resource
	private BaseDAO<ApplicationEnv> ApplicationEnvDAO;


	
	// Env
	@Override
	public Env findEnvById(int id){
		return envDAO.get("from Env where id = ? and del=0", new Object[] { id });
	}
	
	@Override
	public void saveEnv(Env env) {
		envDAO.save(env);
	}

	@Override
	public void updateEnv(Env env) {
		envDAO.update(env);
	}

	@Override
	public void deleteEnv(Env env) {
		envDAO.delete(env);
	}

	@Override
	public List<Env> findAllEnvs(){
		return envDAO.find("from Env where del=0");
	}
	
	// ServerInfo
	@Override
	public ServerInfo findServerInfoById(int id){
		return serverinfoDAO.get("from ServerInfo where id = ? and del=0", new Object[] { id });
	}
	
	@Override
	public void saveServerInfo(ServerInfo serverinfo) {
		serverinfoDAO.save(serverinfo);
	}

	@Override
	public void updateServerInfo(ServerInfo serverinfo) {
		serverinfoDAO.update(serverinfo);
	}

	@Override
	public void deleteServerInfo(ServerInfo serverinfo) {
		serverinfoDAO.delete(serverinfo);
	}

	@Override
	public List<ServerInfo> findAllServerInfos(){
		return serverinfoDAO.find("from ServerInfo where del=0 order by ip");
	}
	
	// VmInfo
	@Override
	public VmInfo findVmInfoById(int id){
		return vminfoDAO.get("from VmInfo where id = ? and del=0", new Object[] { id });
	}
	
	@Override
	public List<VmInfo> findVmInfosByServerinfoId(int serverinfoid){
		return vminfoDAO.find("from VmInfo where serverinfoid = ? and del=0", new Object[] { serverinfoid });
	}
	
	@Override
	public VmInfo findVmInfoByName(String name){
		return vminfoDAO.get("from VmInfo where name = ? and del=0", new Object[] { name });
	}
	
	@Override
	public void saveVmInfo(VmInfo vminfo) {
		vminfoDAO.save(vminfo);
	}

	@Override
	public void updateVmInfo(VmInfo vminfo) {
		vminfoDAO.update(vminfo);
	}

	@Override
	public void deleteVmInfo(VmInfo vminfo) {
		vminfoDAO.delete(vminfo);
	}
	
	@Override
	public List<VmInfo> findAllVmInfos(){
		return vminfoDAO.find("from VmInfo where del=0 order by name");		
	}

	@Override
	public List<VmInfo> findAllVmInfos(Integer pageIndex, Integer pageSize, Map<String, Object> map){
		String queryString = " where del = 0 ";
		queryString = Utils.getQueryString(queryString, map);
		queryString = queryString + " order by name";
		return vminfoDAO.findByHql("from VmInfo" + queryString, map, pageSize, pageIndex); 
	}
	
	@Override
	public Long findAllVmInfoPages(Integer pageSize, Map<String, Object> map){
		String queryString = " where del = 0 ";
		queryString = Utils.getQueryString(queryString, map);
		String hql = "select count(*) from VmInfo " + queryString;
		Long pages = vminfoDAO.count(hql, map);
		if(pages%pageSize!=0){
			pages = pages/pageSize + 1;
		}else{
			pages = pages/pageSize;
		}
		return pages;
	}
	
	@Override
	public List<VmInfo> findAllVmInfos(Integer pageIndex, Integer pageSize, Map<String, Object> map, String envType){
		String queryString = " where del = 0 ";
		queryString = Utils.getQueryString(queryString, map);
		
		if(envType.equals("STRESS"))
		{
			queryString = queryString + " and ip like '172.16.103%'";
		}
		
		if(envType.equals("SIT1"))
		{
			queryString = queryString + " and ip like '172.16.101%'";
		}
		
		if(envType.equals("SIT2"))
		{
			queryString = queryString + " and ip like '172.16.102%'";
		}
		
		if(envType.equals("UAT"))
		{
			queryString = queryString + " and ip like '172.16.110%'";
		}
		queryString = queryString + " order by ip";
		return vminfoDAO.findByHql("from VmInfo" + queryString, map, pageSize, pageIndex); 
	}
	
	@Override
	public Long findAllVmInfoPages(Integer pageSize, Map<String, Object> map, String envType){
		String queryString = " where del = 0 ";
		queryString = Utils.getQueryString(queryString, map);
		
		if(envType.equals("STRESS"))
		{
			queryString = queryString + "and ip like '172.16.103%'";
		}
		
		if(envType.equals("SIT1"))
		{
			queryString = queryString + "and ip like '172.16.101%'";
		}
		
		if(envType.equals("SIT2"))
		{
			queryString = queryString + "and ip like '172.16.102%'";
		}
		
		if(envType.equals("UAT"))
		{
			queryString = queryString + "and ip like '172.16.110%'";
		}
		
		String hql = "select count(*) from VmInfo " + queryString;
		Long pages = vminfoDAO.count(hql, map);
		if(pages%pageSize!=0){
			pages = pages/pageSize + 1;
		}else{
			pages = pages/pageSize;
		}
		return pages;
	}
	
	@Override
	public Long getApplicationEnvCountByVminfoId(Integer vminfoid){
		String hql = "select count(*) from ApplicationEnv where del = 0 and vminfo.id =" + vminfoid +" and applicationid not in (select id from Application where del=1)";
		return ApplicationEnvDAO.count(hql);

	}
	
	public VmInfo findVmInfoByIp(String ip)
	{
		return vminfoDAO.get("from VmInfo where ip = ? and del=0", new Object[] { ip });
	}
}
