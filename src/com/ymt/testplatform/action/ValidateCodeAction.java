package com.ymt.testplatform.action;

import java.sql.*;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionSupport;

@Controller
public class ValidateCodeAction extends ActionSupport {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int envid;
	private String phoneno;
	private int queryChannelId;

	private JSONObject ret = new JSONObject();

	public String queryValidateCode() {
		String querysqlString = this.querySql(queryChannelId, phoneno);
		JSONArray ja = this.queryResult(envid, querysqlString);
		ret.put("validateCodeInfos", ja);
		ret.put("retCode", "1000");
		ret.put("retMSG", "操作成功");
		return "success";
	}

	private String querySql(int channelId, String queryPhoneNo) {
		// channelId=1 查询的是Ymt_SellerVerifyRequest
		// channelId=2查询的是Ymt_ValidationCode

		String querySqlString = "", querycondition = "";
		if (channelId == 2) {
			if (queryPhoneNo.equals("")) {
				querycondition = "";
			} else {
				querycondition = "where sActionUser = '" + queryPhoneNo + "' ";
			}
			querySqlString = "select top 10 * from YmtRelease.dbo.Ymt_ValidationCode "
					+ querycondition + "  order by iValidateId desc";
		} else if (channelId == 1) {
			if (queryPhoneNo.equals("")) {
				querycondition = "";
			} else {
				querycondition = "where Mobile = '" + queryPhoneNo + "' ";
			}
			querySqlString = "select top 10 * from YmtRelease.dbo.Ymt_SellerVerifyRequest "
					+ querycondition + " order by VerifyRequestId desc";
		}

		return querySqlString;
	}

	private JSONArray queryResult(int queryenvid, String sqlstring) {
		String[] sqlhost = { "172.16.101.153", "172.16.110.153",
				"172.16.103.203" };
		String connectionUrl = "jdbc:sqlserver://" + sqlhost[queryenvid]
				+ ":1433;databaseName=ymtrelease";
		String userName = "ymtrelease";
		String userPwd = "123456";
		String driverName = "com.microsoft.sqlserver.jdbc.SQLServerDriver";

		try {
			Class.forName(driverName);
		} catch (ClassNotFoundException e) {
			System.out.println("找不到驱动程序类 ，加载驱动失败！");
			e.printStackTrace();
		}

		Connection con = null;
		Statement stmt = null;
		ResultSet rset = null;
		JSONArray array = new JSONArray();

		try {
			con = DriverManager.getConnection(connectionUrl, userName, userPwd);
			stmt = con.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,
					ResultSet.CONCUR_READ_ONLY);
			rset = stmt.executeQuery(sqlstring);
			ResultSetMetaData rsmd = rset.getMetaData();
			int columnCount = rsmd.getColumnCount();
			while (rset.next()) {
				JSONObject jsonObj = new JSONObject();
				for (int i = 1; i <= columnCount; i++) {
					String columnName = rsmd.getColumnLabel(i);
					String value = rset.getString(columnName);
					jsonObj.put(columnName, value);
				}
				array.add(jsonObj);
			}

		} catch (SQLException e) {
			System.out.println("数据库连接失败！");
			e.printStackTrace();
		} finally {
			if (rset != null) {
				try {
					rset.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
			if (stmt != null) {
				try {
					stmt.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
			if (con != null) {
				try {
					con.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
		return array;
	}

	public int getEnvid() {
		return envid;
	}

	public void setEnvid(int envid) {
		this.envid = envid;
	}

	public String getPhoneno() {
		return phoneno;
	}

	public void setPhoneno(String phoneno) {
		this.phoneno = phoneno;
	}

	public JSONObject getRet() {
		return ret;
	}

	public void setRet(JSONObject ret) {
		this.ret = ret;
	}

	public int getQueryChannelId() {
		return queryChannelId;
	}

	public void setQueryChannelId(int queryChannelId) {
		this.queryChannelId = queryChannelId;
	}
}
