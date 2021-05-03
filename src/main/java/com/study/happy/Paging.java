package com.study.happy;

/*
<< < 1 2 3 4 5 > >>
처음 이전블락 페이지블락(pages) 다음블락 맨끝
*/
public class Paging {
    /*세팅값*/
    int rowsPerPage;
    int blockSize;
    /*페이지*/
    int curPage;
    /*DB 통신후*/
    int totRows;

    /*계산*/
    int totPage;
    int start_inBlock;
    int end_inBlock;

    public Paging(int rowsPerPage, int blockSize, int curPage, int totRows) {
        this.rowsPerPage = rowsPerPage;
        this.blockSize = blockSize;
        this.curPage = curPage;
        this.totRows = totRows;
        totPage = (int)Math.ceil( totRows / (rowsPerPage*1.0) );
        start_inBlock = (int)( (curPage-1) / blockSize*1.0 )  * blockSize  + 1;
        end_inBlock = start_inBlock + blockSize - 1;
        if(end_inBlock >= totPage) end_inBlock = totPage;
    }

    public int getRowsPerPage() {
        return rowsPerPage;
    }

    public int getBlockSize() {
        return blockSize;
    }

    public int getCurPage() {
        return curPage;
    }

    public int getTotRows() {
        return totRows;
    }

    public int getTotPage() {
        return totPage;
    }

    public int getStart_inBlock() {
        return start_inBlock;
    }

    public int getEnd_inBlock() {
        return end_inBlock;
    }
}
