package com.ymt.testplatform.action;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.struts2.ServletActionContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;

import com.sun.org.apache.bcel.internal.generic.NEW;
import com.ymt.testplatform.entity.H5DeviceInfo;
import com.ymt.testplatform.entity.H5DomainResult;
import com.ymt.testplatform.entity.H5Machine;
import com.ymt.testplatform.entity.H5OriginalSource;
import com.ymt.testplatform.entity.H5Record;
import com.ymt.testplatform.entity.H5ResourceResult;
import com.ymt.testplatform.entity.H5Result;
import com.ymt.testplatform.entity.H5Task;
import com.ymt.testplatform.entity.User;
import com.ymt.testplatform.service.H5Stress.H5StressService;
import com.ymt.testplatform.service.user.UserService;
import com.ymt.testplatform.util.BetterPropertyUtil;
import com.ymt.testplatform.util.FileUtil;
import com.ymt.testplatform.util.HttpRequest;

@Controller
public class H5StressAction {
	private static final long serialVersionUID = 1L;

	private static final Logger logger = LoggerFactory
			.getLogger(H5StressAction.class);

	@Resource
	private UserService userService;

	@Resource
	private H5StressService h5StressService;

	private Integer creatorid;
	private Integer taskid;
	private String name;
	private String url;
	private Integer recordid;
	private Integer machineId;
	private String device;
	private Integer status;

	private String ip;

	private Integer pagesize;
	private Integer pageindex;

	private String TaskId;
	private Boolean Success;
	private List<String> MonitorInfo;
	private List<String> SystemInfo;
	private JSONObject HarInfo;

	private JSONObject ret = new JSONObject();

	public String Test() {
		ret.put("retCode", "1000");
		ret.put("retMSG", "连接正常");
		return "success";
	}

	// H5Task
	public String listH5Tasks() {
		List<H5Task> sts = new ArrayList<H5Task>();

		HashMap<String, Object> conditions = new HashMap<String, Object>();

		sts = h5StressService.findAllH5Tasks(this.pageindex, this.pagesize,
				conditions);

		Long pageNum = h5StressService.findH5TaskPages(this.pagesize,
				conditions);

		JSONArray ja = JSONArray.fromObject(sts);
		ret.put("h5task", ja);
		ret.put("pagenum", pageNum);
		ret.put("retCode", "1000");
		ret.put("retMSG", "操作成功");
		return "success";
	}

	public String getH5TasksById() {

		H5Task st = h5StressService.findH5TaskById(taskid);

		ret.put("h5task", st);
		ret.put("retCode", "1000");
		ret.put("retMSG", "操作成功");
		return "success";
	}

	public String createH5Task() {

		User user = userService.findUserById(creatorid);
		if (user == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "创建人不存在");
			return "success";
		}

		H5Task h5Task = new H5Task();

		h5Task.setName(name);
		h5Task.setUrl(url);
		h5Task.setCreator(user);
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		h5Task.setTime(df.format(new Date()));
		h5Task.setDel(0);

		h5StressService.saveH5Task(h5Task);

		ret.put("retCode", "1000");
		ret.put("retMSG", "创建H5性能测试任务成功");
		return "success";
	}

	public String findH5RecordByTaskId() {
		List<H5Record> st = h5StressService.findH5RecordsByTaskId(taskid);

		if (st == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该任务不存在");
			return "success";
		}

		ret.put("h5record", st);
		ret.put("retCode", "1000");
		ret.put("retMSG", "查询任务成功");
		return "success";
	}

	public String updateH5Task() {
		H5Task mt = h5StressService.findH5TaskById(taskid);

		if (mt == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该监控任务不存在");
			return "success";
		}

		mt.setName(name);
		mt.setUrl(url);
		// DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		// mt.setTime(df.format(new Date()));
		h5StressService.updateH5Task(mt);

		ret.put("retCode", "1000");
		ret.put("retMSG", "更新任务成功");
		return "success";
	}

	// H5Record
	public String createH5Record() {

		User user = userService.findUserById(creatorid);
		if (user == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "创建人不存在");
			return "success";
		}

		H5Task task = h5StressService.findH5TaskById(taskid);
		if (task == null) {
			ret.put("retCode", "1002");
			ret.put("retMSG", "Task不存在");
			return "success";
		}

		H5Machine machine = h5StressService.findH5MachineByIp(ip);
		if (machine == null) {
			ret.put("retCode", "1003");
			ret.put("retMSG", "Machine不存在");
			return "success";
		}

		if (h5StressService.checkDeviceExecutable(machine.getId(), device)) {

			H5Record h5Record = new H5Record();

			h5Record.setH5Task(task);
			h5Record.setH5Machine(machine);
			h5Record.setCreator(user);
			h5Record.setDevice(device);
			h5Record.setDel(0);

			DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			h5Record.setTime(df.format(new Date()));

			int newrecordid = h5StressService.saveH5Record(h5Record);

			String returnstr;
			try {
				returnstr = exec(ip, String.valueOf(newrecordid),
						task.getUrl(), device);

				H5Record record = h5StressService.findH5RecordById(newrecordid);

				Integer returncode = (Integer) JSONObject.fromObject(returnstr)
						.get("code");

				if (returncode != 200) {
					ret.put("retCode", "1001");
					ret.put("retMSG", "创建H5性能测试记录成功,发送执行指令失败，返回msg:"
							+ JSONObject.fromObject(returnstr).get("msg"));
					record.setStatus(-1);

				} else {
					ret.put("retCode", "1000");
					ret.put("retMSG", "创建H5性能测试记录成功,发送执行指令成功！");
					record.setStatus(1);
				}

				h5StressService.saveH5Record(record);

			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				logger.info("createH5Record() error:" + e.getLocalizedMessage());
				e.printStackTrace();
			}
		} else {
			ret.put("retCode", "1002");
			ret.put("retMSG", "设备" + ip + "-" + device + "被占用");
		}

		return "success";
	}

	public String findH5RecordById() {
		H5Record st = h5StressService.findH5RecordById(recordid);

		if (st == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该任务不存在");
			return "success";
		}

		ret.put("h5record", st);
		ret.put("retCode", "1000");
		ret.put("retMSG", "查询任务成功");
		return "success";
	}

	public String updateH5Record() {
		H5Record mt = h5StressService.findH5RecordById(recordid);

		if (mt == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该监控任务不存在");
			return "success";
		}

		mt.setStatus(status);

		// DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		// mt.setTime(df.format(new Date()));

		h5StressService.updateH5Record(mt);

		ret.put("retCode", "1000");
		ret.put("retMSG", "更新任务成功");
		return "success";
	}
	
	public String clearDevice() {
		h5StressService.clearDevice();

		ret.put("retCode", "1000");
		ret.put("retMSG", "更新任务成功");
		return "success";
	}	

	// H5Result
	public String findH5ResultByRecordId() {
		List<H5Result> st = h5StressService.findH5ResultsByRecordId(recordid);

		ret.put("h5result", st);
		ret.put("retCode", "1000");
		ret.put("retMSG", "查询任务成功");
		return "success";
	}

	public String findH5DomainResultsByRecordId() {
		List<H5DomainResult> st = h5StressService
				.findH5DomainResultsByRecordId(recordid);

		ret.put("H5DomainResults", st);
		ret.put("retCode", "1000");
		ret.put("retMSG", "查询任务成功");
		return "success";
	}

	public String findH5ResourceResultsByRecordId() {
		List<H5ResourceResult> st = h5StressService
				.findH5ResourceResultsByRecordId(recordid);

		ret.put("H5ResourceResults", st);
		ret.put("retCode", "1000");
		ret.put("retMSG", "查询任务成功");
		return "success";
	}

	public String findH5ImageResultsByRecordId() {
		List<H5OriginalSource> st = h5StressService
				.findH5OriginalSourcesByRecordIdAndType(recordid, "image");

		ret.put("H5ImageResults", st);
		ret.put("retCode", "1000");
		ret.put("retMSG", "查询任务成功");
		return "success";
	}

	public String findH5DeviceInfoByRecordId() {
		List<H5DeviceInfo> st = h5StressService
				.findH5DeviceInfosByRecordId(recordid);

		ret.put("H5DeviceInfo", st.get(0));
		ret.put("retCode", "1000");
		ret.put("retMSG", "查询任务成功");
		return "success";
	}

	// api for H5 machine
	public String getDeviceList() {
		List<H5Machine> st = h5StressService.findAllH5Machines();
		List deviceList = new ArrayList<String[]>();

		for (H5Machine h5Machine : st) {
			HttpRequest httpRequest = new HttpRequest();
			String s1 = httpRequest.sendGet("http://" + h5Machine.getIp()
					+ ":8080/status", "");
			JSONArray jsonarray = JSONArray.fromObject(JSONObject
					.fromObject("devicelist"));

			Iterator<Object> it = jsonarray.iterator();
			while (it.hasNext()) {
				String ob = (String) it.next();
				String info[] = { h5Machine.getIp(), ob };
				deviceList.add(info);
			}
		}

		ret.put("deviceList", deviceList);
		ret.put("retCode", "1000");
		ret.put("retMSG", "查询任务成功");
		return "success";
	}

	public String getExecutableDeviceList() {
		List<H5Machine> st = h5StressService.findAllH5Machines();
		List deviceList = new ArrayList<String[]>();

		List<H5Record> runningRecords = h5StressService
				.findRunningH5RecordsByTaskId(taskid);

		for (H5Machine h5Machine : st) {
			HttpRequest httpRequest = new HttpRequest();
			String s1 = httpRequest.sendGet("http://" + h5Machine.getIp()
					+ ":8080/status", "");

			if (s1 != null && !s1.equals("")) {
				String returnStr = s1;
				String code = (String) JSONObject.fromObject(returnStr)
						.getString("code");

				if (code.equals("200")) {
					JSONArray jsonarray = JSONArray.fromObject(JSONObject
							.fromObject(returnStr).getString("devicelist"));

					Iterator<Object> it = jsonarray.iterator();
					while (it.hasNext()) {
						String ob = (String) it.next();

						if (!isDeviceRunning(runningRecords, h5Machine, device)) {
							String info[] = { h5Machine.getIp(), ob };
							deviceList.add(info);
						}
					}
				}
			}
		}

		ret.put("deviceList", deviceList);
		ret.put("retCode", "1000");
		ret.put("retMSG", "查询任务成功");
		return "success";
	}

	private boolean isDeviceRunning(List<H5Record> runningRecords,
			H5Machine h5Machine, String device) {
		for (H5Record h5Record : runningRecords) {
			if (h5Record.getH5Machine().getId().equals(h5Machine.getId())
					&& h5Record.getDevice().equals(device))
				return true;
		}

		return false;
	}

	public String exec(String ip, String id, String url, String device)
			throws UnsupportedEncodingException {
		HttpRequest httpRequest = new HttpRequest();

		id = URLEncoder.encode(id, "UTF-8");
		url = URLEncoder.encode(url, "UTF-8");
		device = URLEncoder.encode(device, "UTF-8");

		String param = "id=" + id + "&url=" + url + "&device=" + device;

		return httpRequest.sendGet("http://" + ip + ":8080/exec", param);
		
//		String param="{\"id\":"+id+",\"url\":"+url+",\"device\":"+device+"}";
//		
//		return httpRequest.sendPost("http://" + ip + ":8080/exec", param);

	}
	
	public String getHar(String ip, int id)
			throws UnsupportedEncodingException {
		HttpRequest httpRequest = new HttpRequest();

//		id = URLEncoder.encode(id, "UTF-8");
//		url = URLEncoder.encode(url, "UTF-8");
//		device = URLEncoder.encode(device, "UTF-8");

		String param = "taskid=" + id ;

		return httpRequest.sendGet("http://" + ip + ":8080/gethar", param);
		
//		String param="{\"id\":"+id+",\"url\":"+url+",\"device\":"+device+"}";
//		
//		return httpRequest.sendPost("http://" + ip + ":8080/exec", param);

	}
	
	public static void main(String[] args) {
		try {
			System.out.print(new H5StressAction().getHar("172.16.13.21",18));
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public String h5callback() {
		
try {

			HttpServletRequest request = ServletActionContext.getRequest();

			ServletInputStream input = request.getInputStream();
			BufferedReader reader = new BufferedReader(new InputStreamReader(
					input, "UTF-8"));
			StringBuilder sb = new StringBuilder();
			String line = null;
			try {
				while ((line = reader.readLine()) != null) {
					sb.append(line);
				}
			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				input.close();
			}

			String returnStr = sb.toString();

			int recordId = Integer.parseInt(JSONObject.fromObject(returnStr)
					.getString("RecordId"));

			H5Record record = h5StressService.findH5RecordById(recordId);
			try {
			if (record == null) {
				ret.put("retCode", "1001");
				ret.put("retMSG", "该Record不存在");
				return "success";
			}

			if (record.getStatus() == 3) {
				ret.put("retCode", "1003");
				ret.put("retMSG", "h5callback失败! 该Record结果已经入库。");

				return "success";
			}

			Boolean success = Boolean.parseBoolean(JSONObject.fromObject(
					returnStr).getString("Success"));
			JSONObject monitorInfo = JSONObject.fromObject(JSONObject
					.fromObject(returnStr).getString("MonitorInfo"));
			JSONObject systemInfo = JSONObject.fromObject(JSONObject
					.fromObject(returnStr).getString("SystemInfo"));
			JSONObject harInfo = JSONObject.fromObject(JSONObject.fromObject(
					returnStr).getString("HarInfo"));

			int httpnum = 0;
			int totalsize = 0;
			int redirectnum = 0;
			int failnum = 0;

			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			SimpleDateFormat sdf = new SimpleDateFormat(
					"yyyy-MM-dd'T'HH:mm:ss.SSS");

			if (success) {
				H5Result result = new H5Result();
				result.setH5Record(record);

				if (monitorInfo.has("LastOnLoadResource")) {
					result.setLastOnLoadResource(monitorInfo
							.getString("LastOnLoadResource"));
				}

				if (monitorInfo.has("WebViewloadurl")) {
					result.setWebViewloadurl(monitorInfo
							.getString("WebViewloadurl"));
				}

				if (monitorInfo.has("onPageFinished")) {
					result.setOnPageFinished(monitorInfo
							.getString("onPageFinished"));
				}

				if (monitorInfo.has("load")) {
					result.setLoadTime(monitorInfo.getString("load"));
				}

				if (monitorInfo.has("FristOnLoadResource")) {
					result.setFristOnLoadResource(monitorInfo
							.getString("FristOnLoadResource"));
				}

				if (monitorInfo.has("DOMContentLoaded")) {
					result.setDomContentLoaded(monitorInfo
							.getString("DOMContentLoaded"));
				}

				if (monitorInfo.has("FristOnPageStarted")) {
					result.setFristOnPageStarted(monitorInfo
							.getString("FristOnPageStarted"));
				}

				if (monitorInfo.has("FristOnReceivedTitle")) {
					result.setFristOnReceivedTitle(monitorInfo
							.getString("FristOnReceivedTitle"));
				}

				if (monitorInfo.has("FristOnLoadMedia")) {
					result.setFristOnLoadMedia(monitorInfo
							.getString("FristOnLoadMedia"));
				}

				H5DeviceInfo deviceInfo = new H5DeviceInfo();
				deviceInfo.setH5Record(record);

				if (systemInfo.has("FINGERPRINT")) {
					deviceInfo.setFingerprint(systemInfo
							.getString("FINGERPRINT"));
				}
				if (systemInfo.has("USER")) {
					deviceInfo.setUser(systemInfo.getString("USER"));
				}
				if (systemInfo.has("BRAND")) {
					deviceInfo.setBrand(systemInfo.getString("BRAND"));
				}
				if (systemInfo.has("BOARD")) {
					deviceInfo.setBoard(systemInfo.getString("BOARD"));
				}
				if (systemInfo.has("Product")) {
					deviceInfo.setProduct(systemInfo.getString("Product"));
				}
				if (systemInfo.has("TAGS")) {
					deviceInfo.setTags(systemInfo.getString("TAGS"));
				}
				if (systemInfo.has("DEVICE")) {
					deviceInfo.setDevice(systemInfo.getString("DEVICE"));
				}
				if (systemInfo.has("MODEL")) {
					deviceInfo.setModel(systemInfo.getString("MODEL"));
				}
				if (systemInfo.has("DISPLAY")) {
					deviceInfo.setDisplay(systemInfo.getString("DISPLAY"));
				}
				if (systemInfo.has("CPU_ABI")) {
					deviceInfo.setCpu_abi(systemInfo.getString("CPU_ABI"));
				}
				if (systemInfo.has("SDK")) {
					deviceInfo.setSdk(systemInfo.getString("SDK"));
				}
				if (systemInfo.has("VERSION.RELEASE")) {
					deviceInfo.setVersion(systemInfo
							.getString("VERSION.RELEASE"));
				}
				if (systemInfo.has("ID")) {
					deviceInfo.setDeviceid(systemInfo.getString("ID"));
				}
				if (systemInfo.has("VERSION_CODES.BASE")) {
					deviceInfo.setVersion_codes(systemInfo
							.getString("VERSION_CODES.BASE"));
				}
				if (systemInfo.has("Resolution")) {
					deviceInfo
							.setResolution(systemInfo.getString("Resolution"));
				}

				// 数据库保存H5OriginalSource
				h5StressService.saveH5DeviceInfo(deviceInfo);

				JSONArray entities = JSONArray.fromObject(harInfo
						.getString("entries"));

				Iterator<Object> it = entities.iterator();
				while (it.hasNext()) {

					JSONObject entity = JSONObject.fromObject(it.next());
					H5OriginalSource source = new H5OriginalSource();

					// 原始数据
					source.setH5Record(record);

					if (entity.has("method")) {
						source.setMethod(entity.getString("method"));
					}
					if (entity.has("size")) {
						source.setSize(Integer.parseInt(entity
								.getString("size")));
					}
					if (entity.has("responsesize")) {
						source.setResponsesize(Integer.parseInt(entity
								.getString("responsesize")));
					}
					if (entity.has("mimetype")) {
						source.setMimetype(entity.getString("mimetype"));
					}
					if (entity.has("starttime")) {
						source.setStartTime(entity.getString("starttime"));
					}
					if (entity.has("time")) {
						source.setTime(Integer.parseInt(entity
								.getString("time")));
					}
					if (entity.has("compression")) {
						source.setCompression(Integer.parseInt(entity
								.getString("compression")));
					}
					if (entity.has("url")) {
						source.setUrl(entity.getString("url"));
					}
					if (entity.has("code")) {
						source.setStatus(entity.getString("code"));
					}
					if (entity.has("encoding")) {
						source.setEncoding(entity.getString("encoding"));
					}

					source.setCreateTime(df.format(new Date()));

					// 处理后的数据
					// host
					String url = entity.getString("url");
					url = url.replace("//", "/");
					String urlarr[] = url.split("/");
					source.setHost(urlarr[1]);

					// endtime					
					Date startDate = sdf.parse(entity.getString("starttime"));
					Date endDate = new Date(startDate.getTime()
							+ Integer.parseInt(entity.getString("time")));

					source.setEndTime(sdf.format(endDate));

					// type
					String mimetype = entity.getString("mimetype");

					if (mimetype.startsWith("image")) {
						source.setType("image");

					} else {

						if (mimetype.indexOf("javascript") >= 0) {
							source.setType("js");
						} else {
							if (mimetype.startsWith("text")) {
								source.setType(mimetype.substring(
										mimetype.indexOf("/") + 1,
										mimetype.length()));
							} else {
								source.setType(mimetype);
							}
						}
					}
					// num
					httpnum++;
					totalsize += Integer.parseInt(entity.getString("size"));
					String status = entity.getString("code");
					if (status.equals("301")) {
						redirectnum++;
					} else {
						if (status.startsWith("40")) {
							failnum++;
						}
					}

					// 数据库保存H5OriginalSource
					h5StressService.saveH5OriginalSource(source);
				}

				// H5DomainResult
				List<Map> domainResultsList = h5StressService
						.getDomainResultByRecordId(recordId);

				for (Map map : domainResultsList) {
					H5DomainResult domainResult = new H5DomainResult();

					domainResult.setH5Record(record);
					domainResult.setName(map.get("name").toString());
					
					 float   f   =  Float.parseFloat(map.get("size")
								.toString()) / 1024;  
					 BigDecimal   b  =   new BigDecimal(f);  
					 float   f1   =  b.setScale(2, BigDecimal.ROUND_HALF_UP).floatValue();  

					domainResult.setSize(f1);
					domainResult.setNum(Integer.parseInt(map.get("num")
							.toString()));
					domainResult.setTime(df.format(new Date()));

					h5StressService.saveH5DomainResult(domainResult);
				}

				// H5ResourceResult
				List<Map> resourceResultsList = h5StressService
						.getResourceResultByRecordId(recordId);

				for (Map map : resourceResultsList) {
					H5ResourceResult resourceResult = new H5ResourceResult();

					resourceResult.setH5Record(record);
					resourceResult.setName(map.get("name").toString());
					
					 float   f   =  Float.parseFloat(map.get("size")
								.toString()) / 1024;  
					 BigDecimal   b  =   new BigDecimal(f);  
					 float   f1   =  b.setScale(2, BigDecimal.ROUND_HALF_UP).floatValue();  

					resourceResult.setSize(f1);
					resourceResult.setNum(Integer.parseInt(map.get("num")
							.toString()));
					resourceResult.setTime(df.format(new Date()));

					h5StressService.saveH5ResourceResult(resourceResult);
				}

				// H5Result统计信息
				Date webViewloadurl = null;
				if(result.getWebViewloadurl()!=null)
				{
				 webViewloadurl = sdf.parse(result.getWebViewloadurl());
				}
				
				Date fristOnLoadResource =null;
				if(result.getFristOnLoadResource()!=null)
				{
					fristOnLoadResource = sdf.parse(result.getFristOnLoadResource());
				}
				
				Date fristOnReceivedTitle =null;
				if(result.getFristOnReceivedTitle()!=null)
				{
				 fristOnReceivedTitle = sdf.parse(result.getFristOnReceivedTitle());
				}
				
				Date DOMContentLoaded = null;
				if(result.getDomContentLoaded()!=null)
				{
					DOMContentLoaded = sdf.parse(result.getDomContentLoaded());
				}
				
				Date onPageFinished = null;
				if(result.getOnPageFinished()!=null)
				{
					onPageFinished = sdf.parse(result.getOnPageFinished());
				}
				
				Date load = null;
				if(result.getLoadTime()!=null)
				{
					load = sdf.parse(result.getLoadTime());
				}
				
				if(fristOnLoadResource!=null)
				{
					result.setFirstTime((float)(Math.round((fristOnLoadResource.getTime()-webViewloadurl.getTime())/10)/100.0));
				}
				
				if(fristOnReceivedTitle!=null)
				{
					result.setBlackTime((float)(Math.round((fristOnReceivedTitle.getTime()-webViewloadurl.getTime())/10)/100.0));
				}
				
				if(DOMContentLoaded!=null)
				{
					result.setDomTime((float)(Math.round((DOMContentLoaded.getTime()-webViewloadurl.getTime())/10)/100.0));
				}
				else {
					result.setDomTime(0);
				}
				
				if(onPageFinished!=null)
				{
					result.setAllTime((float)(Math.round((onPageFinished.getTime()-webViewloadurl.getTime())/10)/100.0));
				}
				else {
					result.setAllTime(0);
				}
				
				if(load!=null)
				{
					result.setOnloadTime((float)(Math.round((load.getTime()-webViewloadurl.getTime())/10)/100.0));
				}
				result.setHttpNum(httpnum);
				result.setPageSize((float)(Math.round((totalsize*100)/(1024*1024))/100.0));
				result.setRedirectNum(redirectnum);
				result.setDomainNum(domainResultsList.size());
				result.setFailNum(failnum);
				result.setTime(df.format(new Date()));

				h5StressService.saveH5Result(result);

				record.setStatus(3);
				h5StressService.saveH5Record(record);
				
				String jsonString = getHar(record.getH5Machine().getIp(),record.getId());
		
				File file = new File(BetterPropertyUtil.getValue("harlocation")+record.getId()+".har");

				   // if file doesnt exists, then create it
				   if (!file.exists()) {
				    file.createNewFile();
				   }

				   FileWriter fw = new FileWriter(file.getAbsoluteFile());
				   BufferedWriter bw = new BufferedWriter(fw);
				   bw.write(jsonString);
				   bw.close();	
				   
				   File fileBak = new File(BetterPropertyUtil.getValue("harbaklocation")+record.getId()+".har");

				   // if file doesnt exists, then create it
				   if (!fileBak.exists()) {
					   fileBak.createNewFile();
				   }

				   FileWriter fwBak = new FileWriter(fileBak.getAbsoluteFile());
				   BufferedWriter bwBak = new BufferedWriter(fwBak);
				   bwBak.write(jsonString);
				   bwBak.close();	
				    
			} else {
				// 运行失败
				record.setStatus(-2);
				h5StressService.saveH5Record(record);
			}

			ret.put("retCode", "1000");
			ret.put("retMSG", "h5callback成功");

		} catch (Exception e) {
			ret.put("retCode", "1002");
			ret.put("retMSG",
					"h5callback失败! ErrorMessage:" + e.getLocalizedMessage());
			record.setStatus(4);
			h5StressService.saveH5Record(record);
		}
			
		} catch (Exception e) {
			ret.put("retCode", "1002");
			ret.put("retMSG",
					"h5callback失败! ErrorMessage:" + e.getLocalizedMessage());
				}
		return "success";
	}

	public Integer getCreatorid() {
		return creatorid;
	}

	public void setCreatorid(Integer creatorid) {
		this.creatorid = creatorid;
	}

	public Integer getTaskid() {
		return taskid;
	}

	public void setTaskid(Integer taskid) {
		this.taskid = taskid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public Integer getRecordid() {
		return recordid;
	}

	public void setRecordid(Integer recordid) {
		this.recordid = recordid;
	}

	public Integer getMachineId() {
		return machineId;
	}

	public void setMachineId(Integer machineId) {
		this.machineId = machineId;
	}

	public String getDevice() {
		return device;
	}

	public void setDevice(String device) {
		this.device = device;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public Integer getPagesize() {
		return pagesize;
	}

	public void setPagesize(Integer pagesize) {
		this.pagesize = pagesize;
	}

	public Integer getPageindex() {
		return pageindex;
	}

	public void setPageindex(Integer pageindex) {
		this.pageindex = pageindex;
	}

	public String getTaskId() {
		return TaskId;
	}

	public void setTaskId(String taskId) {
		TaskId = taskId;
	}

	public Boolean getSuccess() {
		return Success;
	}

	public void setSuccess(Boolean success) {
		Success = success;
	}

	public List<String> getMonitorInfo() {
		return MonitorInfo;
	}

	public void setMonitorInfo(List<String> monitorInfo) {
		MonitorInfo = monitorInfo;
	}

	public List<String> getSystemInfo() {
		return SystemInfo;
	}

	public void setSystemInfo(List<String> systemInfo) {
		SystemInfo = systemInfo;
	}

	public JSONObject getHarInfo() {
		return HarInfo;
	}

	public void setHarInfo(JSONObject harInfo) {
		HarInfo = harInfo;
	}

	public JSONObject getRet() {
		return ret;
	}

	public void setRet(JSONObject ret) {
		this.ret = ret;
	}

}
