package com.ymt.testplatform.service.H5Stress.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ymt.testplatform.dao.BaseDAO;
import com.ymt.testplatform.entity.H5DeviceInfo;
import com.ymt.testplatform.entity.H5DomainResult;
import com.ymt.testplatform.entity.H5Machine;
import com.ymt.testplatform.entity.H5OriginalSource;
import com.ymt.testplatform.entity.H5Record;
import com.ymt.testplatform.entity.H5ResourceResult;
import com.ymt.testplatform.entity.H5Result;
import com.ymt.testplatform.entity.H5Task;
import com.ymt.testplatform.service.H5Stress.H5StressService;
import com.ymt.testplatform.util.Utils;

@Service("h5StressService")
public class H5StressServiceImpl implements H5StressService{
	@Resource
	private BaseDAO<H5Task> h5TaskDAO;
	
	@Resource
	private BaseDAO<H5Record> h5RecordDAO;

	@Resource
	private BaseDAO<H5Machine> h5MachineDAO;
	
	@Resource
	private BaseDAO<H5OriginalSource> h5OriginalSourceDAO;
	
	@Resource
	private BaseDAO<H5Result> h5ResultDAO;
	
	@Resource
	private BaseDAO<H5DomainResult> h5DomainResultDAO;
	
	@Resource
	private BaseDAO<H5ResourceResult> h5ResourceResultDAO;
	
	@Resource
	private BaseDAO<H5DeviceInfo> h5DeviceInfoDAO;
	
	// H5Task
	@Override
	public H5Task findH5TaskById(int id){
		return h5TaskDAO.get("from H5Task where id = ? and del=0", new Object[] { id });
	}
	
	@Override
	public void saveH5Task(H5Task stressTask) {
		h5TaskDAO.save(stressTask);
	}

	@Override
	public void updateH5Task(H5Task stressTask) {
		h5TaskDAO.update(stressTask);
	}

	@Override
	public void deleteH5Task(H5Task stressTask) {
		h5TaskDAO.delete(stressTask);
	}

	@Override
	public List<H5Task> findAllH5Tasks(Integer pageIndex, Integer pageSize, Map<String, Object> map){	
		String queryString = " where s.del = 0 ";
		queryString = Utils.getQueryString(queryString, map);
	
		queryString = queryString + " order by time desc";
		return h5TaskDAO.findByHql(" from H5Task s" + queryString, map, pageSize, pageIndex);
	}
	
	@Override
	public Long findH5TaskPages(Integer pageSize, Map<String, Object> map){
		String queryString = " where s.del = 0 ";
		queryString = Utils.getQueryString(queryString, map);
		
		String hql = "select count(*) from H5Task s" + queryString;
		Long pages = h5TaskDAO.count(hql, map);
		if(pages%pageSize!=0){
			pages = pages/pageSize + 1;
		}else{
			pages = pages/pageSize;
		}
		return pages;
	}
	
	// H5Record
	@Override
	public H5Record findH5RecordById(int id){
		return h5RecordDAO.get("from H5Record where id = ? and del=0", new Object[] { id });
	}
	public void clearDevice(){
		h5RecordDAO.excuteBySql("update H5Record set status=4 where status=1");
	}
	
	@Override
	public int saveH5Record(H5Record stressRecord) {
		return (Integer)h5RecordDAO.save(stressRecord);
	}

	@Override
	public void updateH5Record(H5Record stressRecord) {
		h5RecordDAO.update(stressRecord);
	}

	@Override
	public void deleteH5Record(H5Record stressRecord) {
		h5RecordDAO.delete(stressRecord);
	}

	@Override
	public List<H5Record> findH5RecordsByTaskId(Integer taskId){		
		return h5RecordDAO.find("from H5Record where taskId = ? order by time desc" ,new Object[] { taskId });	
	}
	
	@Override
	public boolean checkDeviceExecutable(Integer machineId, String device){		
		List<H5Record> records = h5RecordDAO.find("from H5Record where machineid = ? and device=? and status=1" ,new Object[] { machineId, device});	
		return records.size()==0;
	}
	
	@Override
	public List<H5Record> findRunningH5RecordsByTaskId(Integer taskId){		
		return h5RecordDAO.find("from H5Record where taskId = ? and status=1" ,new Object[] { taskId });	
	}
	
	// H5Machine
	@Override
	public H5Machine findH5MachineById(int id){
		return h5MachineDAO.get("from H5Machine where id = ? and del=0", new Object[] { id });
	}
	
	@Override
	public H5Machine findH5MachineByIp(String ip){
		return h5MachineDAO.get("from H5Machine where ip = ? and del=0", new Object[] { ip });
	}
	
	@Override
	public void saveH5Machine(H5Machine stressMachine) {
		h5MachineDAO.save(stressMachine);
	}

	@Override
	public void updateH5Machine(H5Machine stressMachine) {
		h5MachineDAO.update(stressMachine);
	}

	@Override
	public void deleteH5Machine(H5Machine stressMachine) {
		h5MachineDAO.delete(stressMachine);
	}

	@Override
	public List<H5Machine> findAllH5Machines(Integer pageIndex, Integer pageSize, Map<String, Object> map){	
		String queryString = " where s.del = 0 ";
		queryString = Utils.getQueryString(queryString, map);
	
		queryString = queryString + " order by time desc";
		return h5MachineDAO.findByHql(" from H5Machine s" + queryString, map, pageSize, pageIndex);
	}
	
	@Override
	public List<H5Machine> findAllH5Machines(){	
		String queryString = " where s.del = 0 order by time desc";
	
		return h5MachineDAO.find(" from H5Machine s" + queryString);
	}
	
	@Override
	public Long findH5MachinePages(Integer pageSize, Map<String, Object> map){
		String queryString = " where s.del = 0 ";
		queryString = Utils.getQueryString(queryString, map);
		
		String hql = "select count(*) from H5Machine s" + queryString;
		Long pages = h5MachineDAO.count(hql, map);
		if(pages%pageSize!=0){
			pages = pages/pageSize + 1;
		}else{
			pages = pages/pageSize;
		}
		return pages;
	}
	
	// H5OriginalSource
	@Override
	public H5OriginalSource findH5OriginalSourceById(int id){
		return h5OriginalSourceDAO.get("from H5OriginalSource where id = ?", new Object[] { id });
	}
	
	@Override
	public void saveH5OriginalSource(H5OriginalSource stressOriginalSource) {
		h5OriginalSourceDAO.save(stressOriginalSource);
	}

	@Override
	public void updateH5OriginalSource(H5OriginalSource stressOriginalSource) {
		h5OriginalSourceDAO.update(stressOriginalSource);
	}

	@Override
	public void deleteH5OriginalSource(H5OriginalSource stressOriginalSource) {
		h5OriginalSourceDAO.delete(stressOriginalSource);
	}

	@Override
	public List<H5OriginalSource> findH5OriginalSourcesByRecordId(Integer recordId){		
		return h5OriginalSourceDAO.find("from H5OriginalSource where recordid = ? order by createtime desc" ,new Object[] { recordId });	
	}
	
	@Override
	public List<H5OriginalSource> findH5OriginalSourcesByRecordIdAndType(Integer recordId, String type){
		return h5OriginalSourceDAO.find("from H5OriginalSource where recordid = ? and type= ?  order by responsesize desc" ,new Object[] { recordId, type });	
	}

	@Override
	public List<Map> getDomainResultByRecordId(Integer recordId){
		String sql = "select  distinct host as name,sum(responsesize) as size, count(host) as num from H5OriginalSource where recordid=? group by host";
		return h5OriginalSourceDAO.findBySqlReturnMap(sql, new Object[] { recordId});	
	}

	@Override
	public List<Map> getResourceResultByRecordId(Integer recordId){
		String sql = "select distinct type as name,sum(responsesize) as size, count(host) as num from H5OriginalSource where recordid=? group by type";
		return h5OriginalSourceDAO.findBySqlReturnMap(sql, new Object[] { recordId});	
	}
	
	// H5Result
	@Override
	public H5Result findH5ResultById(int id){
		return h5ResultDAO.get("from H5Result where id = ?", new Object[] { id });
	}
	
	@Override
	public void saveH5Result(H5Result stressResult) {
		h5ResultDAO.save(stressResult);
	}

	@Override
	public void updateH5Result(H5Result stressResult) {
		h5ResultDAO.update(stressResult);
	}

	@Override
	public void deleteH5Result(H5Result stressResult) {
		h5ResultDAO.delete(stressResult);
	}

	@Override
	public List<H5Result> findH5ResultsByRecordId(Integer recordId){		
		return h5ResultDAO.find("from H5Result where recordid = ?" ,new Object[] { recordId });	
	}
	
	// H5DomainResult
	@Override
	public H5DomainResult findH5DomainResultById(int id){
		return h5DomainResultDAO.get("from H5DomainResult where id = ?", new Object[] { id });
	}
	
	@Override
	public void saveH5DomainResult(H5DomainResult stressDomainResult) {
		h5DomainResultDAO.save(stressDomainResult);
	}

	@Override
	public void updateH5DomainResult(H5DomainResult stressDomainResult) {
		h5DomainResultDAO.update(stressDomainResult);
	}

	@Override
	public void deleteH5DomainResult(H5DomainResult stressDomainResult) {
		h5DomainResultDAO.delete(stressDomainResult);
	}

	@Override
	public List<H5DomainResult> findH5DomainResultsByRecordId(Integer recordid){		
		return h5DomainResultDAO.find("from H5DomainResult where recordid = ? order by num desc" ,new Object[] { recordid });	
	}
	
	// H5ResourceResult
	@Override
	public H5ResourceResult findH5ResourceResultById(int id){
		return h5ResourceResultDAO.get("from H5ResourceResult where id = ? ", new Object[] { id });
	}
	
	@Override
	public void saveH5ResourceResult(H5ResourceResult stressResourceResult) {
		h5ResourceResultDAO.save(stressResourceResult);
	}

	@Override
	public void updateH5ResourceResult(H5ResourceResult stressResourceResult) {
		h5ResourceResultDAO.update(stressResourceResult);
	}

	@Override
	public void deleteH5ResourceResult(H5ResourceResult stressResourceResult) {
		h5ResourceResultDAO.delete(stressResourceResult);
	}

	@Override
	public List<H5ResourceResult> findH5ResourceResultsByRecordId(Integer recordid){		
		return h5ResourceResultDAO.find("from H5ResourceResult where recordid = ?  order by num desc" ,new Object[] { recordid });	
	}
	
	// H5ResourceDeviceInfo
		@Override
		public H5DeviceInfo findH5DeviceInfoById(int id){
			return h5DeviceInfoDAO.get("from H5DeviceInfo where id = ?", new Object[] { id });
		}
		
		@Override
		public void saveH5DeviceInfo(H5DeviceInfo stressDeviceInfo) {
			h5DeviceInfoDAO.save(stressDeviceInfo);
		}

		@Override
		public void updateH5DeviceInfo(H5DeviceInfo stressDeviceInfo) {
			h5DeviceInfoDAO.update(stressDeviceInfo);
		}

		@Override
		public void deleteH5DeviceInfo(H5DeviceInfo stressDeviceInfo) {
			h5DeviceInfoDAO.delete(stressDeviceInfo);
		}

		@Override
		public List<H5DeviceInfo> findH5DeviceInfosByRecordId(Integer recordid){		
			return h5DeviceInfoDAO.find("from H5DeviceInfo where recordid = ?" ,new Object[] { recordid });	
		}
}
