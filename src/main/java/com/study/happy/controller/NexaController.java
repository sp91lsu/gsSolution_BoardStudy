package com.study.happy.controller;

import com.nexacro17.xapi.tx.PlatformException;
import com.study.happy.service.BoardService;
import com.study.happy.utilClass.DsTrasaction;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/nexaboard")
public class NexaController {

    @Resource(name = "service")
    private BoardService boardService;

    @RequestMapping("list")
    public void nexaList(HttpServletResponse response) throws PlatformException {
        System.out.println("nexa list 들어왔다");
        Map<String,Object> map = new HashMap<>();
        List<Map<String, Object>> list = boardService.list(map);

        DsTrasaction dst = new DsTrasaction();
        dst.listToDs(response,list);
    }
    @RequestMapping("search")
    public void nexaSearch(HttpServletRequest request, HttpServletResponse response) throws PlatformException {
        System.out.println("nexa search 들어왔다");
        DsTrasaction dst = new DsTrasaction();
        Map<String, String> map = dst.formToMap(request);
        List<Map<String, Object>> list = boardService.search(map);
        System.out.println("search 서비스 후");
        dst.listToDs(response,list);
    }

}
