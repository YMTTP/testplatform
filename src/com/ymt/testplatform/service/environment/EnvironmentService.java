package com.ymt.testplatform.service.environment;

import java.util.List;
import java.util.Map;

import com.ymt.testplatform.entity.Env;
import com.ymt.testplatform.entity.ServerInfo;
import com.ymt.testplatform.entity.VmInfo;

public interface EnvironmentService {
		
	// Env
	public Env findEnvById(int id);
	
	public void saveEnv(Env env);

	public void updateEnv(Env env);

	public void deleteEnv(Env env);
	
	public List<Env> findAllEnvs();
	
	// ServerInfo
	public ServerInfo findServerInfoById(int id);
	
	public void saveServerInfo(ServerInfo serverinfo);

	public void updateServerInfo(ServerInfo serverinfo);

	public void deleteServerInfo(ServerInfo serverinfo);

	public List<ServerInfo> findAllServerInfos();
	
	// VmInfo
	public VmInfo findVmInfoById(int id);
	
	public List<VmInfo> findVmInfosByServerinfoId(int serverinfoid);
	
	public VmInfo findVmInfoByName(String name);
	
	public void saveVmInfo(VmInfo env);

	public void updateVmInfo(VmInfo env);

	public void deleteVmInfo(VmInfo env);
	
	public List<VmInfo> findAllVmInfos();
	

	public VmInfo findVmInfoByIp(String ip);

	public List<VmInfo> findAllVmInfos(Integer pageIndex, Integer pageSize, Map<String, Object> map);
	
	public List<VmInfo> findAllVmInfos(Integer pageIndex, Integer pageSize, Map<String, Object> map,String envType);
	
	public Long findAllVmInfoPages(Integer pageSize, Map<String, Object> map);
	
	public Long findAllVmInfoPages(Integer pageSize, Map<String, Object> map,String envType);
	
	public Long getApplicationEnvCountByVminfoId(Integer vminfoid);

	



}
