package com.ymt.testplatform.service.H5Stress;

import java.util.List;
import java.util.Map;

import com.ymt.testplatform.entity.H5DeviceInfo;
import com.ymt.testplatform.entity.H5DomainResult;
import com.ymt.testplatform.entity.H5Machine;
import com.ymt.testplatform.entity.H5OriginalSource;
import com.ymt.testplatform.entity.H5Record;
import com.ymt.testplatform.entity.H5ResourceResult;
import com.ymt.testplatform.entity.H5Result;
import com.ymt.testplatform.entity.H5Task;

public interface H5StressService {

	// H5Task
	public void saveH5Task(H5Task h5Task);

	public void updateH5Task(H5Task H5Task);

	public H5Task findH5TaskById(int id);

	public void deleteH5Task(H5Task H5Task);

	public List<H5Task> findAllH5Tasks(Integer pageIndex, Integer pageSize,
			Map<String, Object> map);

	public Long findH5TaskPages(Integer pageSize, Map<String, Object> map);

	// H5Record
	public int saveH5Record(H5Record h5Record);

	public void updateH5Record(H5Record H5Record);

	public H5Record findH5RecordById(int id);
	
	public void clearDevice();

	public void deleteH5Record(H5Record H5Record);

	public List<H5Record> findH5RecordsByTaskId(Integer taskId);
	
	public boolean checkDeviceExecutable(Integer machineId, String device);
	
	public List<H5Record> findRunningH5RecordsByTaskId(Integer taskId);

	// H5Machine
	public void saveH5Machine(H5Machine h5Machine);

	public void updateH5Machine(H5Machine H5Machine);

	public H5Machine findH5MachineById(int id);
	
	public H5Machine findH5MachineByIp(String ip);

	public void deleteH5Machine(H5Machine H5Machine);

	public List<H5Machine> findAllH5Machines(Integer pageIndex,
			Integer pageSize, Map<String, Object> map);

	public List<H5Machine> findAllH5Machines();

	public Long findH5MachinePages(Integer pageSize, Map<String, Object> map);

	// H5OriginalSource
	public void saveH5OriginalSource(H5OriginalSource h5OriginalSource);

	public void updateH5OriginalSource(H5OriginalSource H5OriginalSource);

	public H5OriginalSource findH5OriginalSourceById(int id);

	public void deleteH5OriginalSource(H5OriginalSource H5OriginalSource);

	public List<H5OriginalSource> findH5OriginalSourcesByRecordId(
			Integer recordId);

	public List<H5OriginalSource> findH5OriginalSourcesByRecordIdAndType(
			Integer recordId, String type);
	
	public List<Map> getDomainResultByRecordId(Integer recordId);
	
	public List<Map> getResourceResultByRecordId(Integer recordId);

	// H5Result
	public void saveH5Result(H5Result h5Result);

	public void updateH5Result(H5Result H5Result);

	public H5Result findH5ResultById(int id);

	public void deleteH5Result(H5Result H5Result);

	public List<H5Result> findH5ResultsByRecordId(Integer recordId);

	// H5DomainResult
	public void saveH5DomainResult(H5DomainResult h5DomainResult);

	public void updateH5DomainResult(H5DomainResult H5DomainResult);

	public H5DomainResult findH5DomainResultById(int id);

	public void deleteH5DomainResult(H5DomainResult H5DomainResult);

	public List<H5DomainResult> findH5DomainResultsByRecordId(Integer recordId);

	// H5ResourceResult
	public void saveH5ResourceResult(H5ResourceResult h5ResourceResult);

	public void updateH5ResourceResult(H5ResourceResult H5ResourceResult);

	public H5ResourceResult findH5ResourceResultById(int id);

	public void deleteH5ResourceResult(H5ResourceResult H5ResourceResult);

	public List<H5ResourceResult> findH5ResourceResultsByRecordId(
			Integer recordId);

	// H5DeviceInfo
	public void saveH5DeviceInfo(H5DeviceInfo h5DeviceInfo);

	public void updateH5DeviceInfo(H5DeviceInfo H5DeviceInfo);

	public H5DeviceInfo findH5DeviceInfoById(int id);

	public void deleteH5DeviceInfo(H5DeviceInfo H5DeviceInfo);

	public List<H5DeviceInfo> findH5DeviceInfosByRecordId(Integer recordId);

}
