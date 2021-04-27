var page = 1;
var pageRows = 10;
var viewItem = undefined;   //  가장 최근에 view 한 글의 데이터

// 페이지 최초 로딩되면 게시글 목록 첫페이지분 로딩
// [이전] 버튼 눌렀을때 -> 이전 페이지 게시글목록 로딩
// [다음] 버튼 눌렀을때 -> 다음 페이지 게시글목록 로딩

$(document).ready(function(){
    // 페이지 최초 로딩되면 1페이지 분량 읽어오기
    loadPage(page);

    // // 글작성 버튼 누르면 팝업
    // $("#btnWrite").click(function(){
    //     setPopup("write");   // 글작성 으로 팝업 세팅
    //     $("#dlg_write").show();
    // });
	//
    // // 모달 대화상자 close 버튼 눌리면
    // $(".modal .close").click(function(){
    //     $(this).parents(".modal").hide();
    // });

    // // 글 작성 폼 submit 되면
    // $("#frmWrite").submit(function(){
    //     $(this).parents(".modal").hide();
    //     return chkWrite();
    // });
	//
    // // 글삭제 버튼 누르면
    // $("#btnDel").click(function(){
    //     chkDelete();
    // });
	//
	// // 글 읽기 (view) 대화상자에서 삭제버튼 누르면 해당 글 (uid) 삭제 진행
	// $("#viewDelete").click(function(){
	// 	//var uid = $("#dlg_write input[name='uid']").val();
	// 	var uid = viewItem.uid;
	// 	if(deleteUid(uid)){
	// 		$(this).parents(".modal").hide();  // 삭제 성공하면 대화상자 닫기
	// 	}
	// });
	
	// // 글 읽기 (view) 대화상자에서 수정버튼 누르면
	// $("#viewUpdate").click(function(){
	// 	//alert('hh');
	//
	// 	setPopup("update");
	// 	// 1. 기본 view 화면의 내용들이 그대로 update 를 위한 화면으로 넘어가기
	// });
	//
	// // 글 수정 완료 버튼 누르면
	// $("#updateOk").click(function(){
	// 	chkUpdate();
	// });


});


// page번째 목록 읽어오기
function loadPage(page){
    $.ajax({
        //   /board/{page}/{pageRows}
        //   현재  /board/rest
        url : "./" + page + "/" + window.pageRows,
        type : "GET",
        cache : false,
        success : function(data, status){
            if(status == "success"){
                //alert("정상적으로 받았쥬?");

                if(updateList(data)){
                    // 화면 업데이트 후, 페이지 정보 업데이트 

                    // 업데이트된 list 의 이벤트 동작...
                    addViewEvent();

                }


            }
        }

    });
} // end loadPage()

function updateList(jsonObj){
    result = "";  // 최종 결과물

    if(jsonObj.status == "OK"){
        var count = jsonObj.count;

        window.page = jsonObj.page;
        window.pageRows = jsonObj.pagerows;  // <-- fixed by '리정민' 

        var items = jsonObj.data;  // 글 배열

        var i;
        for(i = 0; i < count; i++){
            var date = new Date(items[i].regdate);

            result += "<tr>\n";
            result += "<td><input type='checkbox' name='uid' value='" + items[i].uid + "'>" + "</td>\n";
            result += "<td>" + items[i].uid + "</td>\n";
            result += "<td><span class='subject' data-uid='" + items[i].uid + "'>" + items[i].subject + "</span></td>\n";
            result += "<td>" + items[i].name + "</td>\n";
            result += "<td><span data-viewcnt='" + items[i].uid + "'>" + items[i].viewcnt + "</span></td>\n";
            result += "<td>" + date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + "</td>\n";
            result += "</tr>\n";
        }
        $("#list tbody").html(result);   // 글 목록 업데이트

        // 페이지 정보 업데이트
        $("#pageinfo").text(jsonObj.page + "/" + jsonObj.totalpage + "페이지, " + jsonObj.totalcnt +"개의 글");

        // pageRows
        var txt = "<select id='rows' onchange='changePageRows()'>\n";
        txt += "<option " + ((window.pageRows == 10) ? "selected" : "") + " value='10'>10개씩</option>\n";
        txt += "<option " + ((window.pageRows == 20) ? "selected" : "") + " value='20'>20개씩</option>\n";
        txt += "<option " + ((window.pageRows == 50) ? "selected" : "") + " value='50'>50개씩</option>\n";
        txt += "<option " + ((window.pageRows == 100) ? "selected" : "") + " value='100'>100개씩</option>\n";
        txt += "</select>\n";
        $("#pageRows").html(txt);

        // 페이징 정보 업데이트
        var pagination = buildPagination(jsonObj.writepages, jsonObj.totalpage, jsonObj.page, jsonObj.pageRows);
        $("#pagination").html(pagination);

        return true;
    } else {
        alert("내용이 없습니다");
        return false;
    }
}

// 페이징 생성
// 한페이징에 표시될 페이지수 --> writePages
// 총 페이지수 --> totalPage
// 현재 페이지 --> curPage

function buildPagination(writePages, totalPage, curPage, pageRows){
	var str = "";   // 최종적으로 페이징에 나타날 HTML 문자열 <li> 태그로 구성
	
	// 페이징에 보여질 숫자들 (시작숫자 start_page ~ 끝숫자 end_page)
    var start_page = ( (parseInt( (curPage - 1 ) / writePages ) ) * writePages ) + 1;
    var end_page = start_page + writePages - 1;

    if (end_page >= totalPage){
    	end_page = totalPage;
    }
    
  //■ << 표시 여부
	if(curPage > 1){
		str += "<li><a onclick='loadPage(" + 1 + ")' class='tooltip-top' title='처음'><i class='fas fa-angle-double-left'></i></a></li>\n";
	}
	
  	//■  < 표시 여부
    if (start_page > 1) 
    	str += "<li><a onclick='loadPage(" + (start_page - 1) + ")' class='tooltip-top' title='이전'><i class='fas fa-angle-left'></i></a></li>\n";
    
    //■  페이징 안의 '숫자' 표시	
	if (totalPage > 1) {
	    for (var k = start_page; k <= end_page; k++) {
	        if (curPage != k)
	            str += "<li><a onclick='loadPage(" + k + ")'>" + k + "</a></li>\n";
	        else
	            str += "<li><a class='active tooltip-top' title='현재페이지'>" + k + "</a></li>\n";
	    }
	}
	
	//■ > 표시
    if (totalPage > end_page){
    	str += "<li><a onclick='loadPage(" + (end_page + 1) + ")' class='tooltip-top' title='다음'><i class='fas fa-angle-right'></i></a></li>\n";
    }

	//■ >> 표시
    if (curPage < totalPage) {
        str += "<li><a onclick='loadPage(" + totalPage + ")' class='tooltip-top' title='맨끝'><i class='fas fa-angle-double-right'></i></a></li>\n";
    }

    return str;
} // end buildPagination


// <select> 에서  pageRows 값 변경할때마다
function changePageRows(){
    window.pageRows = $("#rows").val();
    loadPage(window.page);
}
