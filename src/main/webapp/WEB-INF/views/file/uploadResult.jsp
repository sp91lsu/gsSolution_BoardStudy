<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<html>
<head>
    <meta charset="UTF-8">
    <title>UploadResult</title>
</head>
<body>
<pre>
<c:forEach var="rMap" items="${resMap}">
${rMap.key}
    <c:forEach var="fileInfoMap" items="${rMap.value}">
    ${fileInfoMap.key} : ${fileInfoMap.value}
    </c:forEach>
</c:forEach>
</pre>
</body>
</html>
