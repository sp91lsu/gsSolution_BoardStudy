package com.study.happy.service.impl;

import com.study.happy.dao.BoardDao;
import com.study.happy.service.BoardService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

@Service("service")
public class BoardServiceImpl implements BoardService {

    @Resource(name = "dao")
    private BoardDao boardDao;

    @Override
    public List<Map<String, Object>> list() {
        return boardDao.list();
    }

    @Override
    public int write(Map<String, Object> map) {
        return boardDao.write(map);
    }

    @Override
    public Map<String, Object> one(int seqInt) {
        return boardDao.one(seqInt);
    }

    @Override
    public void viewCntInc(int seqInt) {
        boardDao.viewCntInc(seqInt);
    }

    @Override
    public Map<String, Object> miniOne(int seqInt) {
        return boardDao.miniOne(seqInt);
    }

    @Override
    public int update(Map<String, Object> map) {
        return boardDao.update(map);
    }

    @Override
    public int delete(List<String> seqList) {
        return boardDao.delete(seqList);
    }

}