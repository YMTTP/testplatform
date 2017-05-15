package com.ymt.testplatform.service.monitor.impl;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.ymt.testplatform.util.FileUtil;
import com.ymt.testplatform.util.RemoteShellTool;

@Service("DeployService")
public class DeployService {
	private static final Logger logger = LoggerFactory
			.getLogger(DeployService.class);
	
	public String DeployEnvAgency(String ip) throws IOException, InterruptedException
	{
		 RemoteShellTool tool = new RemoteShellTool("172.16.103.126", "ftpuser",  
	                "1qaz@WSX", "utf-8");  
	  
	        String result = tool.exec("sh Deploy.sh "+ip);  
	        System.out.print("result:"+result);  
	        
	        RemoteShellTool tool2 = new RemoteShellTool(ip, "ftpuser",  
	                "1qaz@WSX", "utf-8");  
	  
	        String result2 = tool2.exec("sh tools/clientDeploy.sh");  
	        System.out.print("result2:"+result2);  
			
			return "ok";
	}
		
	public String killClient(String ip) throws IOException, InterruptedException
	{
		 RemoteShellTool tool = new RemoteShellTool(ip,"utf-8");
		 tool.loginCentos();
		 tool.exec("kill -9 $(ps -ef|grep ClientSetup|gawk '$0 !~/grep/ {print $2}'|tr -s '\n''')");  
		 tool.exec("kill -9 $(ps -ef|grep SpringMVCDemo|gawk '$0 !~/grep/ {print $2}'|tr -s '\n''')");  
		 
		 return "ok";
	}	
	
}
