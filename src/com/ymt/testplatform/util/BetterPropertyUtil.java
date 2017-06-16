package com.ymt.testplatform.util;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;
import java.util.Iterator;
import java.util.Properties;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.util.StreamUtils;

public class BetterPropertyUtil {

	public static String getValue(String key) throws IOException {
		
		Resource resource = new ClassPathResource("better.properties");
				
		Properties prop = new Properties();

		prop.load(resource.getInputStream()); // /加载属性列表
		Iterator<String> it = prop.stringPropertyNames().iterator();
		while (it.hasNext()) {

			if (it.next().equals(key))
				return prop.getProperty(key);
		}		

		return "";
	}
	
	public static void main(String[] args) {
		try {
			System.out.println(BetterPropertyUtil.getValue("harlocation"));
			System.out.println(BetterPropertyUtil.getValue("harbaklocation"));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
