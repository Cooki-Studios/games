let players = [];
function generatePlayers(num) {
    for (let i = 0; i < num; i++) {
        players[i] = {id:i,x:0.25,y:0.25};

        let player = document.createElement("div");
        player.id = i;
        player.className = "player";
        player.style.left = players[i].x * 64 + "px";
        player.style.top = players[i].y * 64 + "px";
        document.body.appendChild(player);
    }
}

function updatePlayers() {
    for (const player in players) {
        console.log(player);
    }
}
