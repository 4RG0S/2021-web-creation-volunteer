function submitAuthKey(){
    var authKey = document.getElementById('authKey').value;
    authKey = parseInt(authKey);
    if(authKey === 3924){
        var resultAlertTag =  document.getElementById('resultAlert');
        resultAlertTag.className = "alert alert-primary";
        resultAlertTag.innerHTML="정답입니다";
        resultAlertTag.style.display="block";
    }
    else{
        var resultAlertTag =  document.getElementById('resultAlert');
        resultAlertTag.className = "alert alert-danger";
        resultAlertTag.innerHTML="틀렸습니다...다시 시도하세요..";
        resultAlertTag.style.display="block";
    }
}
function modalClose(){
    document.getElementById('authKey').value="";

    var resultAlertTag =  document.getElementById('resultAlert');
    resultAlertTag.innerHTML="";
    resultAlertTag.style.display="none";
}
