package com.ymt.testplatform.action;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionSupport;
import com.ymt.testplatform.entity.Department;
import com.ymt.testplatform.service.department.DepartmentService;



@Controller
public class DepartmentAction extends ActionSupport {

	private static final long serialVersionUID = 1L;

	@Resource
	private DepartmentService departmentService;

	private Integer departmentid;
	private Department department;
	private String name;
	private List<Department> departments;
	private String retCode;
	private String retMSG;
	private JSONObject ret = new JSONObject();

	public String createDepartment(){
		
		Department dep = new Department();
		
		dep.setName(name);
		dep.setDel(0);
		
		departmentService.saveDepartment(dep);
		this.setRetMSG("创建部门成功");
		this.setRetCode("1000");
		return "success";
	}
	
	public String deleteDepartment(){
		Department dep = departmentService.findDepartmentById(departmentid);
		
		if (dep == null) {
			this.setRetMSG("该部门不存在");
			this.setRetCode("1001");
			return "success";
		}
		
		dep.setDel(1);
		departmentService.saveDepartment(dep);
		this.setRetMSG("删除部门成功");
		this.setRetCode("1000");
		return "success";
	}
	
	public String findDepartmentById(){
		Department dep = departmentService.findDepartmentById(departmentid);
		
		if (dep == null) {
			this.setRetMSG("该部门不存在");
			this.setRetCode("1001");
			return "success";
		}
		this.setDepartment(dep);
		this.setRetMSG("查询部门成功");
		this.setRetCode("1000");
		return "success";
	}
	
	public String updateDepartment() {
		Department dep = departmentService.findDepartmentById(departmentid);
		
		if (dep == null) {
			this.setRetMSG("该部门不存在");
			this.setRetCode("1001");
			return "success";
		}
		
		dep.setName(name);
		
		departmentService.updateDepartment(dep);
		
		this.setRetMSG("部门更新成功");
		this.setRetCode("1000");
		return "success";
	}

	public String listDepartments() {	
		List<Department> deps = new ArrayList<Department>();
		deps = departmentService.findAllDepartments();
		ret.put("deps", deps);
		ret.put("retCode", "1000");
		ret.put("retMSG", "操作成功");
		return "success";
	}

	public String getRetMSG() {
		return retMSG;
	}

	public void setRetMSG(String retMSG) {
		this.retMSG = retMSG;
	}

	public String getRetCode() {
		return retCode;
	}

	public void setRetCode(String retCode) {
		this.retCode = retCode;
	}

	

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getDepartmentid() {
		return departmentid;
	}

	public void setDepartmentid(Integer departmentid) {
		this.departmentid = departmentid;
	}

	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}

	public List<Department> getDepartments() {
		return departments;
	}

	public void setDepartments(List<Department> departments) {
		this.departments = departments;
	}

	public JSONObject getRet() {
		return ret;
	}

	public void setRet(JSONObject ret) {
		this.ret = ret;
	}

	


}
