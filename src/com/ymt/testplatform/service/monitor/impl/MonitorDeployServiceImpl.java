package com.ymt.testplatform.service.monitor.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ymt.testplatform.dao.BaseDAO;
import com.ymt.testplatform.entity.MonitorDeploy;
import com.ymt.testplatform.entity.MonitorDeployInfo;
import com.ymt.testplatform.entity.MonitorInfo;
import com.ymt.testplatform.entity.MonitorItem;
import com.ymt.testplatform.entity.VmInfo;
import com.ymt.testplatform.service.monitor.MonitorDeployService;
import com.ymt.testplatform.util.Utils;

@Service("MonitorDeployService")
public class MonitorDeployServiceImpl implements MonitorDeployService{

	@Resource
	private BaseDAO<MonitorDeploy> monitorDeployDao;
	
	@Resource
	private BaseDAO<VmInfo> vminfoDAO;
	
	@Override
	public List<MonitorDeployInfo> findAllVmInfos(Integer pageIndex, Integer pageSize, Map<String, Object> map, String envType){
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
		queryString = queryString + " order by name";
		
		queryString = "SELECT vm.id,vm.name,vm.ip,vm.os,md.vmid,md.version,md.setupVersion, md.isClientOn,md.isSetupOn,md.time FROM VmInfo as vm left join MonitorDeploy as md on vm.id=md.vmid"+queryString;

		List<Map> results = monitorDeployDao.findBySqlReturnMap(queryString,null, pageSize, pageIndex); 
		
		List<MonitorDeployInfo> infos = new ArrayList<MonitorDeployInfo>();
		
		for (Map result : results) {
			MonitorDeployInfo info = new MonitorDeployInfo();
			
			info.setId(Integer.parseInt(result.get("id").toString()));
			info.setName(result.get("name").toString());
			info.setIp(result.get("ip").toString());
			info.setOs(result.get("os").toString());
			
			if(result.get("vmid")!=null)
			{
				info.setVmid(Integer.parseInt(result.get("vmid").toString()));
			}
			
			if(result.get("version")!=null)
			{
				info.setVersion(result.get("version").toString());
			}
			
			if(result.get("setupVersion")!=null)
			{
				info.setSetupVersion(result.get("setupVersion").toString());
			}
			
			if(result.get("isClientOn")!=null)
			{
				info.setClientOn(result.get("isClientOn").toString().equals("Y"));
			}
			
			if(result.get("isSetupOn")!=null)
			{
				info.setSetupOn(result.get("isSetupOn").toString().equals("Y"));
			}
			
			if(result.get("time")!=null)
			{
				info.setTime(result.get("time").toString());
			}
						
			infos.add(info);			
		}
		
		return infos;
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
	public List<MonitorDeploy> findMonitorDeployByIp(String ip) {
		return monitorDeployDao.find(
				"from MonitorDeploy where vmid in (select id from VmInfo where ip=?)",
				new Object[] { ip });
	}
	
	@Override
	public List<MonitorDeploy> findMonitorDeployByVmId(Integer vmId) {
		return monitorDeployDao.find(
			"from MonitorDeploy where vmid=?",
			new Object[] { vmId });
}
	
	@Override
	public void saveMonitorDeploy(MonitorDeploy MonitorDeploy) {
		monitorDeployDao.save(MonitorDeploy);
	}

	@Override
	public void updateMonitorDeploy(MonitorDeploy MonitorDeploy) {
		monitorDeployDao.update(MonitorDeploy);
	}

}
