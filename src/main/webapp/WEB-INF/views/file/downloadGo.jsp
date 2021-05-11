<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<html>
<head>
    <meta charset="UTF-8">
    <title>downloadView</title>
</head>
<script>
var fileDir = "D:/DevLSW/study/GSsolutionWS/goSpring/src/main/webapp/WEB-INF/views/file/fileRepository/";
var filePath = null;
var fileName = null;

function cat(){
    fileName = "20210503160832816_whiteCat.png";
    filePath = fileDir + fileName;
    console.log(filePath+"\n"+fileName)
    downRequest()
}
function bono(){
    fileName = "20210503160832811_bonobono.bmp";
    filePath = fileDir + fileName;
    console.log(filePath+"\n"+fileName)
    downRequest()
}
function excel(){
    fileName = "엑셀이라구.xlsx";
    filePath = fileDir + fileName;
    console.log(filePath+"\n"+fileName)
    downRequest()
}

function downRequest(){
    location.href = "/down?filePath="+filePath+"&fileName="+fileName;
}

</script>
<body>
    <a id="cat" href="javascript:cat()">고양이 다운로드</a>
    <a id="bono" href="javascript:bono()">보노보노 다운로드</a>
    <a id="excel" href="javascript:excel()">엑셀 다운로드</a>
</body>
</html>
