package com.ymt.testplatform.util;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;

import ch.ethz.ssh2.Connection;
import ch.ethz.ssh2.Session;

public class RemoteShellTool {
	private Connection conn;  
    private String ipAddr;  
    private String charset = Charset.defaultCharset().toString();  
    private String userName;  
    private String password;  
  
    public RemoteShellTool(String ipAddr, String userName, String password,  
            String charset) {  
        this.ipAddr = ipAddr;  
        this.userName = userName;  
        this.password = password;  
        if (charset != null) {  
            this.charset = charset;  
        }  
    }  
  
    public boolean login() throws IOException {  
        conn = new Connection(ipAddr);  
        conn.connect(); // 连接  
        return conn.authenticateWithPassword(userName, password); // 认证  
    }  
  
    public String exec(String cmds) {  
        InputStream in = null;  
        String result = "";  
        try {  
            if (this.login()) {  
                Session session = conn.openSession(); // 打开一个会话  
                session.execCommand(cmds);  
                  
                in = session.getStdout();  
                result = this.processStdout(in, this.charset);  
                session.close();  
                conn.close();  
            }  
        } catch (IOException e1) {  
            e1.printStackTrace();  
        }  
        return result;  
    }  
  
    public String processStdout(InputStream in, String charset) {  
      
        byte[] buf = new byte[1024];  
        StringBuffer sb = new StringBuffer();  
        try {  
            while (in.read(buf) != -1) {  
                sb.append(new String(buf, charset));  
            }  
        } catch (IOException e) {  
            e.printStackTrace();  
        }  
        return sb.toString();  
    }  
  
    /** 
     * @param args 
     */  
    public static void main(String[] args) {  
  
        RemoteShellTool tool = new RemoteShellTool("172.16.103.126", "ftpuser",  
                "1qaz@WSX", "utf-8");  
  
        String result = tool.exec("sh Deploy.sh 172.16.103.121");  
        System.out.print("result:"+result);  
        
        RemoteShellTool tool2 = new RemoteShellTool("172.16.103.121", "ftpuser",  
                "1qaz@WSX", "utf-8");  
  
        String result2 = tool2.exec("sh tools/clientDeploy.sh");  
        System.out.print("result2:"+result2);  
  
    }  
  
}
