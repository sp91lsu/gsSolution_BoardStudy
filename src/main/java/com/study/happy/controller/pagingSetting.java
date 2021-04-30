package com.study.happy.controller;

public class pagingSetting {
    private static pagingSetting instance;

    private pagingSetting(){}

    public static synchronized pagingSetting getInstance(){
        if(instance == null){
            instance = new pagingSetting();
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
