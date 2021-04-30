var curPage = 1
var rowsPerPage = 10
var blockSize = 5
var start_page = 1
var end_page = 0
var totPage = 0

$(function (){
    fetchFromJSP()
    jspSetting()
    pageBlockSetting()
    $("#rowsSelect").change(function (){
        console.log("select 클릭")
        $("input[name='rowsPerPage']").val($("#rowsSelect").val())
    })
})

function fetchFromJSP(){
    curPage = parseInt($('#curPage').val())
    rowsPerPage = parseInt($('#rowsPerPage').val())
    start_page = parseInt($('#start_page').val())
    blockSize = parseInt($('#blockSize').val())
    totPage = parseInt($('#totPage').val())
    end_page = parseInt($('#end_page').val())
}
function jspSetting(){
    var rowsPerPage = $("#rowsPerPage").val()
    $("#rowsSelect").val(rowsPerPage).prop('selected',true)
}
function loadPage(pageToMove){
    $("#curPage").val(pageToMove)
    var fromRow = (pageToMove-1)*rowsPerPage +1;
    $("#fromRow").val(fromRow)
    $("#rowsPerPage").val($("#rowsSelect").val())
    ajaxSearch(false)
}
function loadPageInput(){
    var pageToMove = $('#pageInput').val()
    loadPage(pageToMove)
}
function pageBlockSetting(){
    //■ << 표시 여부
    if(curPage <= 1){
        $("#angle1").css('display','none')
    }
    //■  < 표시 여부
    if (start_page === 1){
        $("#angle2").css('display','none')
    }
    //■  > 표시 여부
    if(totPage-end_page === 0){
        $("#angle3").css('display','none')
    }
    //■ >> 표시 여부
    if (totPage <= 1){
        $("#angle4").css('display','none')
    }
}
function prevBlock(){
    loadPage(start_page-blockSize)
}
function nextBlock(){
    loadPage(start_page+blockSize)
}

function test(){
    console.log("test!")
}

