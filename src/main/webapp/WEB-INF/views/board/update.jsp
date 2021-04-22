<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
</head>
<script>
    function valid(){
        var s = $('#subject');

        if (s.val() == "") {
            alert("제목을 입력해주세요.");
            s.focus();
            return false;
        }

        return true;
    }
</script>
<body>
<form name="frm" action="updateOk"  method="post" onsubmit="return valid()" >
<input type="hidden" name="seq" value="${one.seq}">
작성자: ${one.memName}<br>
ID: ${one.memId}<br>
제목: <input type="text" name="subject" id="subject" value="${one.boardSubject}"><br>
내용: <textarea name="content" id="content">${one.boardContent}</textarea><br><br>
<input type="button" value="이전으로 가기" onclick="history.back()">
<input type="submit" value="수정하기" id="uptBtn">
</form>
</body>

</html>
