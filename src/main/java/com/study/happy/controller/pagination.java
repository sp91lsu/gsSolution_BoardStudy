package com.study.happy.controller;

public class pagination {
    private static pagination instance;

    private pagination(){}

    public static synchronized pagination getInstance(){
        if(instance == null){
            instance = new pagination();
        }
        return instance;
    }
    /*Field*/
    int blockSize = 5;
    int rowsPerPage = 10;

    int fromRow(Object pageNumStr){
        int pageNum = Integer.parseInt((String)pageNumStr);
        return (pageNum-1)*rowsPerPage +1;
    }
}
