function submitAuthKey(){
    var authKey = document.getElementById('authKey').value;
    authKey = parseInt(authKey);
    if(authKey === 7423){
        var resultAlertTag =  document.getElementById('resultAlert');
        resultAlertTag.className = "alert alert-primary";
        resultAlertTag.innerHTML="정답입니다";
        resultAlertTag.style.display="block";
        setTimeout(function() {
            alert('갑자기 PC 앞에 서랍이 열리더니 손전등이 나왔다....');
            if (confirm("손전등을 가지고 이제 방을 열고 빨리 나가자!")) {
                document.location = "../../parkmin/escape.html";
            }
        }, 800);
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
