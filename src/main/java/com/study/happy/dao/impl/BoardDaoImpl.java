package com.study.happy.dao.impl;

import com.study.happy.dao.BoardDao;
import org.apache.ibatis.session.SqlSession;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
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
        return sqlSession.getMapper(BoardDao.class).list();
    }

    @Override
    public int write(Map<String, Object> map) {
        return sqlSession.getMapper(BoardDao.class).write(map);
    }

    @Override
    public Map<String, Object> one(int seqInt) {
        return sqlSession.getMapper(BoardDao.class).one(seqInt);
    }

    @Override
    public void viewCntInc(int seqInt) {
        sqlSession.getMapper(BoardDao.class).viewCntInc(seqInt);
    }

    @Override
    public Map<String, Object> miniOne(int seqInt) {
        return sqlSession.getMapper(BoardDao.class).miniOne(seqInt);
    }

    @Override
    public int update(Map<String, Object> map) {
        return sqlSession.getMapper(BoardDao.class).update(map);
    }

    @Override
    public int delete(List<String> seqList) {
        return sqlSession.getMapper(BoardDao.class).delete(seqList);
    }

    @Override
    public List<Map<String, Object>> search(Map<String, String> schInfo) {
        return sqlSession.getMapper(BoardDao.class).search(schInfo);
    }

}
