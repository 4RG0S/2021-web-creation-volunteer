// 게임을 시작하는 함수
function startGame(){
    $("#start-button").attr("onclick", "");
    TIMER_TEXT.innerHTML = "외우세요!";
    resetGame();
    createCard();
    setTimeout(() => timer = setInterval(startTimer, 1000), 2000);
}


// 게임 기록을 초기화하는 함수
function resetGame(){
    timer = null;
    time = LIMIT_TIME;
    score = 0;
    pair = 0;
    game_start = 0;
    cards = [];
    pick_1 = -1;
    pick_2 = -1;

    $("#board").remove();
    $("#main").append("<div id='board'></div>");
    SCORE_BOARD.innerHTML = score;
}


// 최종 게임결과를 보여주는 함수
function showResult(){
    devatieAllCard();
    TIMER_TEXT.innerHTML = "끝";
    clearInterval(timer);
    $("#start-button").attr("onclick", "startGame()");
}


// 카드를 화면에 삽입하는 함수
function createCard(){
    // 카드의 쌍을 랜덤하게 설정
    randomizeCard();

    // 카드를 화면에 추가
    for(i=0; i<CARD_AMOUNT; i++){
        $("#board").append("<div onclick='' class='card' id='card_"+(i)+"'>\
        <img class='card_img' src="+(BACK_OF_CARD_IMG)+" alt='카드 뒷면'>\
        </div>");
    }

    // 카드의 앞면을 공개
    showAllCard();

    // 잠시 후 카드를 모두 뒤집고 클릭 활성화
    setTimeout(
        function(){
            flipAllCard();
            activatieAllCard();
        }, 3000);
}


// 카드의 값을 랜덤하게 설정하는 함수
function randomizeCard(){
    for(i = 0; i<CARD_AMOUNT/2; i++){
        cards[i] = [false, i];
        cards[i+CARD_AMOUNT/2] = [false, i];
    }

    for (let i = cards.length - 1; i > 0; i--) {
    	let j = Math.floor(Math.random() * (i + 1));
    	[cards[i][1], cards[j][1]] = [cards[j][1], cards[i][1]];
  	}
}


// 화면 내 모든 카드를 앞면으로 바꿔주는 함수
function showAllCard(){
    for(i=0; i<CARD_AMOUNT; i++){
        $(CARD_ID+i).css({"border-color": SELECT_CARD_COLOR});
        $(CARD_ID+i).html("<img class='card_img' src="+(FRONT_OF_CARD_IMG[cards[i][1]])+" alt='카드 앞면"+(cards[i][1])+"'>");
        cards[i][0] = true;
    }
}


// 화면 내 모든 카드를 뒷면으로 바꿔주는 함수
function flipAllCard(){
    for(i=0; i<CARD_AMOUNT; i++){
        $(CARD_ID+i).css({"border-color": BACK_OF_CARD_COLOR});
        $(CARD_ID+i).html("<img class='card_img' src="+(BACK_OF_CARD_IMG)+" alt='카드 뒷면'>");
        cards[i][0] = false;
    }
}


// 화면 내 모든 카드를 활성화하는 함수
function activatieAllCard(){
    for(i=0; i<CARD_AMOUNT; i++){
        if(!cards[i][0]){
            $(CARD_ID+i).attr("onclick", "selectCard("+(i)+")");
        }
    }
}


// 화면 내 모든 카드를 비활성화하는 함수
function devatieAllCard(){
    for(i=0; i<CARD_AMOUNT; i++){
        $(CARD_ID+i).attr("onclick", "");
    }
}


// 점수를 증가시키는 함수
function getScore(num){
    score += num;
    SCORE_BOARD.innerHTML = score;
}


// 선택한 카드를 활성화/비활성화 시키는 함수
function selectCard(num){
    if(cards[num][0]){      // 선택한 카드가 앞면인 경우 선택을 취소한다.
        $('#card_'+num).css({"border-color": BACK_OF_CARD_COLOR});
        $('#card_'+num).html("<img class='card_img' src="+(BACK_OF_CARD_IMG)+" alt='카드 뒷면'>");
        pick_1 = -1;
        cards[num][0] = !cards[num][0];
    }else{                  // 선택한 카드가 뒷면인 경우 앞면으로 뒷면집는다.
        $('#card_'+num).css({"border-color": SELECT_CARD_COLOR});
        $(CARD_ID+num,).html("<img class='card_img' src="+(FRONT_OF_CARD_IMG[cards[num][1]])+" alt='카드 앞면"+(cards[num][1])+"'>");
        cards[num][0] = !cards[num][0];

        if(pick_1==-1){     // 첫 번째 선택한 카드인 경우
            pick_1 = num;
        }else{              // 두 번째 선택한 카드인 경우
            pick_2 = num;
            //선택한 두 카드를 비교한다.
            isThisPair();
        }
    }
}


// 선택된 두 카드를 비교하는 함수
function isThisPair(){
    if(cards[pick_1][1]==cards[pick_2][1]){     // 두 카드가 같은 경우
        getScore(100);
        $('#card_'+pick_1).attr("onclick", "");
        $('#card_'+pick_2).attr("onclick", "");
        pick_1 = -1;
        pick_2 = -1;
        pair++;

        if(pair*2==CARD_AMOUNT){                // 모든 카드의 짝을 맞춘 경우
            getScore(5*time);
            showResult();
        }
    }else{                                      // 두 카드가 다른 경우
        devatieAllCard();
        setTimeout(function(){
            $('#card_'+pick_1).css({"border-color": BACK_OF_CARD_COLOR});
            $('#card_'+pick_1).html("<img class='card_img' src="+(BACK_OF_CARD_IMG)+" alt='카드 뒷면'>");
            $('#card_'+pick_2).css({"border-color": BACK_OF_CARD_COLOR});
            $('#card_'+pick_2).html("<img class='card_img' src="+(BACK_OF_CARD_IMG)+" alt='카드 뒷면'>");

            // 선택한 카드들을 다시 뒤집는다.
            cards[pick_1][0] = false;
            cards[pick_2][0] = false;
            pick_1 = -1;
            pick_2 = -1;
            activatieAllCard();

        }, 800);
    }
}


// 시간을 재는 함수
function startTimer(){
    if(time==-1){               // 제한 시간이 지난 경우
        showResult();
        return null;
    }
    let min = parseInt(time/60);
    let sec = time%60;
    TIMER_TEXT.innerHTML = min+":"+sec;
    time--;      // 시간(초) 감소
}