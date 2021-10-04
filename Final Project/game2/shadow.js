// 문제이름, 선택지
const data = [
    {
        "name": "태권도",
        "example": ["태권도","유도","복싱","검도"]
    },
    {
        "name": "발레",
        "example": ["스포츠댄스","발레","벨리댄스","피겨스케이팅"]
    },
    {
        "name": "탁구",
        "example": ["배드민턴","테니스","볼링","탁구"]
    },
    {
        "name": "BTS-다이너마이트",
        "example": ["오마이걸-바나나알러지원숭이","BTS-다이너마이트","비-깡","소녀시대-Gee"]
    },
    {
        "name": "여자친구-밤",
        "example": ["여자친구-시간을달려서","여자아이들-한","여자친구-밤","에이핑크-1도없어"]
    },
    {
        "name": "나무",
        "example": ["나무","꽃","이쑤시개","가시"]
    },
    {
        "name": "자동차",
        "example": ["탱크","자동차","구급차","자전거"]
    },
    {
        "name": "문어",
        "example": ["문어","오징어","외계인","주머니"]
    },
    {
        "name": "고양이",
        "example": ["집사","고양이","강아지","사자"]
    },
    {
        "name": "상어",
        "example": ["상어","가오리","고등어","고래"]
    },
    {
        "name": "나비",
        "example": ["나비","나방","벌","잠자리"]
    }
]

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
        const copy = JSON.parse(JSON.stringify(data));
        for (i = 0; i < 5; i++) {
            random = Math.floor(Math.random() * copy.length);
            problems.push(copy[random]);
            copy.splice(random, 1);
        }
        setProblem();
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

    // index.html로 돌아간다.
    $('#main').click(function(e){
        location.href="../main/index.html";
    })

    // 화면을 reload하여 첫화면으로 돌아간다.
    $('#home').click(function(e){
        location.reload();
    })
});
