package com.ymt.testplatform.service.testcase.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ymt.testplatform.dao.BaseDAO;
import com.ymt.testplatform.entity.ResultContent;
import com.ymt.testplatform.entity.Testcase;
import com.ymt.testplatform.entity.TestcaseResult;
import com.ymt.testplatform.entity.Testpass;
import com.ymt.testplatform.entity.Testsuite;
import com.ymt.testplatform.entity.TestsuiteResult;
import com.ymt.testplatform.service.testcase.TestcaseService;
import com.ymt.testplatform.util.Utils;


@Service("testcaseService")
public class TestcaseServiceImpl implements TestcaseService {

	@Resource
	private BaseDAO<Testsuite> testsuiteDAO;
	
	@Resource
	private BaseDAO<Testcase> testcaseDAO;
	
	@Resource
	private BaseDAO<Testpass> testpassDAO;
	
	@Resource
	private BaseDAO<TestsuiteResult> testsuiteResultDAO;
	
	@Resource
	private BaseDAO<TestcaseResult> testcaseResultDAO;
	
	@Resource
	private BaseDAO<ResultContent> resultContentDAO;

	
	// Testsuite
	public Testsuite findTestsuiteById(Integer testsuiteid){
		return testsuiteDAO.get("from Testsuite where id = ?", new Object[] { testsuiteid });
	}
	
	public void updateTestsuite(Testsuite testsuite){
		testsuiteDAO.update(testsuite);
	}
	
	public List<Testsuite> findAllTestsuitesByApplicationId(Integer applicationid, Integer departmentid, Integer pageSize, Integer pageIndex){

		String hql = "from Testsuite t where t.del = 0 ";
		if(applicationid!=null){
			hql += " and t.application.id = " + applicationid;
		}
		if(departmentid!=null){
			hql += " and t.application.department.id = " + departmentid;
		}
		hql += " group by t.application.id";
		return testsuiteDAO.findByHql(hql, null, pageSize, pageIndex);
		
	}
	
	public List<Testsuite> findAllTestsuitesByApplicationId(Integer applicationid){
		return testsuiteDAO.find("from Testsuite where applicationid = ? order by del", new Object[] { applicationid });
		
	}
	
	@Override
	public Long findAllTestsuitesPages(Integer applicationid, Integer departmentid, Integer pageSize){
		String hql = "select count(distinct t.application.id) from Testsuite t where t.del = 0";
		if(applicationid!=null){
			hql += " and t.application.id = " + applicationid;
		}
		if(departmentid!=null){
			hql += " and t.application.department.id = " + departmentid;
		}
		//hql += " group by t.application.id";
		Long pages = testsuiteDAO.count(hql);
		if(pages%pageSize!=0){
			pages = pages/pageSize + 1;
		}else{
			pages = pages/pageSize;
		}
		return pages;
	}
	
	public Long getTestsuiteCountByApplicationId(Integer applicationid){
		String queryString = " where del = 0 and application.id =" + applicationid ;
		String hql = "select count(*) from Testsuite " + queryString;
		return testsuiteDAO.count(hql);

	}

	// Testcase
	public Testcase findTestcaseById(Integer testcaseid){
		return testcaseDAO.get("from Testcase where id = ?", new Object[] { testcaseid });
	}
	
	public List<Testcase> findAllTestcasesByTestuiteid(Integer testsuiteid){
		return testcaseDAO.find("from Testcase where testsuiteid = ? order by del", new Object[] { testsuiteid });
	}
	
	public Long getTestcaseCountByTestsuiteId(Integer testsuiteid){
		String queryString = " where del = 0 and testsuiteid =" + testsuiteid ;
		String hql = "select count(*) from Testcase " + queryString;
		return testcaseDAO.count(hql);
	}
	
	public Long getTestcaseCountByApplicationId(Integer applicationid){
		String queryString = " where del = 0 and testsuiteid in(select id from Testsuite where applicationid ="+applicationid+")" ;
		String hql = "select count(*) from Testcase " + queryString;
		return testcaseDAO.count(hql);
	}
	
	public void updateTestcase(Testcase testcase){
		testcaseDAO.update(testcase);
	}
	
	// Tesspass
	public List<Testpass> findAllTestpass(Integer pageIndex, Integer pageSize, Integer departmentid, Map<String, Object> map){
		String queryString = " where t.del = 0 ";
		queryString = Utils.getQueryString(queryString, map);
		if(departmentid!=null){
			queryString += " and t.application.department.id = " + departmentid;
		}
		queryString = queryString + " order by createtime desc";
		return testpassDAO.findByHql(" from Testpass t" + queryString, map, pageSize, pageIndex);
	}
	
	// TestsuiteResult
	public List<TestsuiteResult> findAllTestsuiteResultsByTestpassId(Integer testpassid){
		return testsuiteResultDAO.find("from TestsuiteResult where testpassid = ? and del = 0", new Object[] { testpassid });
	}
	
	public Long getTestsuiteResultCount(Integer testpassid){
		String hql = "select count(*) from TestsuiteResult where testpassid =" + testpassid ;
		return testsuiteResultDAO.count(hql);
	}
	
	// TestcaseResult
	public List<TestcaseResult> findAllTestcaseResultsByTestsuiteId(Integer testsuiteid){
		return testcaseResultDAO.find("from TestcaseResult where testsuiteid = ? and del = 0", new Object[] { testsuiteid });
	}
	
	public Long getTotalTestcaseResultCountByTestsuite(Integer testsuiteresultid){
		String hql = "select count(*) from TestcaseResult where testsuiteresultid = " + testsuiteresultid;
		return testcaseResultDAO.count(hql);
	}
	
	public Long getTotalTestcaseResultCountByTestpass(Integer testpassid){
		String hql = "select count(*) from TestcaseResult where testsuiteresultid in(select id from TestsuiteResult where testpassid = " + testpassid + ")";
		return testcaseResultDAO.count(hql);
	}
	
	public Long getFailedTestcaseResultCountByTestsuite(Integer testsuiteresultid){
		String hql = "select count(*) from TestcaseResult where status = 1 and testsuiteresultid = " + testsuiteresultid;
		return testcaseResultDAO.count(hql);
	}
	
	public Long getFailedTestcaseResultCountByTestpass(Integer testpassid){
		String hql = "select count(*) from TestcaseResult where status = 1 and testsuiteresultid in(select id from TestsuiteResult where testpassid = " + testpassid + ")";
		return testcaseResultDAO.count(hql);
	}
	
	// ResultContent
	public List<ResultContent> findAllResultContentsByTestcaseResultId(Integer testcaseresultid){
		return resultContentDAO.find("from ResultContent where testcaseresultid = ? and del = 0", new Object[] { testcaseresultid });
	}
	
}
