// test code
var obj1 = document.querySelector('#obj1');
var obj2 = document.querySelector('#obj2');
var obj3 = document.querySelector('#obj3');
var obj4 = document.querySelector('#obj4');
var msg1 = document.querySelector('#message1')

var msg1_flag = 1;

obj1.onclick = function() {
    alert('1번 문제!');
    obj1.style.backgroundColor = "#FF1493";
}

obj2.onclick = function() {
    alert('2번 문제!');
    obj2.style.backgroundColor = "#FF1493";
}

obj3.onclick = function() {
    alert('3번 문제!');
    obj3.style.backgroundColor = "#FF1493";
}

obj4.onclick = function() {
    alert('4번 문제!');
    obj4.style.backgroundColor = "#FF1493";
}

msg1.onmouseover = function () {
    if (msg1_flag === 1) {
        alert('1번 메시지 : 책상에서 달그락 소리가 났다.');        
    } 
    msg1_flag = 0;
}

