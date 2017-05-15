package com.ymt.testplatform.action;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.ymt.testplatform.entity.MonitorDeployInfo;
import com.ymt.testplatform.entity.VmInfo;
import com.ymt.testplatform.service.Remote.VmManageService;
import com.ymt.testplatform.service.environment.EnvironmentService;
import com.ymt.testplatform.service.monitor.MonitorDeployService;

public class VmManageAction {
	private JSONObject ret = new JSONObject();

	private String type;
	private String envType;

	private Integer pagesize;
	private Integer pageindex;

	private String ip;
	private String os;

	@Resource
	private EnvironmentService environmentService;
	@Resource
	private VmManageService vmManageService;

	// public String Test() {
	// ret.put("retCode", "1000");
	// ret.put("retMSG", "连接正常");
	// return "success";
	// }

	public String listVmInfosByPageByEnvType() {

		HashMap<String, Object> conditions = new HashMap<String, Object>();

		if (this.type != null && !this.type.equals("")) {
			conditions.put("type", this.type);
		}

		List<VmInfo> vms = environmentService.findAllVmInfos(pageindex,
				pagesize, conditions, envType);

		Long pageNum = environmentService.findAllVmInfoPages(pagesize,
				conditions, envType);

		JSONArray ja = JSONArray.fromObject(vms);

		ret.put("vms", ja);
		ret.put("pagenum", pageNum);
		ret.put("retCode", "1000");
		ret.put("retMSG", "操作成功");
		return "success";
	}

	public String viewDate() {
		String restr = "fail";
		try {
			if (os.equals("Centos")) {
				restr = vmManageService.viewDate(ip);
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

	public String syncDate() {
		String restr = "fail";
		try {
			if (os.equals("Centos")) {
				restr = vmManageService.syncDate(ip);
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

	public String viewMemory() {
		String restr = "1";
		String result = "";
		try {
			if (os.equals("Centos")) {
				int data[] = vmManageService.viewMemory(ip);
				if (data.length > 0) {
					String res = "";
					for (int i : data) {
						res += i + ",";
					}
					restr="0";
					result = "[" + res.substring(0, res.length() - 1) + "]";
				}
			}

		} catch (Exception e) {
			// TODO Auto-generated catch block
			ret.put("retMSG", e.getMessage());
			e.printStackTrace();
		}

		ret.put("retCode", restr);
		ret.put("result", result);
		ret.put("retMSG", "操作成功");
		return "success";
	}

	public String viewDisk() {
		String restr = "1";
		String result = "";
		try {
			if (os.equals("Centos")) {
				int data[] = vmManageService.viewDisk(ip);
				if (data.length > 0) {
					String res = "";
					for (int i : data) {
						res += i + ",";
					}
					restr="0";
					result = "[" + res.substring(0, res.length() - 1) + "]";
				}
			}

		} catch (Exception e) {
			// TODO Auto-generated catch block
			ret.put("retMSG", e.getMessage());
			e.printStackTrace();
		}

		ret.put("retCode", restr);
		ret.put("result", result);
		ret.put("retMSG", "操作成功");
		return "success";
	}

	public JSONObject getRet() {
		return ret;
	}

	public void setRet(JSONObject ret) {
		this.ret = ret;
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

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public String getOs() {
		return os;
	}

	public void setOs(String os) {
		this.os = os;
	}

}
