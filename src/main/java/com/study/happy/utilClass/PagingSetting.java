package com.study.happy.utilClass;

public class PagingSetting {
    private static PagingSetting instance;

    private PagingSetting(){}

    public static synchronized PagingSetting getInstance(){
        if(instance == null){
            instance = new PagingSetting();
        }
        return instance;
    }
    /*Field 세팅값*/
    private int blockSize = 5;
    private int rowsPerPage = 10;

    int fromRow(Object pageNumStr){
        int pageNum = Integer.parseInt((String)pageNumStr);
        return (pageNum-1)*rowsPerPage +1;
    }

    public int getBlockSize() {
        return blockSize;
    }

    public int getRowsPerPage() {
        return rowsPerPage;
    }

    public void setRowsPerPage(int rowsPerPage) {
        this.rowsPerPage = rowsPerPage;
    }
}
