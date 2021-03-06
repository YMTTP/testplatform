package com.ymt.testplatform.util;

import java.security.MessageDigest;
import java.util.Calendar;
import java.util.Iterator;
import java.util.Map;
import java.util.Random;

import com.ymt.testplatform.util.mail.Mail;
import com.ymt.testplatform.util.mail.Sender;

import sun.misc.BASE64Encoder;

public class Utils {

	public static String getRandomString(int length) {
		String str = "abcdefghigklmnopkrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ0123456789";
		Random random = new Random();
		StringBuffer sf = new StringBuffer();
		for (int i = 0; i < length; i++) {
			int number = random.nextInt(62);// 0~61
			sf.append(str.charAt(number));

		}
		return sf.toString();
	}
	
	public static String md5Encryption(String str) {
		String newStr = null;
		try {
			MessageDigest md5 = MessageDigest.getInstance("MD5");
			md5.reset();
			md5.update(str.getBytes("UTF-8"));
			BASE64Encoder base = new BASE64Encoder();
			newStr = base.encode(md5.digest());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return newStr;
	}
	
	public static String getQueryString(String queryString, Map<String, Object> map){
		if(map!=null){
			Iterator<String> keys = map.keySet().iterator();
			while (keys.hasNext()) {
                String key = keys.next();
                queryString =  queryString + " and " + key + " like " + ":" + key;
			}
		}
		return queryString;
	}
	
	public static boolean sendMail(String to, String subject, String content){
		Mail mail = new Mail();
		mail.setHost("smtp.exmail.qq.com"); // 设置SMTP主机
		mail.setUsername("automation@ymatou.com"); // 设置发件人邮箱的用户名
		mail.setPassword("Ymatou@Xlobo@123"); // 设置发件人邮箱的密码，需将*号改成正确的密码
		mail.setFrom("automation@ymatou.com"); // 设置发件人的邮箱
		mail.setTo(to); // 设置收件人的邮箱
		mail.setSubject(subject); // 设置邮件的主题
		mail.setContent(content); // 设置邮件的正文

		Sender sender = new Sender();

		return sender.sendMail(mail);

	}
	
	public static boolean authorized(Integer auth, Integer per){
		
		Double d = Math.pow(2,per);
		
		if((auth&d.intValue())==0){
			return false;
		}else{
			return true;
		}		
	}
	
	public static int getDaysByMonth(int year, int month){
		Calendar time=Calendar.getInstance(); 
		time.clear(); 
		time.set(Calendar.YEAR,year); 
		//year年
		time.set(Calendar.MONTH,month-1);
		//Calendar对象默认一月为0,month月            
		int day=time.getActualMaximum(Calendar.DAY_OF_MONTH);
		return day;
	}
	
	
}
