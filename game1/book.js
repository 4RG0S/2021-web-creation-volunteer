$(document).ready(function(){

    var score = 0;
    var count = 0;    

    $('.start').show();

       // 게임 시작 및 다시 시작하기를 눌렀을 때 시작되는 함수
        $('.str_btn').click(function(){
            $(".box").show();
            $('.result').hide();
            $('.start').hide();
            $('#score').text('score : ' + score + '점');
            $('.problem1, .score, .hint').show();

    });
    
    $('#answers li').click(function(e){
        $('.problem1').hide();
        $('.problem2').hide();
        $('.problem3').hide();
        $('.problem4').hide();

        $('.modal').attr("style", "display:block");
        if($(e.target).text() == '동상이몽' || $(e.target).text() == '죽마고우' || $(e.target).text() == '이구동성' || $(e.target).text() == '유아독존'){
            score += 25;
            $('#o').show();
        }else{
            $('#x').show();
        }
        count++;
        $("#answer").attr("src", 'answer' + count  + '.png'); 
        $('#score').text('score : ' + score + '점');
    });

    $('.nxt_btn').click(function(e){
        $('#o, #x, .modal').hide();
        $('.correct').hide();

        if(count == 4){
            var random = Math.floor(Math.random() * 4) + 1; //랜덤으로 엔딩을 나오게 한다.
            $('.result').show();
            $('#myscore').text('내 최총 점수는 ' + score + '점! 다시 하시겠습니까?');
            count = 0;
            score = 0;

            $("#ending").attr("src", "./엔딩/책추천" + random + '.png');
        }else{
            if(count == 1) $('.problem2, .score').show();
            else if(count == 2) $('.problem3, .score').show();
            else $('.problem4, .score').show();
        }
    });
    
});

