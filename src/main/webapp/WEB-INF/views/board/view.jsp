<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
</head>
<body>
작성자: ${one.memName}<br>
ID: ${one.memId}<br>
제목: ${one.boardSubject}<br>
내용: ${one.boardContent}<br>
작성일: ${one.regDate}<br>
수정일: ${one.uptDate}<br>
조회수: ${one.viewCnt}<br><br>
<input type="button" value="목록으로" onclick="location.href='list'">
<input type="button" value="수정" onclick="location.href='update?seq=${one.seq}'" id="udtBtn">
<input type="button" value="삭제" onclick="location.href='delete?seq=${one.seq}'" id="udtBtn">
</body>

<script src="/JS/writeViewValidation.js"></script>
</html>
