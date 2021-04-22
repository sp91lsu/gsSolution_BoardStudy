<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<c:choose>
    <c:when test="${result==0}">
        <script>
            alert("수정 실패!!")
            history.back();
        </script>
    </c:when>

    <c:otherwise>
        <script>
            var v = "false";
            document.write('<form action="view?seq=${seq}" id="smb_form" method="post"><input type="hidden" id="isClick" name="isClick" value="'+ v +'"></form>');
            document.getElementById("smb_form").submit();
        </script>
    </c:otherwise>
</c:choose>
