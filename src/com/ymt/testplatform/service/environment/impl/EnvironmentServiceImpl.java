package com.ymt.testplatform.service.environment.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ymt.testplatform.dao.BaseDAO;
import com.ymt.testplatform.entity.Env;
import com.ymt.testplatform.entity.ServerInfo;
import com.ymt.testplatform.entity.VmInfo;
import com.ymt.testplatform.service.environment.EnvironmentService;


@Service("environmentService")
public class EnvironmentServiceImpl implements EnvironmentService {

	@Resource
	private BaseDAO<Env> envDAO;
	
	@Resource
	private BaseDAO<ServerInfo> serverinfoDAO;
	
	@Resource
	private BaseDAO<VmInfo> vminfoDAO;

	
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
		return serverinfoDAO.find("from ServerInfo where del=0");
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
		return vminfoDAO.find("from VmInfo where del=0");
	}
}
