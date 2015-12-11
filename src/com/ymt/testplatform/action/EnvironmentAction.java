package com.ymt.testplatform.action;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionSupport;
import com.ymt.testplatform.entity.Env;
import com.ymt.testplatform.entity.ServerInfo;
import com.ymt.testplatform.entity.VmInfo;
import com.ymt.testplatform.service.environment.EnvironmentService;



@Controller
public class EnvironmentAction extends ActionSupport {

	private static final long serialVersionUID = 1L;

	@Resource
	private EnvironmentService environmentService;

	private Integer envid;
	private Env env;
	private String name;
	private String dns;
	private String remark;	
	private List<Env> envs;
	
	private Integer serverinfoid;
	private ServerInfo serverinfo;
	private String ip;
	private String cpu;
	private String ram;	
	private String harddrive;
	private List<ServerInfo> serverinfos;
	
	private Integer vminfoid;
	private VmInfo vminfo;
	private String os;
	private List<VmInfo> vminfos;
	
	private JSONObject ret = new JSONObject();;

	// Env
	public String createEnv(){
		
		Env e = new Env();
		
		e.setName(name);
		e.setDns(dns);
		e.setRemark(remark);
		e.setDel(0);
		
		environmentService.saveEnv(e);
		ret.put("retCode", "1000");
		ret.put("retMSG", "创建环境成功");
		return "success";
	}
	
	public String deleteEnv(){
		Env e = environmentService.findEnvById(envid);
		
		if (e == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该环境不存在");
			return "success";
		}
		
		e.setDel(1);
		environmentService.saveEnv(e);
		ret.put("retCode", "1000");
		ret.put("retMSG", "删除环境成功");
		return "success";
	}
	
	public String findEnvById(){
		Env e = environmentService.findEnvById(envid);
		
		if (e == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该环境不存在");
			return "success";
		}
		ret.put("env", e);
		ret.put("retCode", "1000");
		ret.put("retMSG", "查询环境成功");
		return "success";
	}
	
	public String updateEnv() {
		Env e = environmentService.findEnvById(envid);
		
		if (e == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该环境不存在");
			return "success";
		}

		e.setName(name);
		e.setDns(dns);
		e.setRemark(remark);
			
		environmentService.updateEnv(e);
		
		ret.put("retCode", "1000");
		ret.put("retMSG", "环境更新成功");
		return "success";
	}

	public String listEnvs() {	
		List<Env> es = new ArrayList<Env>();
		es = environmentService.findAllEnvs();
		JSONArray ja = JSONArray.fromObject(es);
		ret.put("envs", ja);
		ret.put("retCode", "1000");
		ret.put("retMSG", "操作成功");
		return "success";
	}


	// ServerInfo
	public String createServerInfo(){
		
		ServerInfo si = new ServerInfo();
		
		si.setCpu(cpu);
		si.setHarddrive(harddrive);
		si.setIp(ip);
		si.setRam(ram);
		si.setDel(0);
		
		environmentService.saveServerInfo(si);
		ret.put("retCode", "1000");
		ret.put("retMSG", "创建服务器成功");
		return "success";
	}
	
	public String deleteServerInfo(){
		ServerInfo si = environmentService.findServerInfoById(serverinfoid);
		
		if (si == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该服务器不存在");
			return "success";
		}
		
		si.setDel(1);
		environmentService.saveServerInfo(si);
		ret.put("retCode", "1000");
		ret.put("retMSG", "删除服务器成功");
		return "success";
	}
	
	public String findServerInfoById(){
		ServerInfo si = environmentService.findServerInfoById(serverinfoid);
		
		if (si == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该服务器不存在");
			return "success";
		}
		this.setServerinfo(si);
		ret.put("serverinfo", si);
		ret.put("retCode", "1000");
		ret.put("retMSG", "查询服务器成功");
		return "success";
	}
	
	public String updateServerInfo() {
		ServerInfo si = environmentService.findServerInfoById(serverinfoid);
		
		if (si == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该环境不存在");
			return "success";
		}
		
		si.setCpu(cpu);
		si.setHarddrive(harddrive);
		si.setIp(ip);
		si.setRam(ram);
		
		environmentService.updateServerInfo(si);

		ret.put("retCode", "1000");
		ret.put("retMSG", "服务器更新成功");
		return "success";
	}

	public String listServerInfos() {	
		List<ServerInfo> sis = new ArrayList<ServerInfo>();
		sis = environmentService.findAllServerInfos();
		JSONArray ja = JSONArray.fromObject(sis);
		ret.put("serverinfos", ja);
		ret.put("retCode", "1000");
		ret.put("retMSG", "操作成功");
		return "success";
	}
	
	// VmInfo
	public String createVmInfo(){
		VmInfo vi = environmentService.findVmInfoByName(name);
		
		if (vi != null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该虚拟机名称已存在");
			return "success";
		}
		
		
		vi = new VmInfo();
		
		vi.setCpu(cpu);
		vi.setHarddrive(harddrive);
		vi.setIp(ip);
		vi.setRam(ram);
		vi.setName(name);
		vi.setOs(os);
		if(serverinfoid!=null&&environmentService.findServerInfoById(serverinfoid)!=null){
			ServerInfo si = environmentService.findServerInfoById(serverinfoid);
			vi.setServerinfo(si);
		}
		
		vi.setDel(0);
		
		environmentService.saveVmInfo(vi);
		ret.put("retCode", "1000");
		ret.put("retMSG", "创建虚拟机成功");
		return "success";
	}
	
	public String deleteVmInfo(){
		VmInfo vi = environmentService.findVmInfoById(vminfoid);
		
		if (vi == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该虚拟机不存在");
			return "success";
		}
		
		vi.setDel(1);
		environmentService.saveVmInfo(vi);
		ret.put("retCode", "1000");
		ret.put("retMSG", "删除虚拟机成功");
		return "success";
	}
	
	public String findVmInfoById(){
		VmInfo vi = environmentService.findVmInfoById(vminfoid);
		
		if (vi == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该虚拟机不存在");
			return "success";
		}

		ret.put("vminfo", vi);
		ret.put("retCode", "1000");
		ret.put("retMSG", "查询虚拟机成功");
		return "success";
	}
	
	public String updateVmInfo() {
		VmInfo vi = environmentService.findVmInfoById(vminfoid);
		
		if (vi == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该虚拟机不存在");
			return "success";
		}
		
		vi.setCpu(cpu);
		vi.setHarddrive(harddrive);
		vi.setIp(ip);
		vi.setRam(ram);
		vi.setName(name);
		vi.setOs(os);
		if(serverinfoid!=null&&environmentService.findServerInfoById(serverinfoid)!=null){
			vi.setServerinfo(serverinfo);
		}
		
		environmentService.updateVmInfo(vi);

		ret.put("retCode", "1000");
		ret.put("retMSG", "虚拟机更新成功");
		return "success";
	}

	public String listVmInfos() {	
		List<VmInfo> vms = new ArrayList<VmInfo>();
		vms = environmentService.findAllVmInfos();
		JSONArray ja = JSONArray.fromObject(vms);
		ret.put("vms", ja);
		ret.put("retCode", "1000");
		ret.put("retMSG", "操作成功");
		return "success";
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getEnvid() {
		return envid;
	}

	public void setEnvid(Integer envid) {
		this.envid = envid;
	}

	public Env getEnv() {
		return env;
	}

	public void setEnv(Env env) {
		this.env = env;
	}

	public String getDns() {
		return dns;
	}

	public void setDns(String dns) {
		this.dns = dns;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public List<Env> getEnvs() {
		return envs;
	}

	public void setEnvs(List<Env> envs) {
		this.envs = envs;
	}

	public ServerInfo getServerinfo() {
		return serverinfo;
	}

	public void setServerinfo(ServerInfo serverinfo) {
		this.serverinfo = serverinfo;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public String getCpu() {
		return cpu;
	}

	public void setCpu(String cpu) {
		this.cpu = cpu;
	}

	public String getRam() {
		return ram;
	}

	public void setRam(String ram) {
		this.ram = ram;
	}

	public String getHarddrive() {
		return harddrive;
	}

	public void setHarddrive(String harddrive) {
		this.harddrive = harddrive;
	}

	public List<ServerInfo> getServerinfos() {
		return serverinfos;
	}

	public void setServerinfos(List<ServerInfo> serverinfos) {
		this.serverinfos = serverinfos;
	}

	public VmInfo getVminfo() {
		return vminfo;
	}

	public void setVminfo(VmInfo vminfo) {
		this.vminfo = vminfo;
	}

	public String getOs() {
		return os;
	}

	public void setOs(String os) {
		this.os = os;
	}

	public List<VmInfo> getVminfos() {
		return vminfos;
	}

	public void setVminfos(List<VmInfo> vminfos) {
		this.vminfos = vminfos;
	}

	public Integer getServerinfoid() {
		return serverinfoid;
	}

	public void setServerinfoid(Integer serverinfoid) {
		this.serverinfoid = serverinfoid;
	}

	public Integer getVminfoid() {
		return vminfoid;
	}

	public void setVminfoid(Integer vminfoid) {
		this.vminfoid = vminfoid;
	}

	public JSONObject getRet() {
		return ret;
	}

	public void setRet(JSONObject ret) {
		this.ret = ret;
	}

}
