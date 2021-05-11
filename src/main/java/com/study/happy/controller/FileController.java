package com.study.happy.controller;

import com.study.happy.service.BoardService;
import com.study.happy.utilClass.CreateExcel;
import com.study.happy.utilClass.FileDownload;
import com.study.happy.utilClass.FileUpload;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;

@Controller
public class FileController {

    @Resource(name="uploadPath")
    String uploadPath;

    @Resource(name = "service")
    private BoardService boardService;

    @RequestMapping("uploadView")
    public String file(Model model) {
        return "file/uploadGo";
    }

    @RequestMapping(value="upload", method=RequestMethod.POST)
    public String uploadImages(MultipartHttpServletRequest mReq, Model model) {
        Map<String, Object> resMap = new FileUpload().imageUpload(mReq, uploadPath);
        model.addAttribute("resMap", resMap);
        return "file/uploadResult";
    }

    @RequestMapping("downView")
    public String downView(Model model) {
        return "file/downloadGo";
    }

    @RequestMapping(value="/down")
    public void fileDownload(HttpServletResponse response, HttpServletRequest request, @RequestParam Map<String, String> paramMap) {
        new FileDownload().downToAnywhere(response,request,paramMap.get("filePath"),paramMap.get("fileName"));
    }

    @RequestMapping("excel")
    public void test(HttpServletResponse response, HttpServletRequest request, @RequestParam Map<String, Object> map) {
        List<Map<String, Object>> list = boardService.listNoPage(map);
        new FileDownload().excelDown(response,request,"list.xlsx",list);
//        String path = "D:\\DevLSW\\study\\GSsolutionWS\\goSpring\\src\\main\\webapp\\WEB-INF\\views\\file\\exceldown\\";
//        new CreateExcel().listToExcelToOneDir(path,"list.xlsx",list);
//        System.out.println(list);
//        System.out.println(list.get(0));
//        System.out.println(list.get(1));
//        for (String key : list.get(0).keySet()) {
//            System.out.println( String.format("%s 의 타입: %s",key,list.get(0).get(key).getClass()));
//        }
    }

}
