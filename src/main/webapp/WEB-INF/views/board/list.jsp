<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<link rel="stylesheet" href="JS/jquery-ui-1.12.1/jquery-ui.min.css">
<script src="JS/jquery-ui-1.12.1/jquery-ui.min.js"></script>
<script src="JS/jquery-ui-1.12.1/datepicker-ko.js"></script>

<script src="JS/preventViewInc.js"></script>
<script src="JS/datePicker.js"></script>
<script src="JS/pagination.js"></script>

<link rel="stylesheet" type="text/css" href="CSS/common.css"/>
<html>
<head>
    <meta charset="UTF-8">
    <title>Board_Study</title>
</head>

<body>
<input id="home" type="button" value="Home" onclick="location.href='list'"><br>
<%--검색 폼--%>
<form name="schForm" action="list">
    <%--검색--%>
    <select name="scope">
            <option value="작성자">작성자</option>
            <option value="제목">제목</option>
            <option value="제목내용">제목+내용</option>
    </select>
    <input name="schText" type="text"><br>
    <%--달력--%>
    <input type="text" name="date1" id="date1" size="12" placeholder="First Date (Click)"/>&nbsp; ~&nbsp;
    <input type="text" name="date2" id="date2" size="12" placeholder="Last Date (Click)"/>
    <%--페이지 정보--%>
    <input name="page" type="hidden" value="1">
    <input name="rows" type="hidden" value="8">
    <input id="schBtn" type="submit" value="검색"><br>
</form>
<%--
    <검색 폼 데이터 임시저장하는 곳>
    -검색 정보를 컨트롤러로 보내면 다시 컨트롤러에서
    list.jsp로 검색정보를 리턴하고 이곳에 저장한다.
    -용도: 검색버튼을 눌러서 '새로운 검색 정보'로 리스트를 받아오는게 아니라
    페이지 번호를 누를때 '기존 검색 정보'와 '페이지 번호'에 부합하는 리스트를 받아온다.
--%>
<form name="schForm2" action="list">
    <input name="scope" type="hidden" value="${schInfo.scope}">
    <input name="schText" type="hidden" value="${schInfo.schText}">
    <input name="date1" type="hidden" value="${schInfo.date1}">
    <input name="date2" type="hidden" value="${schInfo.date2}">
    <input id="schBtn2" type="submit" value="검색"><br>
</form>
<%--글등록/삭제--%>
<input type="button" id="mkBtn" value="글쓰기" onclick="location.href='write'">
<input type="submit" form="frm" id="delBtn" value="삭제" onclick="location.href='delete'">
<%--리스트--%>
<div>총 글 개수: ${list.size()}</div>
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
            <td><a href="javascript:post_to_url('view?seq=${list.seq}',{'isClick':'true'})">${list.boardSubject}</a></td>
            <td>${list.regDate}</td>
            <td>${list.uptDate}</td>
            <td>${list.viewCnt}</td>
        </tr>
    </c:forEach>
    </form>
</table>

<%--페이징 --%>
<div class="center">
    <ul class="pagination" id="pagination">
        <li><a onclick='loadPage(" + 1 + ")' class='tooltip-top' title='처음'><i class='fas fa-angle-double-left'></i></a></li>
        <li><a onclick='loadPage(" + (start_page - 1) + ")' class='tooltip-top' title='이전'><i class='fas fa-angle-left'></i></a></li>
    </ul>
</div>
</body>
</html>
