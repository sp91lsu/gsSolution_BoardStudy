package com.study.happy.service;

import java.util.List;
import java.util.Map;

public interface BoardService {
    List<Map<String, Object>> list();
    int write(Map<String, Object> map);

    Map<String, Object> one(int seqInt);

    void viewCntInc(int seqInt);

    Map<String, Object> miniOne(int seqInt);

    int update(Map<String, Object> map);

    int delete(List<String> seqList);


    List<Map<String, Object>> search(Map<String, String> schInfo);
}
