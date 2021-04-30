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
<form name="frm" action="writeOk"  method="post" onsubmit="return valid()" >
작성자: <input type="text" name="name" id="name"><br>
ID: <input type="text" name="id" id="id"><br>
제목: <input type="text" name="subject" id="subject"><br>
내용: <textarea name="content" id="content"></textarea><br><br>
<input type="button" value="목록으로" onclick="location.href='list'">
<input type="submit" value="등록"  id="writeBtn">
</form>
</body>

<script src="/JS/writeViewValidation.js"></script>
</html>
