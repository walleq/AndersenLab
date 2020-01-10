let table = document.getElementById('table1');
let move = 0;
table.addEventListener('click', function (event) {
    if (move % 2 === 0) {
        event.target.innerHTML = 'X';
    } else {
        event.target.innerHTML = '0';
    }
    move++;
});

function checkWinner() {
 let winner = document.getElementsByClassName()
};
function reloadPage() {
    location.reload() 
};