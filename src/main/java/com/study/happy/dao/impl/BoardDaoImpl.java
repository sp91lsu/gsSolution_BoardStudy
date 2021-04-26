package com.study.happy.dao.impl;

import com.study.happy.dao.BoardDao;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository("dao")
public class  BoardDaoImpl implements BoardDao {

    @Autowired
    private SqlSessionTemplate sqlSession;

    public BoardDao mapper(){
        return sqlSession.getMapper(BoardDao.class);
    }

    @Override
    public List<Map<String, Object>> list() {
        return mapper().list();
    }

    @Override
    public int write(Map<String, Object> map) {
        return mapper().write(map);
    }

    @Override
    public Map<String, Object> one(int seqInt) {
        return mapper().one(seqInt);
    }

    @Override
    public void viewCntInc(int seqInt) {
        mapper().viewCntInc(seqInt);
    }

    @Override
    public Map<String, Object> miniOne(int seqInt) {
        return mapper().miniOne(seqInt);
    }

    @Override
    public int update(Map<String, Object> map) {
        return mapper().update(map);
    }

    @Override
    public int delete(List<String> seqList) {
        return mapper().delete(seqList);
    }

    @Override
    public List<Map<String, Object>> search(Map<String, String> schInfo) {
        return mapper().search(schInfo);
    }

}
