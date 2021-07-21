// test code
var obj1 = document.querySelector('#obj1');
var obj2 = document.querySelector('#obj2');
var obj3 = document.querySelector('#obj3');
var obj4 = document.querySelector('#obj4');
var msg1 = document.querySelector('#message1');
var hidden_object = document.querySelectorAll('.hidden-object');
var clipboard = document.querySelector('#clipboard');

var msg1_flag = 1;


for (let i = 0; i < hidden_object.length; i++) {
    hidden_object[i].onmouseover = function () {
        var audio = new Audio('audio/select-obj.mp3');
        audio.volume = 0.5;
        audio.play();
    }
}


clipboard.onclick = function () {
    this.style.visibility = "hidden";
}

obj1.onclick = function() {
    var audio = new Audio('audio/paper-fliping.wav');
    audio.volume = 0.5;
    audio.play();

    alert('YWCA 직원에 대한 소개 책자이다. 잠긴 PC에 대한 힌트가 있을 것 같다.');
    obj1.style.opacity = 0.5;

    var clipboard = document.querySelector('#clipboard');
    clipboard.style.visibility = "visible";
}


obj2.onclick = function () {
    var audio = new Audio('audio/clock.mp3');
    audio.volume = 0.7;
    audio.play();

    alert('평범한 시계이다. 어째서인지 시침과 분침이 뽑혀져있다.');
    obj2.style.opacity = 0.5;
}

obj3.onclick = function() {
    var inputString = prompt('PC를 이용하려면 암호를 입력하세요.', '');
    if (inputString == "YWCA") {
        var audio = new Audio('audio/pc-start.wav');
        audio.volume = 0.5;
        audio.play();
        alert('DEBUG :: 다음 단계 게임 진행')
        obj3.style.opacity = 0.5;
        if (confirm('손전등 획득! 게임 성공시 탈출 화면으로 넘어가기?')) {
            document.location = "escape.html";
        }
        
    } else {
        var audio = new Audio('audio/pc-error.wav');
        audio.volume = 0.5;
        audio.play();
        alert('암호가 틀렸습니다.');
        alert('이 곳을 탈출하기 위해서는 PC를 이용해야할 것 같다.');
    }
}

msg1.onmouseover = function () {
    if (msg1_flag === 1) {
        var audio = new Audio('audio/knock.mp3');
        audio.play();
        alert('책상에서 부스럭 소리가 났다.');        
    } 
    msg1_flag = 0;
}

