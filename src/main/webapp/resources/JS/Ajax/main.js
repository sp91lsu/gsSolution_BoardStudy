$(function (){
    $("#schBtn").click(function (){
        ajaxSearch(true)
    })
})

function ajaxSearch(isSchForm1){
    console.log("isSchForm1: "+isSchForm1)
    var form = isSchForm1 ? $("#schForm") : $("#schForm2")
    var data = form.serialize()
    console.log(data)

    //List 받아오기
    $.ajax({
        url :  "list.ajax",
        type : "POST",
        data : data,//보내는 데이터(TEXT)
        success : function(data, status){//받은 데이터(JSON) (서버에서는 문자열화 해서 보내지만 리턴값은 json 오브젝트다.)
            if(status == "success"){
                console.log("list.ajax Success!")
                // console.log(data)
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
    fetchFromJSP()
    jspSetting()
    pageBlockSetting()
}