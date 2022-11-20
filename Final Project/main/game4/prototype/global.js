// 해당 JavaScript에는 JS 파일 공용 변수 및 상수를 정의한다.

// 상수
const CARD_AMOUNT = 24;
const LIMIT_TIME = 90;
const CARD_ID = "#card_";
const SELECT_CARD_COLOR = "#ff0000";
const BACK_OF_CARD_COLOR = "#000000";
const FRONT_OF_CARD_IMG = ["../img/img_1.png","../img/img_2.png","../img/img_3.png","../img/img_4.png","../img/img_5.png",
"../img/img_6.png","../img/img_7.png","../img/img_8.png","../img/img_9.png","../img/img_10.png","../img/img_11.png","../img/img_12.png"];
const BACK_OF_CARD_IMG = "../img/back_img.png";
const TIMER_TEXT = document.querySelector('#timer');
const SCORE_BOARD = document.querySelector('#score');

// 변수
var timer = null;
var time = LIMIT_TIME;
var score = 0;
var pair = 0;
var game_start = 0;
var cards = [];
var pick_1 = -1;
var pick_2 = -1;