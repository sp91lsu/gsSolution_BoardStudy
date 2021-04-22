package com.study.happy.controller;

import com.study.happy.service.BoardService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Controller
public class BoardController {

    @Resource(name="service")
    private BoardService boardService;
    //리스트 뷰
    @RequestMapping("list")
    public String list(Model model){
        List<Map<String, Object>> list = boardService.list();
        model.addAttribute("list", list);
        return "board/list";
    }
    //글 작성 뷰
    @RequestMapping("write")
    public String write(Model model){
        return "board/write";
    }
    //글 등록 결과
    @RequestMapping(value = "writeOk",method = RequestMethod.POST)
    public String writeOk(@RequestParam Map<String, Object> map, Model model){
        System.out.println(map);
        int result = boardService.write(map);
        model.addAttribute("result",result);
        return "board/writeOk";
    }
    //글 정보 뷰
    @RequestMapping(value = "view",method = RequestMethod.POST)
    public String view(String seq, String isClick, Model model){
        int seqInt = Integer.parseInt(seq);
        //조회수 증가
        if(isClick.equals("true")){
            boardService.viewCntInc(seqInt);
        }
        //한 건 가져오기
        Map<String, Object> one = boardService.one(seqInt);
        model.addAttribute("one",one);

        return "board/view";
    }
    //글 수정 뷰
    @RequestMapping("update")
    public String update(String seq, @RequestParam Map<String, Object> map, Model model){
        int seqInt = Integer.parseInt(seq);
        //한 건 가져오기
        Map<String, Object> one = boardService.miniOne(seqInt);
        model.addAttribute("one",one);
        return "board/update";
    }
    //글 수정 진행
    @RequestMapping(value = "updateOk",method = RequestMethod.POST)
    public String updateOk(@RequestParam Map<String, Object> map, Model model){
        //한 건 받아서 수정
        int result = boardService.update(map);
        model.addAttribute("result",result);
        model.addAttribute("seq", map.get("seq"));
        return "board/updateOk";
    }

    //글 삭제
    @RequestMapping(value = "delete",method = RequestMethod.POST)
    public String delete(@RequestParam (value= "chk")List<String> seqList, Model model){
        System.out.println("hey"+seqList);
        int result = boardService.delete(seqList);
        if(result == 0){
            System.out.println("0개");
        }else {
            System.out.println(result+"성공");
        }
        model.addAttribute("result",result);
        return "board/deleteOk";
    }

}
