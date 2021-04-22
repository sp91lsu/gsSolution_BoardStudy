function valid() {
    console.log('hey!!')
    var a = $('#name');
    var i = $('#id');
    var t = $('#subject');

    if (a.val() == "") {
        alert("작성자를 입력해주세요.");
        a.focus();
        return false;
    }
    else if (i.val() == "") {
        alert("ID를 입력해주세요.");
        i.focus();
        return false;
    } else if (t.val() == "") {
        alert("제목을 입력해주세요.");
        t.focus();
        return false;
    }

    return true;
}

