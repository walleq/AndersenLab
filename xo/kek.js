var table = document.getElementById('table1');
table.addEventListener('click', function(event) {
    console.log(event);
    console.log(event.currentTarget);
    alert("lol");
});
