function makeRow(rank, name, score) {
  let myTr = document.createElement("tr")
  let td1 = document.createElement("td")
  if (rank == 1) {
    let img = document.createElement("img")
    img.src = "../images/rank/first.png"
    img.className = "rank_img"
    td1.appendChild(img)
  } else if (rank == 2) {
    let img = document.createElement("img")
    img.src = "../images/rank/second.png"
    img.className = "rank_img"
    td1.appendChild(img)
  } else if (rank == 3) {
    let img = document.createElement("img")
    img.src = "../images/rank/third.png"
    img.className = "rank_img"
    td1.appendChild(img)
  } else {
    td1.innerText = rank
  }
  let td2 = document.createElement("td")
  td2.innerText = name
  let td3 = document.createElement("td")
  td3.innerText = score
  myTr.appendChild(td1)
  myTr.appendChild(td2)
  myTr.appendChild(td3)

  return myTr
}

async function init() {
  inText = document.createElement("tr")
  for (let i = 0; i < 8; i++) {
    if (i >= 4 && i <= 6) {
      continue
    }
    let score = await getScore(i)
    console.log(score)
    for (let j = 0; j < score.length; j++) {
      if (i == 0) {
        let data = score[j]
        let tb = document.getElementById("card")
        tb.append(makeRow(j + 1, data.name, data.score))
      } else if (i == 1) {
        let data = score[j]
        let tb = document.getElementById("shadow")
        tb.append(makeRow(j + 1, data.name, data.score))
      } else if (i == 2) {
        let data = score[j]
        let tb = document.getElementById("book")
        tb.append(makeRow(j + 1, data.name, data.score))
      } else if (i == 3) {
        let data = score[j]
        let tb = document.getElementById("maze")
        tb.append(makeRow(j + 1, data.name, data.score))
      } else if (i == 7) {
        let data = score[j]
        let tb = document.getElementById("flappy")
        tb.append(makeRow(j + 1, data.name, data.score))
      }
    }
  }
}

async function getScore(index) {
  let url = "http://10.10.0.71:8800/get_score"
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      gameId: index,
    }),
  }
  let res
  let response = await fetch(url, option)
  let result = await response.json().then((data) => {
    res = data
  })
  return res
}

init()
