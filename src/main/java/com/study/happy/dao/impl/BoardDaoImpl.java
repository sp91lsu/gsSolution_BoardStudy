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

    @Override
    public List<Map<String, Object>> list() {
        return sqlSession.selectList("mapper.list");
    }

    @Override
    public int write(Map<String, Object> map) {
        return sqlSession.insert("mapper.write",map);
    }

    @Override
    public Map<String, Object> one(int seqInt) {
        return sqlSession.selectOne("mapper.one",seqInt);
    }

    @Override
    public void viewCntInc(int seqInt) {
        sqlSession.update("mapper.viewCntInc",seqInt);
    }

    @Override
    public Map<String, Object> miniOne(int seqInt) {
        return sqlSession.selectOne("mapper.miniOne",seqInt);
    }

    @Override
    public int update(Map<String, Object> map) {
        return sqlSession.update("mapper.update",map);
    }

    @Override
    public int delete(List<String> seqList) {
        return sqlSession.delete("mapper.delete",seqList);
    }
}
