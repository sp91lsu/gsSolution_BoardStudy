package com.study.happy.controller;

import com.study.happy.service.BoardService;
import com.study.happy.utilClass.PagingSetting;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.annotation.Resource;
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

@Controller
public class AjaxController {

    @Resource(name = "service")
    private BoardService boardService;

    @RequestMapping("main")
    public String main(@RequestParam Map<String, Object> map, Model model) {
        System.out.println("Controller_main"+map);
        System.out.println("Controller_main list서비스 타기전");
        map.put("fromRow","1");
        map.put("rowsPerPage", PagingSetting.getInstance().getRowsPerPage()+"");
        List<Map<String, Object>> list = boardService.list(map);
        System.out.println("Controller_main list서비스 후");
        map.put("curPage","1");
        map.put("blockSize", PagingSetting.getInstance().getBlockSize()+"");
        System.out.println("Controller_main jsp로 보내기전"+map);
        model.addAttribute("list", list);
        model.addAttribute("info", map);
        return "boardAjax/main";
    }

    //리스트 뷰
    @RequestMapping("list.ajax")
    public String list(@RequestParam Map<String, Object> map, Model model) {
        System.out.println("Controller_list.ajax" + map);
        System.out.println("Controller_list.ajax list서비스 타기전");
        if(!map.containsKey("curPage")){
            map.put("fromRow","1");
            map.put("curPage","1");
        }
        if(!map.containsKey("rowsPerPage")){
            map.put("rowsPerPage", PagingSetting.getInstance().getRowsPerPage()+"");
        }else {
            int rowsPerPage = Integer.parseInt((String) map.get("rowsPerPage"));
            PagingSetting.getInstance().setRowsPerPage(rowsPerPage);
        }
        map.put("blockSize", PagingSetting.getInstance().getBlockSize()+"");
        List<Map<String, Object>> list = boardService.list(map);
        System.out.println("Controller_list.ajax list서비스 후");
        System.out.println("Controller_list.ajax jsp로 보내기전"+map);
        System.out.println(list.get(0).get("regDate"));
        System.out.println((Timestamp)list.get(0).get("regDate"));
        System.out.println(((Timestamp) list.get(0).get("regDate")).toLocalDateTime());
        model.addAttribute("list", list);
        model.addAttribute("info", map);
        return "boardAjax/listAjax";
    }



}
