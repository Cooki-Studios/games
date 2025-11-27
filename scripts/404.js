let debug = true;
let tileSize = 64;

const c = document.createElement("canvas");
c.id = "fourohfour-canvas";
c.oncontextmenu = (e) => {e.preventDefault()};

const mapData404 = [
    ["n1","nb","n","n","n","n9","nb10","nb11","nb12","nb","n21","nb","n","n","n","n"],
    ["nr2","rtl","nl6","nb","n","nr13","tl","tb","tb14","tr","nlr22","rtl","nl26","nb","n","n"],
    ["nr3","rl4","nlbr5","rtl7","nlb","nr15","rl","ntl","ntr16","rl","nlr23","rl24","nlbr25","rtl27","nlb","n"],
    ["nr","lb","tb8","","trb","nlr17","rl18","nbl19","nbr20","rl","nlr","lb","tb28","","trb","n"],
    ["n","nt","ntr","rbl","ntl","nr","lb","tb","tb","rb","nl","nt","ntr","rbl","ntl","n"],
    ["n","n","n","nt","n","n","nt","nt","nt","nt","n","n","n","nt","n","n"],
];

// const mapDataOld = [
//     ["n","nb","n","n","n","n","nb","nb","nb","nb","n","nb","n","n","n","n"],
//     ["nr","rtl","nl","nb","n","nr","tl","tb","tb","tr","nlr","rtl","nl","nb","n","n"],
//     ["nr","rl","nlbr","rtl","nlb","nr","rl","ntl","ntr","rl","nlr","rl","nlbr","rtl","nlb","n"],
//     ["nr","lb","tb","","trb","nlr","rl","nbl","nbr","rl","nlr","lb","tb","","trb","nl"],
//     ["n","nt","ntr","rbl","ntl","nr","lb","tb","tb","rb","nl","nt","ntr","rbl","ntl","n"],
//     ["n","n","n","nt","n","n","nt","nt","nt","nt","n","n","n","nt","n","n"],
// ];

document.body.appendChild(c);
c.width = window.innerWidth;
c.height = window.innerHeight;

let mapData = [];
for (let i = 0; i < Math.ceil(c.height/tileSize); i++) {
    mapData[i] = [];
    for (let i2 = 0; i2 < Math.ceil(c.width/tileSize); i2++) {
        mapData[i][i2] = "n";
    }
}

let offsetX = c.width/2 - (mapData[0].length*32);
let offsetY = c.height/2 - (mapData.length*32);

for (let i = 0; i < mapData404.length; i++) {
    for (let i2 = 0; i2 < mapData404[0].length; i2++) {
        mapData[Math.ceil(i+((mapData.length-mapData404.length)/2))][Math.ceil(i2+((mapData[0].length-mapData404[0].length)/2))] = mapData404[i][i2];
    }
}

document.body.onresize = () => {
    c.width = window.innerWidth;
    c.height = window.innerHeight;

    mapData = [];
    for (let i = 0; i < Math.ceil(c.height/tileSize); i++) {
        mapData[i] = [];
        for (let i2 = 0; i2 < Math.ceil(c.width/tileSize); i2++) {
            mapData[i][i2] = "n";
        }
    }

    offsetX = c.width/2 - (mapData[0].length*32);
    offsetY = c.height/2 - (mapData.length*32);

    for (let i = 0; i < mapData404.length; i++) {
        for (let i2 = 0; i2 < mapData404[0].length; i2++) {
            mapData[Math.ceil(i+((mapData.length-mapData404.length)/2))][Math.ceil(i2+((mapData[0].length-mapData404[0].length)/2))] = mapData404[i][i2];
        }
    }

    ctx.clearRect(0, 0, c.width, c.height);

    set404();
    draw404();
};

const ctx = c.getContext("2d");
ctx.globalAlpha = 1;

function test(side, str) {
    let temp = str.toString();

    if (temp.includes(side)) {
        if (temp.includes("n")) {
            return false;
        } else {
            return true;
        }
    } else {
        if (temp.includes("n")) {
            return Math.random() > 0.5;
        } else {
            return false;
        }
    }
}

function set404() {
    for (let i = 0; i < mapData.length; i++) {
        for (let i2 = 0; i2 < mapData[0].length; i2++) {
            if (mapData[i][i2].includes("n")) {
                mapData[i][i2] = {t:test("t",mapData[i][i2]), r:false, b:false, l:test("l",mapData[i][i2]),bg:true};
            } else {
                mapData[i][i2] = {t:test("t",mapData[i][i2]), r:test("r",mapData[i][i2]), b:test("b",mapData[i][i2]), l:test("l",mapData[i][i2])};
            }
        }
    }
}
set404();

let player = {
    x: 11.25,
    y: 6.25,
    z: 0,
    surroundings: {
        u:null,
        l:null,
        r:null,
        d:null
    }
};

let grabbing = false;
let randX;
let randY;
let shakeAmt = 0;

function playerShake() {
    shakeAmt += 0.0001;

    if (Math.random() > 0.5) {
        randX = Math.random() * shakeAmt;
    } else {
        randX = Math.random() * -shakeAmt;
    }

    if (Math.random() > 0.5) {
        randY = Math.random() * shakeAmt;
    } else {
        randY = Math.random() * -shakeAmt;
    }

    player.x += randX;
    player.y += randY;
    draw404();
    player.x -= randX;
    player.y -= randY;

    if (shakeAmt > 0.1) {
        if (c.style.cursor != "") {
            c.style.cursor = "";
        }

        if (grabbing) {
            player.x = Math.floor(player.x) + 0.25;
            player.y = Math.floor(player.y) + 0.25;
            grabbing = false;

            window.clearInterval(shakeTimeout);
        }

        shakeAmt = 0;
        c.releasePointerCapture(grabId);
        playerInt = setInterval(playerMove,100);
        c.onpointermove = "";
        player.z = 0;

        for (let y = 0; y < mapData.length; y++) {
            for (let x = 0; x < mapData[0].length; x++) {
                if (!mapData[Math.ceil(player.y)-1][Math.ceil(player.x)-1].bg) {
                    player.z = -5;
                }
            }
        }

        draw404();
    }
}

let shakeTimeout;
let curOffestX = -0.25;
let curOffestY = -0.25;

function grabCheck(e) {
    if (e.offsetX >= player.x * tileSize + offsetX && e.offsetY >= player.y * tileSize + offsetY && e.offsetX <= player.x * tileSize + offsetX + 32 && e.offsetY <= player.y * tileSize + offsetY + 32 || grabbing) {
        if (e.pressure > 0) {
            if (c.style.cursor != "grabbing") {
                c.style.cursor = "grabbing";
                shakeTimeout = window.setInterval(playerShake,1);
                grabbing = true;

                curOffsetX = player.x - e.offsetX/tileSize;
                curOffsetY = player.y - e.offsetY/tileSize;
            }

            player.x = e.offsetX/tileSize + curOffsetX;
            player.y = e.offsetY/tileSize + curOffsetY;

            player.z = 5;

            draw404();
        } else {
            if (c.style.cursor != "grab") {
                c.style.cursor = "grab";
            }

            if (grabbing) {
                player.x = Math.floor(player.x) + 0.25;
                player.y = Math.floor(player.y) + 0.25;

                grabbing = false;
                window.clearInterval(shakeTimeout);

                player.z = 0;
                shakeAmt = 0;

                for (let y = 0; y < mapData.length; y++) {
                    for (let x = 0; x < mapData[0].length; x++) {
                        if (!mapData[Math.ceil(player.y)-1][Math.ceil(player.x)-1].bg) {
                            player.z = -20;
                        }
                    }
                }

                draw404();
            }
        }
    } else {
        if (c.style.cursor != "") {
            c.style.cursor = "";
        }

        if (grabbing) {
            player.x = Math.floor(player.x) + 0.25;
            player.y = Math.floor(player.y) + 0.25;
            grabbing = false;

            window.clearInterval(shakeTimeout);

            player.z = 0;
            shakeAmt = 0;

            for (let y = 0; y < mapData.length; y++) {
                for (let x = 0; x < mapData[0].length; x++) {
                    if (!mapData[Math.ceil(player.y)-1][Math.ceil(player.x)-1].bg) {
                        player.z = -20;
                    }
                }
            }

            draw404();
        }
    }
}

let grabId = null;

function startGrab(e) {
    clearInterval(playerInt);
    grabId = e.pointerId;
    grabCheck(e);
    c.onpointermove = (event) => { grabCheck(event); }
    c.setPointerCapture(grabId);
}

function stopGrab(e) {
    c.releasePointerCapture(grabId);
    if (e) {
        grabCheck(e);
    }
    playerInt = setInterval(playerMove,500);
}

c.onpointerdown = (e) => { startGrab(e); }
c.onpointerup = (e) => { stopGrab(e); }
c.onpointermove = (e) => { grabCheck(e); }

const playerDirs = ["u","l","r","d","break","break"];
let playerInt = setInterval(playerMove,500);

// document.body.onkeyup = (e) => { playerMove(e) }

let playerMoveAnimFrame = 0;

function playerCheck(x,y) {
    switch(playerDirs[playerDirs.length * Math.random() << 0]) {
        case "u":
            if (!player.surroundings.u && !mapData[y][x].t) {
                player.y -= 1;

                playerMoveAnimFrame = 0;
                let playerMoveInt = setInterval(playerMoveAnim,1,player.x,player.y+1,player.x,player.y);
                setTimeout(() => {clearInterval(playerMoveInt)}, 500);
            } else {
                playerCheck(x,y);
            }
            break;
        case "l":
            if (!player.surroundings.l && !mapData[y][x].l) {
                player.x -= 1;

                playerMoveAnimFrame = 0;
                let playerMoveInt = setInterval(playerMoveAnim,1,player.x+1,player.y,player.x,player.y);
                setTimeout(() => {clearInterval(playerMoveInt)}, 500);
            } else {
                playerCheck(x,y);
            }
            break;
        case "r":
            if (!player.surroundings.r && !mapData[y][x].r) {
                player.x += 1;

                playerMoveAnimFrame = 0;
                let playerMoveInt = setInterval(playerMoveAnim,1,player.x-1,player.y,player.x,player.y);
                setTimeout(() => {clearInterval(playerMoveInt)}, 500);
            } else {
                playerCheck(x,y);
            }
            break;
        case "d":
            if (!player.surroundings.d && !mapData[y][x].b) {
                player.y += 1;

                playerMoveAnimFrame = 0;
                let playerMoveInt = setInterval(playerMoveAnim,1,player.x,player.y-1,player.x,player.y);
                setTimeout(() => {clearInterval(playerMoveInt)}, 500);
            } else {
                playerCheck(x,y);
            }
            break;
        case "break":
            break;
        default:
            playerCheck(x,y);
        break;
    }
}

let playerOffsetX = 0;
let playerOffsetY = 0;

function playerMoveAnim(sx,sy,ex,ey) {
    playerMoveAnimFrame++;
    console.log(sx-ex);
    playerOffsetX = (sx-ex)/100*playerMoveAnimFrame - 0.5;
    playerOffsetX *= 64;
    playerOffsetX = 0-playerOffsetX;

    playerOffsetY = (sy-ey)/100*playerMoveAnimFrame - 0.5;
    playerOffsetY *= 64;
    playerOffsetY = 0-playerOffsetY;
    draw404();
}

function playerMove() {
    let y = Math.ceil(player.y) - 1;
    let x = Math.ceil(player.x) - 1;

    player.surroundings = {
        u:null, l:null, r:null, d:null
    }

    if (y+1 < mapData.length) {
        player.surroundings.d = mapData[y+1][x].t;
    } else {
        player.surroundings.d = mapData[0][x].t;
    }

    if (y-1 > 1) {
        player.surroundings.u = mapData[y-1][x].b;
    } else {
        player.surroundings.u = mapData[mapData.length-1][x].b;
    }

    if (x-1 > 1) {
        player.surroundings.l = mapData[y][x-1].r;
    } else {
        player.surroundings.l = mapData[y][mapData[y].length-1].r;
    }

    if (x+1 < mapData[y].length) {
        player.surroundings.r = mapData[y][x+1].l;
    } else {
        player.surroundings.r = mapData[y][0].l;
    }

    playerCheck(x,y);

    if (player.x < 0) {
        player.x = mapData[0].length - 0.75;
    } else if (player.x > mapData[0].length) {
        player.x = 0.25;
    }

    if (player.y < 0) {
        player.y = mapData.length - 0.75;
    } else if (player.y > mapData.length) {
        player.y = 0.25;
    }

    draw404();
}

function drawPlayer() {
    if (debug) {
        ctx.fillStyle = "red";
        ctx.strokeStyle = "";
        ctx.shadowColor = "";
        ctx.shadowBlur = 0;

        ctx.fillRect(player.x * tileSize + offsetX - player.z,player.y * tileSize + offsetY - player.z,32,32);
    }

    ctx.fillStyle = "hsl(39, 100%, "+(25+player.z)+"%)";
    ctx.strokeStyle = "hsl(38, 100%, "+(25+player.z)+"%)";
    ctx.shadowColor = "hsl(38, 100%, "+(25+player.z)+"%)";
    ctx.shadowBlur = 4;

    ctx.beginPath();
    ctx.moveTo(player.x * tileSize + offsetX - player.z + playerOffsetX, player.y * tileSize + offsetY - player.z + playerOffsetY);
    ctx.lineTo(player.x * tileSize + 32 + offsetX + player.z + playerOffsetX, player.y * tileSize + offsetY - player.z + playerOffsetY);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(player.x * tileSize + 32 + offsetX + player.z + playerOffsetX, player.y * tileSize + offsetY - player.z + playerOffsetY);
    ctx.lineTo(player.x * tileSize + 32 + offsetX + player.z + playerOffsetX, player.y * tileSize + 32 + offsetY + player.z + playerOffsetY);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(player.x * tileSize + 32 + offsetX + player.z + playerOffsetX, player.y * tileSize + 32 + offsetY + player.z + playerOffsetY);
    ctx.lineTo(player.x * tileSize + offsetX - player.z + playerOffsetX, player.y * tileSize + 32 + offsetY + player.z + playerOffsetY);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(player.x * tileSize + offsetX - player.z + playerOffsetX, player.y * tileSize + 32 + offsetY + player.z + playerOffsetY);
    ctx.lineTo(player.x * tileSize + offsetX - player.z + playerOffsetX, player.y * tileSize + offsetY - player.z + playerOffsetY);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();

    ctx.moveTo(player.x * tileSize + offsetX - player.z + playerOffsetX, player.y * tileSize + offsetY - player.z + playerOffsetY);
    ctx.lineTo(player.x * tileSize + 32 + offsetX + player.z + playerOffsetX, player.y * tileSize + offsetY - player.z + playerOffsetY);
    ctx.lineTo(player.x * tileSize + 32 + offsetX + player.z + playerOffsetX, player.y * tileSize + 32 + offsetY + player.z + playerOffsetY);
    ctx.lineTo(player.x * tileSize + offsetX - player.z + playerOffsetX, player.y * tileSize + 32 + offsetY + player.z + playerOffsetY);
    ctx.lineTo(player.x * tileSize + offsetX - player.z + playerOffsetX, player.y * tileSize + offsetY - player.z + playerOffsetY);

    ctx.closePath();
    ctx.fill();
}

function draw404() {
    ctx.clearRect(0, 0, c.width, c.height);

    ctx.beginPath();

    for (let y = 0; y < mapData.length; y++) {
        for (let x = 0; x < mapData[0].length; x++) {
            if (mapData[y][x].bg) {
                ctx.lineWidth = 4;
                ctx.strokeStyle = "#404040";
                ctx.shadowColor = "#000";
                ctx.shadowBlur = 8;

                if (mapData[y][x].t) {
                    // ctx.beginPath();
                    ctx.moveTo(x * tileSize + offsetX, y * tileSize + offsetY);
                    ctx.lineTo(x * tileSize + tileSize + offsetX, y * tileSize + offsetY);
                    // ctx.closePath();
                    // ctx.stroke();
                }

                if (mapData[y][x].r) {
                    // ctx.beginPath();
                    ctx.moveTo(x * tileSize + tileSize + offsetX, y * tileSize + offsetY);
                    ctx.lineTo(x * tileSize + tileSize + offsetX, y * tileSize + tileSize + offsetY);
                    // ctx.closePath();
                    // ctx.stroke();
                }

                if (mapData[y][x].b) {
                    // ctx.beginPath();
                    ctx.moveTo(x * tileSize + offsetX, y * tileSize + tileSize + offsetY);
                    ctx.lineTo(x * tileSize + tileSize + offsetX, y * tileSize + tileSize + offsetY);
                    // ctx.closePath();
                    // ctx.stroke();
                }

                if (mapData[y][x].l) {
                    // ctx.beginPath();
                    ctx.moveTo(x * tileSize + offsetX, y * tileSize + offsetY);
                    ctx.lineTo(x * tileSize + offsetX, y * tileSize + tileSize + offsetY);
                    // ctx.closePath();
                    // ctx.stroke();
                }
            }
        }
    }

    ctx.closePath();
    ctx.stroke();

    for (let y = 0; y < mapData.length; y++) {
        for (let x = 0; x < mapData[0].length; x++) {
            if (!mapData[y][x].bg) {
                ctx.shadowColor = "";
                ctx.shadowBlur = 0;

                ctx.fillStyle = "#000000";
                ctx.fillRect(x * tileSize + offsetX,y * tileSize + offsetY,tileSize,tileSize);

                let floorTile = mapData404[y-1-((mapData.length-mapData404.length)/2)][x-1-((mapData[0].length-mapData404[0].length)/2)];
                if (debug && (floorTile.includes("1") || floorTile.includes("2") || floorTile.includes("3") || floorTile.includes("4") || floorTile.includes("5") || floorTile.includes("6") || floorTile.includes("7") || floorTile.includes("8") || floorTile.includes("9") || floorTile.includes("0"))) {
                    ctx.fillStyle = "whitesmoke";
                    ctx.textAlign = "center";
                    ctx.font = "bold 24px Inter, sans-serif";
                    ctx.fillText(floorTile.replace("n", "").replace("l", "").replace("r", "").replace("b", "").replace("t", ""),x * tileSize + offsetX + 32,y * tileSize + offsetY + 40);
                }
            }
        }
    }

    ctx.beginPath();

    for (let y = 0; y < mapData.length; y++) {
        for (let x = 0; x < mapData[0].length; x++) {
            if (!mapData[y][x].bg) {
                ctx.lineWidth = 4;
                ctx.strokeStyle = "whitesmoke";
                ctx.shadowColor = "#151515";
                ctx.shadowBlur = 16;

                if (mapData[y][x].t) {
                    // ctx.beginPath();
                    ctx.moveTo(x * tileSize + offsetX, y * tileSize + offsetY);
                    ctx.lineTo(x * tileSize + tileSize + offsetX, y * tileSize + offsetY);
                    // ctx.closePath();
                    // ctx.stroke();
                }

                if (mapData[y][x].r) {
                    // ctx.beginPath();
                    ctx.moveTo(x * tileSize + tileSize + offsetX, y * tileSize + offsetY);
                    ctx.lineTo(x * tileSize + tileSize + offsetX, y * tileSize + tileSize + offsetY);
                    // ctx.closePath();
                    // ctx.stroke();
                }

                if (mapData[y][x].b) {
                    // ctx.beginPath();
                    ctx.moveTo(x * tileSize + offsetX, y * tileSize + tileSize + offsetY);
                    ctx.lineTo(x * tileSize + tileSize + offsetX, y * tileSize + tileSize + offsetY);
                    // ctx.closePath();
                    // ctx.stroke();
                }

                if (mapData[y][x].l) {
                    // ctx.beginPath();
                    ctx.moveTo(x * tileSize + offsetX, y * tileSize + offsetY);
                    ctx.lineTo(x * tileSize + offsetX, y * tileSize + tileSize + offsetY);
                    // ctx.closePath();
                    // ctx.stroke();
                }
            }
        }
    }

    ctx.closePath();
    ctx.stroke();

    drawPlayer();

    if (grabbing) {
        ctx.shadowColor = "black";
        ctx.shadowBlur = 4;
        drawPlayer();
    }
}

draw404();

// c.onclick = (e) => {
//     console.log(Math.abs(Math.ceil((e.offsetX - offsetX)/tileSize)), Math.abs(Math.ceil((e.offsetY - offsetY)/tileSize)), mapDataOld[Math.ceil((e.offsetY - offsetY)/tileSize-1)][Math.ceil((e.offsetX - offsetX)/tileSize-1)]);
// };