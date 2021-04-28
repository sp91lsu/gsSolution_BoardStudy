<%@ page import="java.util.Map" %>
<%@ page import="java.util.List" %>
<%@ page import="java.math.BigDecimal" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<link rel="stylesheet" href="JS/jquery-ui-1.12.1/jquery-ui.min.css">
<script src="JS/jquery-ui-1.12.1/jquery-ui.min.js"></script>
<script src="JS/jquery-ui-1.12.1/datepicker-ko.js"></script>
<script src="https://kit.fontawesome.com/bb29575d31.js"></script>

<script src="JS/preventViewInc.js"></script>
<script src="JS/datePicker.js"></script>


<link rel="stylesheet" type="text/css" href="CSS/common.css"/>
<%
    /*변수받아오기*/
    Map<String, Object> map = (Map<String, Object>) request.getAttribute("info");
    int rowsPerPage = Integer.parseInt((String)map.get("rowsPerPage"));
    int blockSize = (Integer)map.get("blockSize");
    int curPage = Integer.parseInt((String)map.get("curPage"));
    System.out.println("curPage"+curPage);
    List<Map<String, Object>> list = (List<Map<String, Object>>) request.getAttribute("list");
    /*계산*/
    int totRows = ((BigDecimal)list.get(0).get("totRows")).intValue();
    int totPage = (int)Math.ceil( totRows / (rowsPerPage*1.0) );
    int start_page = (int)( (curPage-1) / blockSize*1.0 )  * blockSize  + 1;
    int end_page = start_page + blockSize - 1;
    if (end_page >= totPage){
        end_page = totPage;
    }
%>

<html>
<head>
    <meta charset="UTF-8">
    <title>Board_Study</title>
</head>

<body>

<div class="outer">
<div>
<input id="home" type="button" value="Home" onclick="location.href='list'"><br>
<%--검색 폼--%>
<form name="schForm" action="list">
    <%--검색--%>
    <select name="scope">
            <option value="작성자"
                    <c:if test="${info.scope=='작성자'}">selected="selected"</c:if>>작성자</option>
            <option value="제목"
                    <c:if test="${info.scope=='제목'}">selected="selected"</c:if>>제목</option>
            <option value="제목내용"
                    <c:if test="${info.scope=='제목내용'}">selected="selected"</c:if>>제목+내용</option>
    </select>
    <input name="schText" type="text" value="${info.schText}"><br>
    <%--달력--%>
    <input type="text" name="date1" id="date1" size="12" placeholder="First Date (Click)" value="${info.date1}"/>&nbsp; ~&nbsp;
    <input type="text" name="date2" id="date2" size="12" placeholder="Last Date (Click)" value="${info.date2}"/>
    <%--행수--%>
    <input name="rowsPerPage" type="hidden" value="<%= rowsPerPage %>">
    <input id="schBtn" type="submit" value="검색"><br>
</form>
<%--
    <검색 폼 데이터 임시저장하는 곳>
    -검색 정보를 컨트롤러로 보내면 다시 컨트롤러에서
    list.jsp로 검색정보를 리턴하고 이곳에 저장한다.
    -용도: 검색버튼을 눌러서 '새로운 검색 정보'로 리스트를 받아오는게 아니라
    페이지 번호를 누를때 '기존 검색 정보'와 '페이지 번호'를 서버로 보내고 해당 리스트를 받아온다.
--%>
<form name="schForm2" action="list">
    <input name="scope" type="hidden" value="${info.scope}">
    <input name="schText" type="hidden" value="${info.schText}">
    <input name="date1" type="hidden" value="${info.date1}">
    <input name="date2" type="hidden" value="${info.date2}">
    <input name="curPage" id="curPage" type="hidden" value="${info.curPage}">
    <input name="fromRow" id="fromRow" type="hidden" value="${info.fromRow}">
    <input name="rowsPerPage" type="hidden" value="<%= rowsPerPage %>">
</form>
    <%--전송할 필요없는 페이지 정보--%>
    <input id="rowsPerPage" type="hidden" value="<%= rowsPerPage %>">
    <input id="blockSize" type="hidden" value="<%= blockSize %>">
    <input id="totRows" type="hidden" value="<%= totRows %>">
    <input id="totPage" type="hidden" value="<%= totPage %>">
    <input id="start_page" type="hidden" value="<%= start_page %>">
    <input id="end_page" type="hidden" value="<%= end_page %>">

<%--검색 및 페이지 정보--%>
<table border = "1" style="border-collapse: collapse">
    <tr>
        <th>총 글 개수</th>
        <th>검색타입</th>
        <th>검색어</th>
        <th>기간</th>
    </tr>
    <tr>
        <td><span><%= totRows %></span>개</td>
        <td><span>${info.scope}</span></td>
        <td><span>${info.schText}</span></td>
        <td><span>${info.date1}</span>&nbsp;~&nbsp;<span>${info.date2}</span></td>
    </tr>
</table>
    <br>
<%--글등록/삭제/행수 섹션--%>
<div>
    <input type="button" id="mkBtn" value="글쓰기" onclick="location.href='write'">
    <input type="submit" form="frm" id="delBtn" value="삭제" onclick="location.href='delete'">
    <%--행수--%>
    <select id="rowsSelect" style="float: right">
        <option value="7">7개</option>
        <option value="10">10개</option>
        <option value="15">15개</option>
        <option value="30">30개</option>
        <option value="50">50개</option>
    </select>
</div>
<%--리스트--%>
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
</div>
</div>

<%--페이징 --%>
<%--<jsp:include page="pagination.jsp">--%>
<%--    <jsp:param value="10" name="blockSize"/>--%>
<%--    <jsp:param value="<%= totalPage %>" name="totalPage"/>--%>
<%--    <jsp:param value="1" name="curPage"/>--%>
<%--</jsp:include>--%>
<c:set var="cPage" value="<%=curPage%>" />
<div class="outer">
    <ul class="pagination" id="pagination">
        <li id="angle1"><a class='tooltip-top' title='처음' onclick="loadPage(1)"><i class='fas fa-angle-double-left'></i></a></li>
        <li id="angle2"><a class='tooltip-top' title='이전블락' onclick="prevBlock()"><i class='fas fa-angle-left'></i></a></li>
        <c:forEach var="i" begin="<%=start_page%>" end="<%=end_page%>">
            <c:choose>
                <c:when test="${cPage==i}">
                    <li><a class='active tooltip-top' title='현재페이지' onclick="loadPage(${i})">${i}</a></li>
                </c:when>
                <c:otherwise>
                    <li><a class='tooltip-top' title='페이지' onclick="loadPage(${i})">${i}</a></li>
                </c:otherwise>
            </c:choose>
        </c:forEach>
        <li id="angle3"><a class='tooltip-top' title='다음블락' onclick="nextBlock()"><i class='fas fa-angle-right'></i></a></li>
        <li id="angle4"><a class='tooltip-top' title='마지막' onclick="loadPage(<%=totPage%>)"><i class='fas fa-angle-double-right'></i></a></li>
    </ul>
    <div id="pageMove">
        <input type="number" id="pageInput" style="width: 60px">/<span id="totPage2"><%=totPage%></span><input type="button" onclick="loadPageInput()" value="이동">
    </div>
</div>
</body>
<script src="JS/pagination.js"></script>
</html>
