var key = document.querySelector('#key');
var door = document.querySelector('#knock-door-area');
var game_closing_sheet = document.querySelector('#game-closing');

var key_aquire = 0;
var door_knock_cnt = 0;

var audio = new Audio('audio/walk.mp3');
audio.volume = 0.5;
audio.play();

key.onmouseover = function () {
    if (key_aquire == 0) {
        var audio = new Audio('audio/select-obj.mp3');
        audio.volume = 0.5;
        audio.play();
    }
}

key.onclick = function () {
    if (key_aquire == 0) {
        var audio = new Audio('audio/catch-key.mp3');
        audio.volume = 0.5;
        audio.play();
        key_aquire = 1;
        key.style.visibility = "hidden";
        key.style.top = "1000000px";
        key.style.left = "1000000px";
    }
}

door.onclick = function () {
    if (key_aquire == 0) {
        if (door_knock_cnt < 2) {
            var audio = new Audio('audio/open-door-fail.mp3');
            audio.volume = 0.5;
            audio.play();
            door_knock_cnt += 1;
        } else {
            alert('열쇠가 있어야 열 수 있을 것 같다.');
            door_knock_cnt = 0;
        }
    } else if (key_aquire == 1) {
        var audio = new Audio('audio/open-door-ok.mp3');
        audio.volume = 0.5;
        audio.play();
        alert('문이 열렸다..');
        game_closing_sheet.style.opacity = 1;
        setTimeout(() => {
            window.parent.location.href = "credit.html";
        }, 3000);
    } else {
        alert('SYSTEM ERROR!');
    }
}