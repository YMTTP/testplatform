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
	public void updateTestsuite(Testsuite testsuite);
	
	public List<Testsuite> findAllTestsuitesByApplicationId(Integer applicationid);
	
	public Long getTestsuiteCountByApplicationId(Integer applicationid);

	// Testcase
	public List<Testcase> findAllTestcasesByTestuiteid(Integer testsuiteid);
	
	public Long getTestcaseCountByTestsuiteId(Integer testsuiteid);
	
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
