// 태그와 연결된 변수
var clock = document.querySelector('.timer');
var score_board = document.querySelector('.score');

// 연결된 태그의 기본 값
clock.innerHTML = "대기";

// 타이머용 변수
const LIMIT_TIME = 5;
var time = LIMIT_TIME;
var timer;

// 점수
var score = 0;
var game_start = false;

// 카드 관련
var card_num = 0;
var cards = [];
var pick_1 = -1;
var pick_2 = -1;

function start(){
    clock.innerHTML = "시작";
    score_board.innerHTML = "점수 : 0";
    score = 0;
    setTimeout(() => game_start = true, 1000);
    timer = setInterval(getTime, 1000);
}

function getTime(){
    if(time==-1){
        clock.innerHTML = "끝";
        clearInterval(timer);
        time = LIMIT_TIME;
        score_board.innerHTML = "점수 : "+score;
        game_start = false;
        return null
    }
    clock.innerHTML = "남은 시간 : "+(time--)+"초";
}

function getScore(){
    if(game_start){
        score += 100;
        score_board.innerHTML = "점수 : "+score;
    }
}

function test(){
    $("#board").append("<div onclick='clickCard("+(card_num)+")'class='card' id='card_"+(card_num)+"'>뒤</div>");
    cards[card_num++] = [false, 1];
}

function clickCard(num){
    var select_card = document.querySelector('#card_'+num);
    if(cards[num][0]){
        $('#card_'+num).css({"border-color": SELECT_CARD_COLOR});
        select_card.innerHTML = "뒤";
        pick_1 = -1;
        cards[num][0] = !cards[num][0];
    }
    else{
        $('#card_'+num).css({"border-color": BACK_OF_CARD_COLOR});
        select_card.innerHTML = cards[num][1];
        cards[num][0] = !cards[num][0];

        if(pick_1==-1){
            pick_1 = num;
        }else{
            console.log(pick_1);
            pick_2 = num;
            cardCheck();
        }
    }
}

function cardCheck(){
    if(cards[pick_1][1]==cards[pick_2][1]){
        getScore();
        $('#card_'+pick_1).attr("onclick", "");
        $('#card_'+pick_2).attr("onclick", "");
        pick_1 = -1;
        pick_2 = -1;
    }else{
        setTimeout(function(){
            console.log("test");
        $('#card_'+pick_1).css({"background-color": "#ffffff", "border-color": "#000000"});
        $('#card_'+pick_1).html("뒤");
        $('#card_'+pick_2).css({"background-color": "#ffffff", "border-color": "#000000"});
        $('#card_'+pick_2).html("뒤");

        cards[pick_1][0] = false;
        cards[pick_2][0] = false;
        pick_1 = -1;
        pick_2 = -1;

        }, 800);
    }
}

function init(){
    
}

init();