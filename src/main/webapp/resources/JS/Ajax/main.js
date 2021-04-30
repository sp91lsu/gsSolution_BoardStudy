$(function (){
    $("#schBtn").click(function (){
        ajaxSearch(true)
    })
})

function ajaxSearch(isSchFormOne){
    var data;
    if(isSchFormOne){
        data = $("#schForm").serialize()
    }else{
        data = $("#schForm2").serialize()
    }
    //List 받아오기
    $.ajax({
        url :  "list.ajax",
        type : "POST",
        data : data,//보내는 데이터(TEXT)
        success : function(data, status){//받은 데이터(JSON) (서버에서는 문자열화 해서 보내지만 리턴값은 json 오브젝트다.)
            if(status == "success"){
                console.log("list.ajax Success!")
                console.log(data)
                listAjax(data);
            }
        },error:function(request,status,error){
            alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
        }
    });
}

function listAjax(result){
    var html = $('<div>').html(result);
    var contents = html.find("div#ajaxSection").html();
    $("#ajaxSection").html(contents)
    jspSetting()
}