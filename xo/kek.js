const areaWrapper = document.createElement('div');
areaWrapper.className = "area-wrapper";
document.body.before(areaWrapper);
const area = document.createElement('div');
area.id = "area";
document.body.before(area);
areaWrapper.appendChild(area);
const div = document.createElement("div");
let i = 0;
while (i<=9) {
 area.appendChild(div);
 i++;
}

const area1 = document.getElementById("area");
const areaInner = localStorage.getItem("field") || area.innerHTML;
let move = +localStorage.getItem("move") || 0;
let firstScore = +localStorage.getItem("firstScore") || 0;
let secondScore = +localStorage.getItem("secondScore") || 0;
const winner = document.getElementsByClassName("box");
const step = document.getElementById("step");
const score = document.getElementById("score");

const temp = move % 2 === 0;

step.innerText = temp ? "Ходит первый игрок" : "Ходит второй игрок";

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

area.innerHTML = areaInner;

score.innerText = `Счёт - ${firstScore}:${secondScore}`;

const clearFields = () => {
  for (let i = 0; i < winner.length; i++) {
    winner[i].innerHTML = "";
  }

  localStorage.setItem("field", area.innerHTML);
  step.innerText = "Ходит первый игрок";
  setMove(0);
};

const reset = () => {
  clearFields();
  score.innerText = "Счёт - 0:0";
  setFirstScore(0);
  setSecondScore(0);
};

const play = (temp, event) => (event.target.innerHTML = temp ? "<img src='./x.png' width='16' height='16' class='plus'>" : "<img src='./o.png' width='16' height='16' class='minus'>");

const whosMove = temp =>
  (step.innerText = temp ? "Ходит первый игрок" : "Ходит второй игрок");

const checkMove = move => move % 2 === 0;

area.addEventListener("click", function (event) {
  if (event.target.innerHTML) {
    return false;
  }

  play(checkMove(move), event);
  setMove(move + 1);
  whosMove(checkMove(move));
  localStorage.setItem("field", area.innerHTML);
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
      (winner[item[0]].firstChild && winner[item[0]].firstChild.classList.contains('plus')) &&
      (winner[item[1]].firstChild && winner[item[1]].firstChild.classList.contains('plus')) &&
      (winner[item[2]].firstChild && winner[item[2]].firstChild.classList.contains('plus'))
    ) {
      alert("Победил первый игрок");
      setFirstScore(firstScore + 1);
      score.innerText = `Счёт - ${firstScore}:${secondScore}`;
      clearFields();
    } else if (
      (winner[item[0]].firstChild && winner[item[0]].firstChild.classList.contains('minus')) &&
      (winner[item[1]].firstChild && winner[item[1]].firstChild.classList.contains('minus')) &&
      (winner[item[2]].firstChild && winner[item[2]].firstChild.classList.contains('minus'))
    ) {
      alert("Победил второй игрок");
      setSecondScore(secondScore + 1);
      score.innerText = `Счёт - ${firstScore}:${secondScore}`;
      clearFields();
    } else if (Array.from(winner).every(item => item.innerHTML)) {
      alert("Ничья!");
      clearFields();
    }
  });
}