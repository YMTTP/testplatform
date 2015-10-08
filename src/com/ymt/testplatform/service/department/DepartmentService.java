package com.ymt.testplatform.service.department;

import java.util.List;

import com.ymt.testplatform.entity.Department;

public interface DepartmentService {
	
	public Department findDepartmentById(int id);
	
	public void saveDepartment(Department department);

	public void updateDepartment(Department department);

	public void deleteDepartment(Department department);

	public List<Department> findAllList(Integer pageIndex);
	
	public List<Department> findAllDepartments();
	
	public Long findPages();

	

	

}
