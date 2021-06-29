var gameManager = (function(){
    // 상수
    const LIMIT_TIME = 90;      // 제한시간
    const SECOND = 1000;        // 1초
    const MEMORIZE_TIME = 3000; // 암기시간
    const PENALTY_TIME = 800;   // 틀린경우 패널티 시간
    const CARD_AMOUNT = 24;     // 카드 개수
    const CARD_ID = "#card_";
    const SELECT_CARD_COLOR = "#ff0000";    // 선택한 카드 색상
    const CARD_COLOR = "#000000";   // 기본 카드 색상
    const FRONT_OF_CARD_IMG = ["./img/img_1.png","./img/img_2.png","./img/img_3.png","./img/img_4.png","./img/img_5.png",
    "./img/img_6.png","./img/img_7.png","./img/img_8.png","./img/img_9.png","./img/img_10.png","./img/img_11.png","./img/img_12.png"];
    const BACK_OF_CARD_IMG = "./img/back_img.png";
    const SOUND_LOCATE = "./sound/";
    const TIMER_TEXT = document.querySelector('#timer');
    const SCORE_BOARD = document.querySelector('#score');


    // 변수
    var timer = null;           // 타이머 반복자가 저장될 변수
    var time = LIMIT_TIME;      // 남은 시간
    var score = 0;              // 점수
    var pair = 0;               // 맞춘 짝의 개수
    var game_start = false;         // 게임이 시작된 여부를 확인, 0:시작전, 1:게임중
    var cards = [];             // 카드별 태그에 대한 정보를 저장할 배열
    var pick_1 = -1;            // 선택한 카드 1
    var pick_2 = -2;            // 선택한 카드 2
    var bgm = null;             // 게임 bgm


    // 함수
    // 게임 기록을 초기화하는 함수
    function resetGame(){
        timer = null;
        time = LIMIT_TIME;
        score = 0;
        pair = 0;
        game_start = true;
        cards = [];
        pick_1 = -1;
        pick_2 = -2;        // 일시정지 버튼 활성화 막기 위함

        $("#board").remove();
        $("#main").append("<div id='board'></div>");
        SCORE_BOARD.innerHTML = score;

        // bgm 설정
        bgm = new Audio(SOUND_LOCATE+"bgm.m4a");  
        bgm.loop = true;
        bgm.volume = 0.3;
        bgm.play();
    }


    // 최종 게임결과를 보여주는 함수
    function showResult(){
        devatieAllCard();
        TIMER_TEXT.innerHTML = "끝";
        clearInterval(timer);
        //$("#start-button").attr("onclick", "gameManager.startGame()");
        pick_2 = -2;
        game_start = false;
        bgm.pause();
        let audio = new Audio(SOUND_LOCATE+"success.m4a");
        audio.volume = 0.5;
        audio.loop = false;
        audio.play();
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
                pick_2 = -1;
            }, MEMORIZE_TIME);
        
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
        let audio = new Audio(SOUND_LOCATE+"card.mp3");
        audio.loop = false;
        audio.play();
        for(i=0; i<CARD_AMOUNT; i++){
            $(CARD_ID+i).css({"border-color": CARD_COLOR});
            $(CARD_ID+i).html("<img class='card_img' src="+(FRONT_OF_CARD_IMG[cards[i][1]])+" alt='카드 앞면"+(cards[i][1])+"'>");
            //cards[i][0] = true;
        }
    }

    // 화면 내 맞춘 카드만 앞면으로 바꿔주는 함수
    function showCard(){
        let audio = new Audio(SOUND_LOCATE+"card.mp3");
        audio.loop = false;
        audio.play();
        for(i=0; i<CARD_AMOUNT; i++){
            if(cards[i][0]){
                $(CARD_ID+i).css({"border-color": CARD_COLOR});
                $(CARD_ID+i).html("<img class='card_img' src="+(FRONT_OF_CARD_IMG[cards[i][1]])+" alt='카드 앞면"+(cards[i][1])+"'>");
            }
        }
    }


    // 화면 내 모든 카드를 뒷면으로 바꿔주는 함수
    function flipAllCard(){
        let audio = new Audio(SOUND_LOCATE+"card.mp3");
        audio.loop = false;
        audio.play();
        for(i=0; i<CARD_AMOUNT; i++){
            $(CARD_ID+i).css({"border-color": CARD_COLOR});
            $(CARD_ID+i).html("<img class='card_img' src="+(BACK_OF_CARD_IMG)+" alt='카드 뒷면'>");
            //cards[i][0] = false;
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
            $(CARD_ID+pick_1).attr("onclick", "");
            $(CARD_ID+pick_2).attr("onclick", "");
            $(CARD_ID+pick_1).css({"border-color": CARD_COLOR});
            $(CARD_ID+pick_2).css({"border-color": CARD_COLOR});
            pick_1 = -1;
            pick_2 = -1;
            pair++;

            if(pair*2==CARD_AMOUNT){                // 모든 카드의 짝을 맞춘 경우
                getScore(5*time);
                showResult();
            }
        }else{                                      // 두 카드가 다른 경우
            devatieAllCard();
            let audio = new Audio(SOUND_LOCATE+"beep.mp3");
            audio.loop = false;
            audio.volume = 0.3;
            audio.play();

            setTimeout(function(){
                let audio2 = new Audio(SOUND_LOCATE+"card.mp3");
                audio2.loop = false;
                audio2.play();
            }, PENALTY_TIME-200);

            setTimeout(function(){
                $(CARD_ID+pick_1).css({"border-color": CARD_COLOR});
                $(CARD_ID+pick_1).html("<img class='card_img' src="+(BACK_OF_CARD_IMG)+" alt='카드 뒷면'>");
                $(CARD_ID+pick_2).css({"border-color": CARD_COLOR});
                $(CARD_ID+pick_2).html("<img class='card_img' src="+(BACK_OF_CARD_IMG)+" alt='카드 뒷면'>");

                // 선택한 카드들을 다시 뒤집는다.
                cards[pick_1][0] = false;
                cards[pick_2][0] = false;
                pick_1 = -1;
                pick_2 = -1;
                if(game_start){
                    activatieAllCard();
                }
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
            //$("#start-button").attr("onclick", "");
            if(!game_start){
                TIMER_TEXT.innerHTML = "외우세요!";
                resetGame();
                createCard();
                setTimeout(() => timer = setInterval(startTimer, SECOND), MEMORIZE_TIME-SECOND);
            }
        },

        // 선택한 카드를 활성화/비활성화 시키는 함수
        selectCard : function (num){
            // 카드 뒤집는 효과음
            let audio = new Audio(SOUND_LOCATE+"card.mp3");
            audio.loop = false;
            audio.play();

            if(cards[num][0]){      // 선택한 카드가 앞면인 경우 선택을 취소한다.
                $(CARD_ID+num).css({"border-color": CARD_COLOR});
                $(CARD_ID+num).html("<img class='card_img' src="+(BACK_OF_CARD_IMG)+" alt='카드 뒷면'>");
                pick_1 = -1;
                cards[num][0] = !cards[num][0];
            }else{                  // 선택한 카드가 뒷면인 경우 앞면으로 뒷면집는다.
                $(CARD_ID+num).css({"border-color": SELECT_CARD_COLOR});
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
            if(game_start && pick_2==-1){
                console.log("pause");
                game_start = false;     // 게임 재시작, 재개 버튼 활성화
                devatieAllCard();
                flipAllCard();
                clearInterval(timer);
                bgm.pause();
            }
        },

        // 게임 재개 함수
        resumeGame: function() {
            if(!game_start && pick_2==-1){
                console.log("resume");
                game_start = true;     // 게임 재시작 버튼 lock
                showCard();
                activatieAllCard();
                bgm.play();

                // 선택중인 카드가 있었던 경우 정상동작하도록 별도 처리
                if(pick_1!=-1){
                    $(CARD_ID+pick_1).css({"border-color": SELECT_CARD_COLOR});
                    $(CARD_ID+pick_1).attr("onclick", "gameManager.selectCard("+(pick_1)+")");
                }
                timer = setInterval(startTimer, SECOND);
            }
        },
    }
}());