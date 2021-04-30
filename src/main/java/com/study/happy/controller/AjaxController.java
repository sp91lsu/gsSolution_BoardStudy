package com.study.happy.controller;

import com.study.happy.service.BoardService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Controller
public class AjaxController {

    @Resource(name = "service")
    private BoardService boardService;

    @RequestMapping("main")
    public String main(@RequestParam Map<String, Object> map, Model model) {
        System.out.println("서비스 타기전");
        map.put("fromRow","1");
        map.put("rowsPerPage", pagingSetting.getInstance().rowsPerPage+"");
        List<Map<String, Object>> list = boardService.list(map);
        map.put("curPage","1");
        map.put("blockSize", pagingSetting.getInstance().blockSize);
        System.out.println(map);
        model.addAttribute("list", list);
        model.addAttribute("info", map);
        return "boardAjax/main";
    }

    //리스트 뷰
    @RequestMapping("list.ajax")
    public String list(@RequestParam Map<String, Object> map, Model model) {
        System.out.println("서비스 타기전");
        pagingSetting.getInstance().rowsPerPage = Integer.parseInt((String)map.get("rowsPerPage"));
        List<Map<String, Object>> list = boardService.list(map);
        System.out.println(map);
        model.addAttribute("list", list);
        model.addAttribute("info", map);
        return "boardAjax/listAjax";
    }

}
