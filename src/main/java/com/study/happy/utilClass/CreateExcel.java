package com.study.happy.utilClass;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFDataFormat;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import javax.servlet.ServletOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

/*
poi 사용
List<Map<String,Object>> 타입의 리스트를 엑셀로 변환하여 다운로드 하는 클래스
*/
public class CreateExcel {
    public void listToExcelToOneDir(String savePath, String fileName, List<Map<String, Object>> list){
        //저장경로  "C:/excelTest/"
        //파일명  "grade.xlsx"
        XSSFWorkbook wb = new XSSFWorkbook();
        Sheet sheet1 = wb.createSheet("게시판");

        Row row = null;
        Cell cell = null;

        int rowIdx = 0;

        /* 헤더 */
        row = sheet1.createRow(rowIdx++);
        String[] header = {"글번호","작성자(ID)","제목","작성일","수정일","조회수"};
        for(int i=0; i<header.length; i++) {
            cell = row.createCell(i);
            cell.setCellValue(header[i]);
            cell.setCellStyle(cellStyle(wb, "head",i)); // 셀 스타일 적용
        }

        /* 데이터 */
        for( Map<String,Object> rowMap : list ){
            row = sheet1.createRow(rowIdx++);
            int cellIdx = 0;

            for (int i = 0; i < header.length; i++) {
                cell = row.createCell(cellIdx++);
                if(i==0) { cell.setCellValue(((BigDecimal)rowMap.get("seq")).intValue());}
                if(i==1) { cell.setCellValue(rowMap.get("memName").toString()+"("+rowMap.get("memId").toString()+")"); }
                if(i==2) { cell.setCellValue(rowMap.get("boardSubject").toString()); }
                if(i==3) { cell.setCellValue(((Timestamp)rowMap.get("regDate")).toLocalDateTime()); }
                if(i==4) {
                    if(rowMap.containsKey("uptDate")){
                        cell.setCellValue(((Timestamp)rowMap.get("uptDate")).toLocalDateTime());
                    }else{ cell.setCellValue(""); }
                }
                if(i==5) { cell.setCellValue(Integer.parseInt((String)rowMap.get("viewCnt"))); }
                cell.setCellStyle(cellStyle(wb, "data",i));
            }
        }
        /* Column Width */
        sheet1.setColumnWidth(0,2000);
        sheet1.setColumnWidth(1,7000);
        sheet1.setColumnWidth(2,7000);
        sheet1.setColumnWidth(3,6000);
        sheet1.setColumnWidth(4,6000);
        sheet1.setColumnWidth(5,2000);

        // excel 파일 저장
        try {
            File xlsFile = new File(savePath +fileName); //저장경로 설정
            FileOutputStream fileOut = new FileOutputStream(xlsFile);
            wb.write(fileOut);
            ServletOutputStream so = null;
            wb.write(so);
            System.out.println("엑셀 생성 성공!!");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
    public XSSFWorkbook listToExcelWorkBook(List<Map<String, Object>> list) {
        XSSFWorkbook wb = new XSSFWorkbook();
        Sheet sheet1 = wb.createSheet("게시판");

        Row row = null;
        Cell cell = null;

        int rowIdx = 0;

        /* 헤더 */
        row = sheet1.createRow(rowIdx++);
        String[] header = {"글번호","작성자(ID)","제목","작성일","수정일","조회수"};
        for(int i=0; i<header.length; i++) {
            cell = row.createCell(i);
            cell.setCellValue(header[i]);
            cell.setCellStyle(cellStyle(wb, "head",i)); // 셀 스타일 적용
        }

        /* 데이터 */
        for( Map<String,Object> rowMap : list ){
            row = sheet1.createRow(rowIdx++);
            int cellIdx = 0;

            for (int i = 0; i < header.length; i++) {
                cell = row.createCell(cellIdx++);
                if(i==0) { cell.setCellValue(((BigDecimal)rowMap.get("seq")).intValue());}
                if(i==1) { cell.setCellValue(rowMap.get("memName").toString()+"("+rowMap.get("memId").toString()+")"); }
                if(i==2) { cell.setCellValue(rowMap.get("boardSubject").toString()); }
                if(i==3) { cell.setCellValue(((Timestamp)rowMap.get("regDate")).toLocalDateTime()); }
                if(i==4) {
                    if(rowMap.containsKey("uptDate")){
                        cell.setCellValue(((Timestamp)rowMap.get("uptDate")).toLocalDateTime());
                    }else{ cell.setCellValue(""); }
                }
                if(i==5) { cell.setCellValue(Integer.parseInt((String)rowMap.get("viewCnt"))); }
                cell.setCellStyle(cellStyle(wb, "data",i));
            }
        }
        /* Column Width */
        sheet1.setColumnWidth(0,2000);
        sheet1.setColumnWidth(1,7000);
        sheet1.setColumnWidth(2,7000);
        sheet1.setColumnWidth(3,6000);
        sheet1.setColumnWidth(4,6000);
        sheet1.setColumnWidth(5,2000);

        return wb;
    }

    //Column의 타입에 따른 형변환
    public <T extends Object> T castFromObj(Object obj,String[] columnArr,Class<T>[] classArr) {
        Class<T> type=null;
        return type.cast(obj);
    }
    
    //컬럼들의 타입 확인 메소드
    void checkColumnsType(Map<String,Object> map){
        for (String key : map.keySet()) {
            System.out.println( String.format("%s 의 타입: %s", key, map.get(key).getClass()));
        }
    }

    //셀 스타일 설정하는 함수
    CellStyle cellStyle(XSSFWorkbook wb, String kind,int loopCnt) {

        CellStyle cellStyle = wb.createCellStyle();
        XSSFDataFormat format = wb.createDataFormat();
        cellStyle.setVerticalAlignment(VerticalAlignment.CENTER); //중앙 정렬

        if(kind.equals("head")) {
            cellStyle.setFillForegroundColor(IndexedColors.YELLOW.getIndex()); //노란색
            cellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND); //색상 패턴처리
            cellStyle.setAlignment(HorizontalAlignment.CENTER); //가운데 정렬
        }else if(kind.equals("data")) {
            if(loopCnt==3 || loopCnt==4) cellStyle.setDataFormat(format.getFormat("yyyy/dd/mm hh:mm:ss AM/PM"));
            cellStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex()); //회색 25%
            cellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND); //색상 패턴처리
            cellStyle.setAlignment(HorizontalAlignment.LEFT); //왼쪽 정렬
        }

        return cellStyle;
    }

}


