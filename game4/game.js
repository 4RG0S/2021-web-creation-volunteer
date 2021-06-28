var gameManager = (function(){
    // 상수
    const LIMIT_TIME = 90;
    const SECOND = 1000;
    const MEMORIZE_TIME = 2000;
    const PENALTY_TIME = 800;
    const CARD_AMOUNT = 24;
    const CARD_ID = "#card_";
    const SELECT_CARD_COLOR = "#ff0000";
    const BACK_OF_CARD_COLOR = "#000000";
    const FRONT_OF_CARD_IMG = ["./img/img_1.png","./img/img_2.png","./img/img_3.png","./img/img_4.png","./img/img_5.png",
    "./img/img_6.png","./img/img_7.png","./img/img_8.png","./img/img_9.png","./img/img_10.png","./img/img_11.png","./img/img_12.png"];
    const BACK_OF_CARD_IMG = "./img/back_img.png";
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


    // 함수
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
        $("#start-button").attr("onclick", "gameManager.startGame()");
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
                $(CARD_ID+i).attr("onclick", "gameManager.selectCard("+(i)+")");
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
            }, PENALTY_TIME);
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

    // 아래부터는 html 내 button을 통해 외부에서 접근되는 함수이다.
    return {
        // 게임을 시작하는 함수
        startGame: function (){
            $("#start-button").attr("onclick", "");
            TIMER_TEXT.innerHTML = "외우세요!";
            resetGame();
            createCard();
            setTimeout(() => timer = setInterval(startTimer, SECOND), MEMORIZE_TIME);
        },

        // 선택한 카드를 활성화/비활성화 시키는 함수
        selectCard : function (num){
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
        },

        // 게임 일시정지 함수
        pauseGame: function() {
            console.log("pause");
        },

        // 게임 재개 함수
        resumeGame: function() {
            console.log("resume");
        },
    }
}());