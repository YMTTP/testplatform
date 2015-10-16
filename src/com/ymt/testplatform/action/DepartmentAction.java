package com.ymt.testplatform.action;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import net.sf.json.JSONArray;
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
	private JSONObject ret = new JSONObject();

	public String createDepartment(){
		
		Department dep = new Department();
		
		dep.setName(name);
		dep.setDel(0);
		
		departmentService.saveDepartment(dep);
		ret.put("retCode", "1000");
		ret.put("retMSG", "创建部门成功");
		return "success";
	}
	
	public String deleteDepartment(){
		Department dep = departmentService.findDepartmentById(departmentid);
		
		if (dep == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该部门不存在");
			return "success";
		}
		
		dep.setDel(1);
		departmentService.saveDepartment(dep);
		ret.put("retCode", "1000");
		ret.put("retMSG", "删除部门成功");
		return "success";
	}
	
	public String findDepartmentById(){
		Department dep = departmentService.findDepartmentById(departmentid);
		
		if (dep == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该部门不存在");
			return "success";
		}
		ret.put("dep", dep);
		ret.put("retCode", "1000");
		ret.put("retMSG", "查询部门成功");
		return "success";
	}
	
	public String updateDepartment() {
		Department dep = departmentService.findDepartmentById(departmentid);
		
		if (dep == null) {
			ret.put("retCode", "1001");
			ret.put("retMSG", "该部门不存在");
			return "success";
		}
		
		dep.setName(name);
		
		departmentService.updateDepartment(dep);
		
		ret.put("retCode", "1000");
		ret.put("retMSG", "部门更新成功");
		return "success";
	}

	public String listDepartments() {	
		List<Department> deps = new ArrayList<Department>();
		deps = departmentService.findAllDepartments();
		JSONArray ja = JSONArray.fromObject(deps);
		ret.put("deps", ja);
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
