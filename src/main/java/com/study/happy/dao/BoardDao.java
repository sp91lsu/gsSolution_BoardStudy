package com.study.happy.dao;

import org.mybatis.spring.annotation.MapperScan;

import java.util.List;
import java.util.Map;

@MapperScan
public interface BoardDao {
    List<Map<String, Object>> list(Map<String, Object> map);

    int write(Map<String, Object> map);

    Map<String, Object> one(int seqInt);

    void viewCntInc(int seqInt);

    Map<String, Object> miniOne(int seqInt);

    int update(Map<String, Object> map);

    int delete(List<String> seqList);


    List<Map<String, Object>> search(Map<String, String> schInfo);

    List<Map<String, Object>> periodSch(Map<String, String> schInfo);
}
