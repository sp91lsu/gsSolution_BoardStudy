package com.study.happy.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.annotation.Resource;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class FileController {

    @Resource(name="uploadPath")
    String uploadPath;

    @RequestMapping("file")
    public String file(Model model) {
        return "file/uploadGo";
    }

    @RequestMapping(value="upload", method= RequestMethod.GET)
    public String fileupload() {
        return "post/test_file.basic";
    }

    @RequestMapping(value="upload", method=RequestMethod.POST)
    public String uploadImages(MultipartHttpServletRequest mReq, Model model) {

        int cnt = 0;
        String uploadFileName;
        MultipartFile mFile = null;
        String orgFileName = ""; //진짜 파일명
        String sysFileName = ""; //변환된 파일명
        Map<String, Object> resMap = new HashMap<>();

        Iterator<String> iter = mReq.getFileNames();
        while (iter.hasNext()) {
            uploadFileName = iter.next();
            mFile = mReq.getFile(uploadFileName);
            if (mFile.getSize() > 0) {
                orgFileName = mFile.getOriginalFilename();
                sysFileName = getCurrentTimeSeq()+"_"+orgFileName;
                Map<String, String> fileInfo = new HashMap<>();
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
        model.addAttribute("resMap", resMap);
        return "file/uploadResult";
    }


    private static String getCurrentTimeSeq() {
        SimpleDateFormat sdfDate = new SimpleDateFormat("yyyyMMddHHmmssSSS");//dd/MM/yyyy
        Date now = new Date();
        String strDate = sdfDate.format(now);
        return strDate;
    }
}
