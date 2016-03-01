package com.ymt.testplatform.service.testcase;

import java.util.List;
import java.util.Map;

import com.ymt.testplatform.entity.ResultContent;
import com.ymt.testplatform.entity.Testcase;
import com.ymt.testplatform.entity.TestcaseResult;
import com.ymt.testplatform.entity.Testpass;
import com.ymt.testplatform.entity.Testsuite;
import com.ymt.testplatform.entity.TestsuiteResult;


public interface TestcaseService {
		
	// Testsuite
	public Testsuite findTestsuiteById(Integer testsuiteid);
	
	public void updateTestsuite(Testsuite testsuite);
	
	public List<Testsuite> findAllTestsuitesByApplicationId(Integer applicationid,Integer departmentid,Integer pageSize, Integer pageIndex);
	
	public Long findAllTestsuitesPages(Integer applicationid, Integer departmentid, Integer pageSize);
	
	public Long getTestsuiteCountByApplicationId(Integer applicationid);
	
	public List<Testsuite> findAllTestsuitesByApplicationId(Integer applicationid);

	// Testcase
	public Testcase findTestcaseById(Integer testcaseid);
	
	public List<Testcase> findAllTestcasesByTestuiteid(Integer testsuiteid);
	
	public Long getTestcaseCountByTestsuiteId(Integer testsuiteid);
	
	public Long getTestcaseCountByApplicationId(Integer applicationid);
	
	public void updateTestcase(Testcase testcase);
	
	// Tesspass
	public List<Testpass> findAllTestpass(Integer pageIndex, Integer pageSize, Map<String, Object> map);
	
	// TestsuiteResult
	public List<TestsuiteResult> findAllTestsuiteResultsByTestpassId(Integer testpassid);
	
	public Long getTestsuiteResultCount(Integer testsuiteid);
	
	// TestcaseResult
	public List<TestcaseResult> findAllTestcaseResultsByTestsuiteId(Integer testsuiteid);
	
	public Long getTestcaseResultCount(Integer testcaseresultid);
	
	// ResultContent
	public List<ResultContent> findAllResultContentsByTestcaseResultId(Integer testcaseresultid);
	
	
	
}
