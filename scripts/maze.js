let debug = true;
let tileSize = 64;

const c = document.createElement("canvas");
c.id = "fourohfour-canvas";
c.oncontextmenu = (e) => {e.preventDefault()};

document.body.appendChild(c);
c.width = window.innerWidth;
c.height = window.innerHeight;
c.style.width = "100vw";
c.style.height = "100vh";

const ctx = c.getContext('2d');
ctx.globalAlpha = 1;

const directions = [
    { x: 0, y: -1, id: "up" },
    { x: 0, y: 1, id: "down" },
    { x: -1, y: 0, id: "left" },
    { x: 1, y: 0, id: "right" }
];                   // I'm gonna move my feet tonigh- I mean whaaat?

// Maze grid
let maze = [];
for (let i = 0; i < Math.ceil(c.height/64) + 1; i++) {
    maze[i] = [];
    for (let i2 = 0; i2 < Math.ceil(c.width/64) + 2; i2++) {
        maze[i][i2] = {visited:false,x:null,y:null,nx:null,ny:null};
    }
}

// Recursive backtracking maze generation
function generateMaze(x, y) {
    maze[y][x].visited = true; // Mark the tile as visited

    // Shuffle directions to create randomness
    const shuffledDirs = directions.sort(() => Math.random() - 0.5);

    for (const dir of shuffledDirs) {
        const nx = x + dir.x;
        const ny = y + dir.y;

        // Check if the next tile is valid and has not been visited
        if (nx >= 0 && nx < maze[0].length && ny >= 0 && ny < maze.length && !maze[ny][nx].visited) {
            maze[y][x].x = x;
            maze[y][x].y = y;
            if (nx != undefined) {
                maze[y][x].nx = nx;
            } else {
                maze[y][x].nx = x;
            }

            if (nx != undefined) {
                maze[y][x].ny = ny;
            } else {
                maze[y][x].ny = y;
            }

            generateMaze(nx, ny); // Recursively generate the maze
        }
    }
}

function drawMaze() {
    let mazeOffsetX = -Math.abs((maze[0].length / tileSize - Math.floor(maze[0].length / tileSize)) / 2) * tileSize;
    let mazeOffsetY = -Math.abs((maze.length / tileSize - Math.floor(maze.length / tileSize)) / 2) * tileSize;

    // ctx.strokeStyle = "#aaa";
    // ctx.lineWidth = 2;
    // ctx.shadowColor = "#555";
    // ctx.shadowBlur = 0;
    // ctx.shadowOffsetX = 2;
    // ctx.shadowOffsetY = 2;

    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.shadowColor = "";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[0].length; x++) {
            ctx.beginPath();
            ctx.moveTo(maze[y][x].x * tileSize + mazeOffsetX,maze[y][x].y * tileSize + mazeOffsetY);
            ctx.lineTo(maze[y][x].nx * tileSize + mazeOffsetX,maze[y][x].ny * tileSize + mazeOffsetY);
            ctx.closePath();
            ctx.stroke();
        }
    }
}

document.body.onresize = () => {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    drawMaze();
}

// Initialize the maze generation
generateMaze(Math.floor(Math.random() * maze[0].length), Math.floor(Math.random() * maze.length));
drawMaze();

generatePlayers(1);
updatePlayers();