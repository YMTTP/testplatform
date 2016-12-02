package com.ymt.testplatform.util.mail;

import java.util.Date;
import java.util.Enumeration;
import java.util.Properties;
import java.util.Vector;

import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.internet.MimeUtility; 

public class Sender {
	public String toChinese(String text) {
        try {
            text = MimeUtility.encodeText(new String(text.getBytes(), "GB2312"), "GB2312", "B");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return text;
    }


    public boolean sendMail(Mail mb) {
        String host = mb.getHost();
        final String username = mb.getUsername();
        final String password = mb.getPassword();
        String from = mb.getFrom();
        String to = mb.getTo();
        String subject = mb.getSubject();
        String content = mb.getContent();
        String fileName = mb.getFilename();
        Vector<String> file = mb.getFile();
        
        
        Properties props = System.getProperties();
        props.put("mail.smtp.host", host);                // 设置SMTP的主机
        props.put("mail.smtp.auth", "true");            // 需要经过验证
        
        Session session = Session.getInstance(props, new Authenticator() {
            public PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });

        try {
            MimeMessage msg = new MimeMessage(session);
            msg.setFrom(new InternetAddress(from));
            
            String[] toStr = to.split(",");    
            InternetAddress [] tos = null;         
            if(toStr == null || toStr.length<= 0){     
   
            }         
            tos = new InternetAddress[toStr.length];        
            for (int i = 0; i<toStr.length; i++) {     
            	tos[i]= new InternetAddress(toStr[i]);//设置每一个接收邮件的地址    
            	}         
            msg.setRecipients(Message.RecipientType.TO, tos); 
            
            
            //InternetAddress[] address = {new InternetAddress(to)};
            //msg.setRecipients(Message.RecipientType.TO, address);
            //msg.setSubject(toChinese(subject));
            msg.setSubject(subject);

            Multipart mp = new MimeMultipart();
            MimeBodyPart mbpContent = new MimeBodyPart();
            mbpContent.setText(content);
            mp.addBodyPart(mbpContent);

            /*    往邮件中添加附件    */
//            Enumeration<String> efile = file.elements();
//            while (efile.hasMoreElements()) {
//                MimeBodyPart mbpFile = new MimeBodyPart();
//                fileName = efile.nextElement().toString();
//                FileDataSource fds = new FileDataSource(fileName);
//                mbpFile.setDataHandler(new DataHandler(fds));
//                mbpFile.setFileName(toChinese(fds.getName()));
//                mp.addBodyPart(mbpFile);
//            }

            msg.setContent(mp);
            msg.setSentDate(new Date());
            Transport.send(msg);
            
        } catch (MessagingException me) {
            me.printStackTrace();
            return false;
        }
        return true;
    }

}
