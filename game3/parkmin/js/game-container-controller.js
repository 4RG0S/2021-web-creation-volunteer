var bgm_btn = document.querySelector('#unmute-bgm');
var bgm = document.querySelector('#bgm');

bgm_btn.onclick = function () {
    if (bgm.muted === true) {
        bgm.muted = false;
        this.innerText = '소리 끄기';
    } else {
        bgm.muted = true;
        this.innerText = '소리 켜기';
    }
}