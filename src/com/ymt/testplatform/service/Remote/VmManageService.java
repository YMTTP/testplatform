package com.ymt.testplatform.service.Remote;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.ymt.testplatform.service.monitor.impl.DeployService;
import com.ymt.testplatform.util.RemoteShellTool;

@Service("VmManageService")
public class VmManageService {
	
	private static final Logger logger = LoggerFactory
			.getLogger(DeployService.class);

	public String viewDate(String ip) throws IOException, InterruptedException
	{
		 RemoteShellTool tool = new RemoteShellTool(ip,"utf-8");
		 tool.loginCentos();
		 String returnString = tool.exec("date \"+%Y-%m-%d %H:%M:%S\" "); 
		 
		 if(returnString.indexOf("-")<0)
		 {
			 logger.info("syncDate:"+ip+" return "+returnString);
			 return "fail";
		 }
		 return returnString;
	}	
	
	public String syncDate(String ip) throws IOException, InterruptedException
	{
		 RemoteShellTool tool = new RemoteShellTool(ip,"utf-8");
		 tool.loginCentos();
		 String returnString = tool.exec("ntpdate 172.16.3.2"); 
		 
		 if(returnString.indexOf("adjust")<0)
		 {
			 logger.info("syncDate:"+ip+" return "+returnString);
			 return "fail";
		 }
		 return viewDate(ip);
	}	
	
	public int[] viewMemory(String ip) throws IOException, InterruptedException
	{
		 RemoteShellTool tool = new RemoteShellTool(ip,"utf-8");
		 tool.loginCentos();
		 String returnString = tool.exec("cat /proc/meminfo"); 
		 
		 int  data[];
		 
		 if(returnString.indexOf("MemTotal")<0)
		 {
			 logger.info("syncDate:"+ip+" return "+returnString);	
			 data=new int[]{0,0};
		 }
		 else {
			 returnString=returnString.replace(" ", "");
			 String result[]=returnString.split("\n");
			 
			 int total = (int) ((Integer.parseInt(result[0].substring(9,result[0].length()-2))+0.5)/1024);
			 int free = (int) ((Integer.parseInt(result[1].substring(8,result[1].length()-2))+0.5)/1024);
			 data=new int[]{free,total};
		}
		 return data;
	}	
	
	public int[] viewDisk(String ip) throws IOException, InterruptedException
	{
		 RemoteShellTool tool = new RemoteShellTool(ip,"utf-8");
		 tool.loginCentos();
		 String returnString = tool.exec("df -lh"); 
		 
		 int  data[];
		 
		 if(returnString.indexOf("Filesystem")<0)
		 {
			 logger.info("syncDate:"+ip+" return "+returnString);	
			 data=new int[]{0,0};
		 }
		 else {
			 returnString=returnString.replaceAll(" +"," ");
			 String result[]=returnString.split("\n");
			 String res1[] = result[1].split(" ");
			 
			 data=new int[]{Integer.parseInt(res1[3].substring(0, res1[3].length()-1)),Integer.parseInt(res1[1].substring(0, res1[1].length()-1))};
		}
		 return data;
	}	

}
