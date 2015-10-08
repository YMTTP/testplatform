package com.ymt.testplatform.service.department.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ymt.testplatform.dao.BaseDAO;
import com.ymt.testplatform.entity.Department;
import com.ymt.testplatform.service.department.DepartmentService;


@Service("depatrmentService")
public class DepartmentServiceImpl implements DepartmentService {

	@Resource
	private BaseDAO<Department> deparmentDAO;

	@Override
	public Department findDepartmentById(int id){
		return deparmentDAO.get("from Department where id = ? and del=0", new Object[] { id });
	}
	
	@Override
	public void saveDepartment(Department department) {
		deparmentDAO.save(department);
	}

	@Override
	public void updateDepartment(Department department) {
		deparmentDAO.update(department);
	}

	@Override
	public void deleteDepartment(Department department) {
		deparmentDAO.delete(department);
	}

	@Override
	public List<Department> findAllList(Integer pageIndex) {
		return deparmentDAO.findByHql("from Department where del=0", null, 20, pageIndex);
	}
	
	@Override
	public List<Department> findAllDepartments(){
		return deparmentDAO.find("from Department where del=0");
	}
	
	@Override
	public Long findPages(){
		String hql = "select count(*) from Department where del=0";
		Long pages = deparmentDAO.count(hql);
		return pages;
	}
	


	

}
