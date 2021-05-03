<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<html>
<head>
    <meta charset="UTF-8">
    <title>Upload</title>
</head>
<script>
    function check(thisFile){
        var ext = $(thisFile).val().split(".").pop().toLowerCase();
        var file  = thisFile.files[0];

        /*확장자 체크*/
        if($.inArray(ext,["gif","jpg","jpeg","png","bmp"]) == -1) {
            alert("gif, jpg, jpeg, png, bmp 파일만 업로드 해주세요.");
            $(thisFile).val("");
            return;
        }

        /*용량 체크*/
        var fileSize = file.size;
        var maxSize = 3 * 1024 * 1024; /*3MB*/
        if(fileSize > maxSize) {
            alert("파일용량을 초과하였습니다.");
            return;
        }

        /*이미지 사이즈 체크*/
        var _URL = window.URL || window.webkitURL;
        var img = new Image();

        img.src = _URL.createObjectURL(file);
        img.onload = function() {
            if(img.width > 500 || img.height > 500) {
                alert("가로 500px, 세로 500px로 이하로 맞춰서 올려주세요.");
                $(thisFile).val("");
            }
        }
    }
</script>
<body>
    <form  action="upload" method="post"  enctype="multipart/form-data">
        <input type="file" name="file1" id="file1" onchange="check(this)"><br>
        <input type="file" name="file2" id="file2" onchange="check(this)"><br>
        <input type="file" name="file3" id="file3" onchange="check(this)"><br>
        <input type="file" name="file4" id="file4" onchange="check(this)"><br>
        <br>
        <input type="submit" class="btn btn-primary btn-sm" value="업로드" id="uploadBtn">
    </form>
</body>
</html>
