package com.ymt.testplatform.util;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStream;

import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPClientConfig;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.commons.net.ftp.FTPReply;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ice.tar.TarEntry;
import com.ice.tar.TarInputStream;

public class FileUtil {

	private static final Logger logger = LoggerFactory
			.getLogger(FileUtil.class);

	/**
	 * 创建文件夹
	 * 
	 * @param path
	 */
	public void createDir(String path) {
		File dir = new File(path);
		if (!dir.exists())
			dir.mkdir();
	}

	/**
	 * 创建新文件
	 * 
	 * @param path
	 * @param filename
	 * @throws IOException
	 */
	public void createFile(String path, String filename) throws IOException {
		File file = new File(path + "/" + filename);
		if (!file.exists())
			file.createNewFile();
	}

	/**
	 * 删除文件
	 * 
	 * @param path
	 * @param filename
	 */
	public void delFile(String path, String filename) {
		File file = new File(path + "/" + filename);
		if (file.exists() && file.isFile())
			file.delete();
	}

	/**
	 * 删除目录
	 * 
	 * @param path
	 */
	public void delDir(String path) {
		File dir = new File(path);
		if (dir.exists()) {
			File[] tmp = dir.listFiles();
			for (int i = 0; i < tmp.length; i++) {
				if (tmp[i].isDirectory()) {
					delDir(path + "/" + tmp[i].getName());
				} else {
					tmp[i].delete();
				}
			}
			dir.delete();
		}
	}

	/**
	 * 解压tar包
	 * 
	 * @param filename
	 *            tar文件
	 * @param directory
	 *            解压目录
	 * @return
	 */
	public boolean extTarFileList(String directory, String filename) {
		boolean flag = false;
		OutputStream out = null;
		try {
			TarInputStream in = new TarInputStream(new FileInputStream(
					new File(filename)));
			TarEntry entry = null;
			while ((entry = in.getNextEntry()) != null) {
				if (entry.isDirectory()) {
					continue;
				}
				logger.info(entry.getName());
				File outfile = new File(directory + entry.getName());
				new File(outfile.getParent()).mkdirs();
				out = new BufferedOutputStream(new FileOutputStream(outfile));
				int x = 0;
				while ((x = in.read()) != -1) {
					out.write(x);
				}
				out.close();
			}
			in.close();
			flag = true;
		} catch (Exception ioe) {
			flag = false;

			logger.info("extTarFileList Exception: "
					+ ioe.getLocalizedMessage());
		}
		return flag;
	}

	/**
	 * FTP下载单个文件测试
	 */
	public void fileDownloadByFtp(String ip, String username, String password,
			String remotePath, String fileName, String localPath) {
		FTPClient ftp = new FTPClient();
		FileOutputStream fos = null;

		try {
			ftp.connect(ip);
			logger.info("return of login:" + ftp.login(username, password));

			// 设置文件类型（二进制）
			ftp.setFileType(FTPClient.BINARY_FILE_TYPE);

			// 设置linux环境
			FTPClientConfig conf = new FTPClientConfig(
					FTPClientConfig.SYST_UNIX);
			ftp.configure(conf);

			// 判断是否连接成功
			Integer reply = ftp.getReplyCode();
			if (!FTPReply.isPositiveCompletion(reply)) {
				ftp.disconnect();
				return;
			}

			// 设置访问被动模式
			ftp.setRemoteVerificationEnabled(false);
			ftp.enterLocalPassiveMode();

			// 检索ftp目录下所有的文件，利用时间字符串进行过滤
			ftp.changeWorkingDirectory(remotePath);// 转移到FTP服务器目录
			FTPFile[] fs = ftp.listFiles();
			for (FTPFile ff : fs) {
				if (ff.getName().equals(fileName)) {
					File localFile = new File(localPath + "/" + ff.getName());

					OutputStream is = new FileOutputStream(localFile);
					ftp.retrieveFile(ff.getName(), is);
					is.close();
				}
			}

			ftp.logout();

		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (ftp.isConnected()) {
				try {
					ftp.disconnect();
				} catch (IOException ioe) {
				}
			}
		}
	}

	public void FileWriter(String fileName, String content) throws IOException {
	    //打开一个写文件器，构造函数中的第二个参数true表示以追加形式写文件
        FileWriter writer = new FileWriter(fileName, true);
        writer.write(content);
        writer.close();

	}

	public static void main(String[] args) {
		FileUtil fileUtil = new FileUtil();
		fileUtil.fileDownloadByFtp("172.16.103.126", "ftpuser", "1qaz@WSX",
				"/STRESS/", "test.sh", "f:/tools");

	}
}
