package com.study.happy.utilClass;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class FileUpload {
    public Map<String, Object> imageUpload(MultipartHttpServletRequest mReq,String uploadPath){
        int cnt = 0;
        String uploadFileName;
        MultipartFile mFile = null;
        String orgFileName = ""; //진짜 파일명
        String sysFileName = ""; //변환된 파일명
        Map<String, Object> resMap = new HashMap<String, Object>();

        Iterator<String> iter = mReq.getFileNames();
        while (iter.hasNext()) {
            uploadFileName = iter.next();
            mFile = mReq.getFile(uploadFileName);
            if (mFile.getSize() > 0) {
                orgFileName = mFile.getOriginalFilename();
                sysFileName = getCurrentTimeSeq()+"_"+orgFileName;
                Map<String, String> fileInfo = new HashMap<String, String>();
                fileInfo.put("sysFileName", sysFileName);
                try {
                    mFile.transferTo(new File(uploadPath+sysFileName));
                    fileInfo.put("status", "File upload: success");
                } catch (IOException e) {
                    e.printStackTrace();
                    fileInfo.put("status", "File upload: Fail");
                }
                resMap.put(orgFileName, fileInfo);
            }
        }
        System.out.println(resMap);
        return resMap;
    }

    private static String getCurrentTimeSeq() {
        SimpleDateFormat sdfDate = new SimpleDateFormat("yyyyMMddHHmmssSSS");//dd/MM/yyyy
        Date now = new Date();
        String strDate = sdfDate.format(now);
        return strDate;
    }
}
