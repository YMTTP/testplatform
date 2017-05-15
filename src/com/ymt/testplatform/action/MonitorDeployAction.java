package com.ymt.testplatform.action;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import javax.annotation.Resource;

import org.springframework.stereotype.Controller;

import com.ymt.testplatform.entity.MonitorDeploy;
import com.ymt.testplatform.entity.MonitorDeployInfo;
import com.ymt.testplatform.entity.VmInfo;
import com.ymt.testplatform.service.environment.EnvironmentService;
import com.ymt.testplatform.service.monitor.MonitorDeployService;
import com.ymt.testplatform.service.monitor.impl.DeployService;
import com.ymt.testplatform.util.HttpRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@Controller
public class MonitorDeployAction {

	private String type;
	private String envType;

	private Integer pagesize;
	private Integer pageindex;

	private String ip;
	private String status1;
	private String version1;
	private String status2;
	private String version2;
	private String os;

	private JSONObject ret = new JSONObject();

	@Resource
	private MonitorDeployService monitorDeployService;
	@Resource
	private EnvironmentService environmentService;
	@Resource
	private DeployService deployService;

	// public String Test() {
	// ret.put("retCode", "1000");
	// ret.put("retMSG", "连接正常");
	// return "success";
	// }

	public String listDeployVmInfosByPageByEnvType() {

		HashMap<String, Object> conditions = new HashMap<String, Object>();

		if (this.type != null && !this.type.equals("")) {
			conditions.put("type", this.type);
		}

		List<MonitorDeployInfo> vms = monitorDeployService.findAllVmInfos(
				pageindex, pagesize, conditions, envType);

		Long pageNum = monitorDeployService.findAllVmInfoPages(pagesize,
				conditions, envType);

		JSONArray ja = JSONArray.fromObject(vms);

		ret.put("vms", ja);
		ret.put("pagenum", pageNum);
		ret.put("retCode", "1000");
		ret.put("retMSG", "操作成功");
		return "success";
	}

	public String updateMonitorStatus() {

		updateMonitorStatusInter(ip, status1);

		ret.put("retCode", "1000");
		ret.put("retMSG", "操作成功");
		return "success";
	}

	private void updateMonitorStatusInter(String ip, String status1) {

		VmInfo vmInfo = environmentService.findVmInfoByIp(ip);

		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String dateString = formatter.format(new Date());

		List<MonitorDeploy> monitorDeploys = monitorDeployService
				.findMonitorDeployByVmId(vmInfo.getId());
		if (monitorDeploys.size() > 0) {
			MonitorDeploy monitorDeploy = monitorDeploys.get(0);
			monitorDeploy.setClientOn(status1.equals("ok"));
			monitorDeploy.setTime(dateString);

			monitorDeployService.updateMonitorDeploy(monitorDeploy);
		} else {
			MonitorDeploy monitorDeploy = new MonitorDeploy();
			monitorDeploy.setVmInfo(vmInfo);
			monitorDeploy.setClientOn(status1.equals("ok"));
			monitorDeploy.setTime(dateString);

			monitorDeployService.saveMonitorDeploy(monitorDeploy);
		}
	}

	public String updateClientSetupStatus() {

		updateClientSetupStatusInter(ip, status2);

		ret.put("retCode", "1000");
		ret.put("retMSG", "操作成功");
		return "success";
	}

	private void updateClientSetupStatusInter(String ip, String status2) {
		VmInfo vmInfo = environmentService.findVmInfoByIp(ip);

		List<MonitorDeploy> monitorDeploys = monitorDeployService
				.findMonitorDeployByVmId(vmInfo.getId());
		if (monitorDeploys.size() > 0) {
			MonitorDeploy monitorDeploy = monitorDeploys.get(0);
			monitorDeploy.setSetupOn(status2.equals("ok"));

			monitorDeployService.updateMonitorDeploy(monitorDeploy);
		} else {
			MonitorDeploy monitorDeploy = new MonitorDeploy();
			monitorDeploy.setVmInfo(vmInfo);
			monitorDeploy.setSetupOn(status2.equals("ok"));

			monitorDeployService.saveMonitorDeploy(monitorDeploy);
		}

	}

	public String updateMonitorVersion() {

		updateMonitorVersionInter(ip, version1);

		ret.put("retCode", "1000");
		ret.put("retMSG", "操作成功");
		return "success";
	}

	private void updateMonitorVersionInter(String ip, String version1) {
		VmInfo vmInfo = environmentService.findVmInfoByIp(ip);

		List<MonitorDeploy> monitorDeploys = monitorDeployService
				.findMonitorDeployByVmId(vmInfo.getId());
		if (monitorDeploys.size() > 0) {
			MonitorDeploy monitorDeploy = monitorDeploys.get(0);
			monitorDeploy.setVersion(version1);

			monitorDeployService.updateMonitorDeploy(monitorDeploy);
		} else {
			MonitorDeploy monitorDeploy = new MonitorDeploy();
			monitorDeploy.setVmInfo(vmInfo);
			monitorDeploy.setVersion(version1);

			monitorDeployService.saveMonitorDeploy(monitorDeploy);
		}
	}

	public String updateClientSetupVersion() {

		updateClientSetupVersionInter(ip, version2);

		ret.put("retCode", "1000");
		ret.put("retMSG", "操作成功");
		return "success";
	}

	private void updateClientSetupVersionInter(String ip, String version2) {
		VmInfo vmInfo = environmentService.findVmInfoByIp(ip);

		List<MonitorDeploy> monitorDeploys = monitorDeployService
				.findMonitorDeployByVmId(vmInfo.getId());
		if (monitorDeploys.size() > 0) {
			MonitorDeploy monitorDeploy = monitorDeploys.get(0);
			monitorDeploy.setSetupVersion(version2);

			monitorDeployService.updateMonitorDeploy(monitorDeploy);
		} else {
			MonitorDeploy monitorDeploy = new MonitorDeploy();
			monitorDeploy.setVmInfo(vmInfo);
			monitorDeploy.setSetupVersion(version2);

			monitorDeployService.saveMonitorDeploy(monitorDeploy);
		}
	}

	public String deploy() {
		String restr = "fail";
		try {
			if (os.equals("Centos")) {
				restr = deployService.DeployEnvAgency(ip);

				if (restr.equals("ok")) {
					HttpRequest httpRequest = new HttpRequest();
					String s1 = httpRequest.sendGet("http://" + ip
							+ ":8034/Deploy/Version", "");
					int flag1 = 0;
					while (flag1 < 20 && s1.equals("")) {
						flag1++;
						Thread.sleep(1000);
						s1 = httpRequest.sendGet("http://" + ip
								+ ":8034/Deploy/Version", "");
					}
					String version1 = httpRequest.getData(s1);

					String s2 = httpRequest.sendGet("http://" + ip
							+ ":8035/Deploy/Version", "");
					int flag2 = 0;
					while (flag2 < 40 && s2.equals("")) {
						flag2++;
						Thread.sleep(2000);
						s2 = httpRequest.sendGet("http://" + ip
								+ ":8035/Deploy/Version", "");
					}
					String version2 = httpRequest.getData(s2);

					VmInfo vmInfo = environmentService.findVmInfoByIp(ip);

					List<MonitorDeploy> monitorDeploys = monitorDeployService
							.findMonitorDeployByVmId(vmInfo.getId());

					SimpleDateFormat formatter = new SimpleDateFormat(
							"yyyy-MM-dd HH:mm:ss");
					String dateString = formatter.format(new Date());

					if (monitorDeploys.size() > 0) {
						MonitorDeploy monitorDeploy = monitorDeploys.get(0);
						monitorDeploy.setVersion(version1);
						monitorDeploy.setSetupVersion(version2);
						monitorDeploy.setClientOn(true);
						monitorDeploy.setSetupOn(true);
						monitorDeploy.setTime(dateString);

						monitorDeployService.updateMonitorDeploy(monitorDeploy);
					} else {
						MonitorDeploy monitorDeploy = new MonitorDeploy();
						monitorDeploy.setVmInfo(vmInfo);
						monitorDeploy.setVersion(version1);
						monitorDeploy.setSetupVersion(version2);
						monitorDeploy.setClientOn(true);
						monitorDeploy.setSetupOn(true);
						monitorDeploy.setTime(dateString);

						monitorDeployService.saveMonitorDeploy(monitorDeploy);
					}
				}
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			ret.put("retMSG", e.getMessage());
			e.printStackTrace();
		}

		ret.put("retCode", restr);
		ret.put("retMSG", "操作成功");
		return "success";
	}

	public String kill() {
		String restr = "fail";
		try {
			if (os.equals("Centos")) {
				restr = deployService.killClient(ip);
			}

		} catch (Exception e) {
			// TODO Auto-generated catch block
			ret.put("retMSG", e.getMessage());
			e.printStackTrace();
		}

		ret.put("retCode", restr);
		ret.put("retMSG", "操作成功");
		return "success";
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getEnvType() {
		return envType;
	}

	public void setEnvType(String envType) {
		this.envType = envType;
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

	public JSONObject getRet() {
		return ret;
	}

	public void setRet(JSONObject ret) {
		this.ret = ret;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public String getStatus1() {
		return status1;
	}

	public void setStatus1(String status1) {
		this.status1 = status1;
	}

	public String getVersion1() {
		return version1;
	}

	public void setVersion1(String version1) {
		this.version1 = version1;
	}

	public String getStatus2() {
		return status2;
	}

	public void setStatus2(String status2) {
		this.status2 = status2;
	}

	public String getVersion2() {
		return version2;
	}

	public void setVersion2(String version2) {
		this.version2 = version2;
	}

	public String getOs() {
		return os;
	}

	public void setOs(String os) {
		this.os = os;
	}

}
