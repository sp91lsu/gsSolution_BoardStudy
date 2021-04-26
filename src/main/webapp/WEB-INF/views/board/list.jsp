<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<html>
<head>
    <meta charset="UTF-8">
    <title>Board_Study</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
</head>
<script>
    $(function (){
        /*함수바인딩*/
        $('#schBtn').click(function (){
            searchGo()
        });
    })

    function searchGo(){
        var scope = $("#searchScope").val()
        var schText = $("#schText").val()
        location.href="search?scope="+scope+"&schText="+schText
    }

    /*새로고침시 조회수 증가를 막기위한 조치:post로 보내기*/
    function post_to_url(path, params, method) {
        method = method || "post";

        var form = document.createElement("form");
        form.setAttribute("method", method);
        form.setAttribute("action", path);

        for(var key in params) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);
            form.appendChild(hiddenField);
        }
        document.body.appendChild(form);
        form.submit();
    }



</script>

<body>
<input id="home" type="button" value="Home" onclick="location.href='list'"><br>
<select id="searchScope">
        <option value="작성자">작성자</option>
        <option value="제목">제목</option>
        <option value="제목내용">제목+내용</option>
</select>
<input id="schText" type="text">
<input id="schBtn" type="button" value="검색"><br>
<input type="button" id="mkBtn" value="글쓰기" onclick="location.href='write'">
<input type="submit" form="frm" id="delBtn" value="삭제" onclick="location.href='delete'">
<table border = "1">
    <tr>
        <th>글번호</th>
        <th>작성자(ID)</th>
        <th>제목</th>
        <th>작성일</th>
        <th>수정일</th>
        <th>조회수</th>
    </tr>
    <form name="frm" id="frm" action="delete" method="post">
    <c:forEach items="${list}" var = "list" varStatus="i">
        <tr>
            <td><input type="checkbox" name="chk" value="${list.seq}">${list.seq}</td>
            <td>${list.memName}(${list.memId})</td>
            <td><a href="javascript:post_to_url('view?seq=${list.seq}',{'isClick':'true'})">${list.boardSubject}"</a></td>
            <td>${list.regDate}</td>
            <td>${list.uptDate}</td>
            <td>${list.viewCnt}</td>
        </tr>
    </c:forEach>
    </form>

</table>
</body>
</html>
