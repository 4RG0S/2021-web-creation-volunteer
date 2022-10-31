// 문제이름, 선택지
const data = [
  {
    name: "태권도",
    example: ["태권도", "유도", "복싱", "검도"],
  },
  {
    name: "발레",
    example: ["스포츠댄스", "발레", "벨리댄스", "피겨스케이팅"],
  },
  {
    name: "탁구",
    example: ["배드민턴", "테니스", "볼링", "탁구"],
  },
  {
    name: "BTS-다이너마이트",
    example: [
      "오마이걸-바나나알러지원숭이",
      "BTS-다이너마이트",
      "비-깡",
      "소녀시대-Gee",
    ],
  },
  {
    name: "여자친구-밤",
    example: [
      "여자친구-시간을달려서",
      "여자아이들-한",
      "여자친구-밤",
      "에이핑크-1도없어",
    ],
  },
  {
    name: "나무",
    example: ["나무", "꽃", "이쑤시개", "가시"],
  },
  {
    name: "자동차",
    example: ["탱크", "자동차", "구급차", "자전거"],
  },
  {
    name: "문어",
    example: ["문어", "오징어", "외계인", "주머니"],
  },
  {
    name: "고양이",
    example: ["집사", "고양이", "강아지", "사자"],
  },
  {
    name: "상어",
    example: ["상어", "가오리", "고등어", "고래"],
  },
  {
    name: "나비",
    example: ["나비", "나방", "벌", "잠자리"],
  },
  {
    name: "곰",
    example: ["코끼리", "곰", "개구리", "개미핥기"],
  },
  {
    name: "총",
    example: ["라이터", "총", "숟가락", "새"],
  },
  {
    name: "저울",
    example: ["저울", "그릇", "장난감", "얼굴"],
  },
  {
    name: "재봉틀",
    example: ["재봉틀", "팔", "주전자", "로봇"],
  },
  {
    name: "장미",
    example: ["장미", "무궁화", "민들레", "개나리"],
  },
  {
    name: "인어",
    example: ["인어", "물고기", "사람", "노인"],
  },
  {
    name: "에펠탑",
    example: ["에펠탑", "피라미드", "남산타워", "바벨탑"],
  },
  {
    name: "소",
    example: ["소", "코끼리", "염소", "유니콘"],
  },
  {
    name: "마녀",
    example: ["인어", "마녀", "마법사", "귀신"],
  },
  {
    name: "새",
    example: ["새", "사자", "강아지", "공룡"],
  },
  {
    name: "비행기",
    example: ["비행기", "로켓", "미사일", "새"],
  },
  {
    name: "사람",
    example: ["사람", "오크", "오징어", "요정"],
  },
  {
    name: "날개",
    example: ["날개", "팔", "다리", "새"],
  },
  {
    name: "군인",
    example: ["군인", "의사", "프로그래머", "교수"],
  },
]

$(document).ready(function () {
  // 점수, 현재 문제 번호, 문제를 담는 배열
  var score, count, problems

  $(".start").show()

  // 게임 시작 및 다시 시작하기를 눌렀을 때 시작되는 함수
  $(".start_btn").click(function () {
    score = 0
    count = 0
    problems = Array()

    // json파일에서 문제를 가져와서 임의로 10개 뽑기
    const copy = JSON.parse(JSON.stringify(data))
    for (i = 0; i < 10; i++) {
      random = Math.floor(Math.random() * copy.length)
      problems.push(copy[random])
      copy.splice(random, 1)
    }
    setProblem()
    $("#score").text(score + "점")
    $(".start, .result").hide()
    $(".problem, .score").show()
  })

  // 답을 눌렀을 때 실행되는 함수
  // 정답을 누르면 정답을 맞췄다는 문구를 출력한다.
  // 마지막 문제면 최종 결과 창을 띄운다.
  $("#answers li").click(function (e) {
    if (++count == 10) {
      if ($(e.target).text() === problems[count - 1]["name"]) {
        score += 10
        $("#score").text(score + "점")
      }
      $(".problem").hide()
      $(".result").show()
    } else {
      if ($(e.target).text() === problems[count - 1]["name"]) {
        score += 10
        $("#score").text(score + "점")
        $("#o").show()
      } else {
        $("#x").show()
      }
      setProblem()
      $(".problem").hide()
      $(".correct").show()
    }
  })

  // 다음 문제를 눌렀을 때 다음 문제가 띄어진다.
  $("#next").click(function (e) {
    $("#o, #x, .correct").hide()
    $(".problem").show()
  })

  // 화면에 새로운 문제를 출력한다. 선택지또한 랜덤으로 나오게 한다.
  function setProblem() {
    var o = problems[count]
    $("#img").attr("src", "./data/" + o["name"] + ".png")
    for (var i = 0; i < 4; i++) {
      random = Math.floor(Math.random() * o["example"].length)
      $("#answers").children()[i].innerHTML = o["example"][random]
      o["example"].splice(random, 1)
    }
  }

  // index.html로 돌아간다.
  $("#main").click(function (e) {
    location.href = "../index.html"
  })

  // 화면을 reload하여 첫화면으로 돌아간다.
  $("#home").click(function (e) {
    location.reload()
  })
})
