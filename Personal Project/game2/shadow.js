$(document).ready(function(){
    // 점수, 현재 문제 번호, 문제를 담는 배열
    var score, count, problems;    
    
    $('.start').show();

    // 게임 시작 및 다시 시작하기를 눌렀을 때 시작되는 함수
    $('.start_btn').click(function(){
        score = 0;
        count = 0;
        problems = Array();

        // json파일에서 문제를 가져와서 임의로 5개 뽑기
        $.getJSON('./data.json', function(data){
            for (i = 0; i < 5; i++) {
                random = Math.floor(Math.random() * data.length);
                problems.push(data[random]);
                data.splice(random, 1);
            }
            setProblem();
        });
        $('#score').text(score+'점');
        $('.start, .result').hide();
        $('.problem, .score').show();
    });

    // 답을 눌렀을 때 실행되는 함수
    // 정답을 누르면 정답을 맞췄다는 문구를 출력한다.
    $('#answers li').click(function(e){      
        if($(e.target).text() === problems[count]["name"]){
            score += 20;
            $('#o').show();
        }else{
            $('#x').show();
        }
        count++;
        $('#score').text(score+'점');
        $('.problem').hide();
        $('.correct').show();
    });

    // 다음 문제를 눌렀을 때 실행되는 문제당 결과화면
    // 마지막 문제이면 최종 결과화면을 출력한다.
    $('#next').click(function(e){
        $('#o, #x, .correct').hide();

        if(count == 5){
            $('.result').show();
        }else{
            setProblem();
            $('.problem').show();
        }
    });

    // 화면에 새로운 문제를 출력한다. 선택지또한 랜덤으로 나오게 한다.
    function setProblem(){
        var o = problems[count];
        $("#img").attr('src', './data/' + o["name"] + '.png');
        for(var i = 0; i < 4; i++){
            random = Math.floor(Math.random() * o["example"].length);
            $('#answers').children()[i].innerHTML = o["example"][random];
            o["example"].splice(random, 1);
        }
    }
});