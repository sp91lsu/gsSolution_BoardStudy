package com.study.happy.utilClass;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.List;
import java.util.Map;

public class FileDownload {
    public void downToAnywhere(HttpServletResponse response, HttpServletRequest request, String filePath, String fileName){
        File file = new File(filePath);

        FileInputStream fileInputStream = null;
        ServletOutputStream servletOutputStream = null;

        try{
            String downName = null;
            String browser = request.getHeader("User-Agent");
            //파일 인코딩
            if(browser.contains("MSIE") || browser.contains("Trident") || browser.contains("Chrome")){//브라우저 확인 파일명 encode

                downName = URLEncoder.encode(fileName,"UTF-8").replaceAll("\\+", "%20");

            }else{

                downName = new String(fileName.getBytes("UTF-8"), "ISO-8859-1");

            }

            response.setHeader("Content-Disposition","attachment;filename=\"" + downName+"\"");
            response.setContentType("application/octer-stream");
            response.setHeader("Content-Transfer-Encoding", "binary;");

            fileInputStream = new FileInputStream(file);
            servletOutputStream = response.getOutputStream();

            byte b [] = new byte[1024];
            int data = 0;

            while((data=(fileInputStream.read(b, 0, b.length))) != -1){

                servletOutputStream.write(b, 0, data);

            }

            servletOutputStream.flush();//출력

        }catch (Exception e) {
            e.printStackTrace();
        }finally{
            if(servletOutputStream!=null){
                try{
                    servletOutputStream.close();
                }catch (IOException e){
                    e.printStackTrace();
                }
            }
            if(fileInputStream!=null){
                try{
                    fileInputStream.close();
                }catch (IOException e){
                    e.printStackTrace();
                }
            }
        }
    }
    public void excelDown(HttpServletResponse response, HttpServletRequest request, String initialFileName, List<Map<String, Object>> list){
        XSSFWorkbook wb = new CreateExcel().listToExcelWorkBook(list);
        FileInputStream fileInputStream = null;
        ServletOutputStream out = null;

        try{
            String downName = null;
            String browser = request.getHeader("User-Agent");
            //파일 인코딩
            if(browser.contains("MSIE") || browser.contains("Trident") || browser.contains("Chrome")){//브라우저 확인 파일명 encode

                downName = URLEncoder.encode(initialFileName,"UTF-8").replaceAll("\\+", "%20");

            }else{

                downName = new String(initialFileName.getBytes("UTF-8"), "ISO-8859-1");

            }

            response.setHeader("Content-Disposition","attachment;filename=\"" + downName+"\"");
            response.setContentType("application/octer-stream");
            response.setHeader("Content-Transfer-Encoding", "binary;");

            out = response.getOutputStream();

            wb.write(out); // JVM sometimes get stucked here
            out.flush();
            out.close();

        }catch (Exception e) {
            e.printStackTrace();
        }finally{
            if(out!=null){
                try{
                    out.close();
                }catch (IOException e){
                    e.printStackTrace();
                }
            }
        }
    }
}
