const area = document.getElementById("area");
const areaInner = localStorage.getItem("area") || area.innerHTML;
let move = +localStorage.getItem("move") || 0;
let firstScore = +localStorage.getItem("firstScore") || 0;
let secondScore = +localStorage.getItem("secondScore") || 0;
const winner = document.getElementsByClassName("box");
const step = document.getElementById("step");
const score = document.getElementById("score");

const setMove = newMove => {
  move = newMove;
  localStorage.setItem("move", move);
};

const setFirstScore = newFirstScore => {
  firstScore = newFirstScore;
  localStorage.setItem("firstScore", firstScore);
};

const setSecondScore = newSecondScore => {
  secondScore = newSecondScore;
  localStorage.setItem("secondScore", secondScore);
};

document.getElementById("area").innerHTML = areaInner;

score.innerText = `Счёт - ${firstScore}:${secondScore}`;

const clearFields = () => {
  for (let i = 0; i < winner.length; i++) {
    winner[i].innerHTML = "";
  }

  localStorage.setItem("area", area.innerHTML);
  step.innerText = "Ходит первый игрок";
  setMove(0);
};

const reset = () => {
  clearFields();
  score.innerText = "Счёт - 0:0";
  setFirstScore(0);
  setSecondScore(0);
};

area.addEventListener("click", function(event) {
  if (move % 2 === 0) {
    event.target.innerHTML = "X";
  } else {
    event.target.innerHTML = "0";
  }

  setMove(move + 1);

  if (move % 2 === 0) {
    step.innerText = "Ходит первый игрок";
  } else {
    step.innerText = "Ходит второй игрок";
  }

  localStorage.setItem("area", area.innerHTML);

  checkWinner();
});

function checkWinner() {
  const arr1 = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  arr1.forEach((item, i) => {
    if (
      winner[item[0]].innerHTML === "X" &&
      winner[item[1]].innerHTML === "X" &&
      winner[item[2]].innerHTML === "X"
    ) {
      alert("Победил первый игрок");
      setFirstScore(firstScore + 1);
      score.innerText = `Счёт - ${firstScore}:${secondScore}`;
      clearFields();
    } else if (
      winner[item[0]].innerHTML === "0" &&
      winner[item[1]].innerHTML === "0" &&
      winner[item[2]].innerHTML === "0"
    ) {
      alert("Победил второй игрок");
      setSecondScore(secondScore + 1);
      score.innerText = `Счёт - ${firstScore}:${secondScore}`;
      clearFields();
    }
  });
}
