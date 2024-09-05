class Snake {
    constructor() {
        const head = new Body(130, 120);
        const mid = new Body(120, 120);
        const tail = new Body(110, 120);

        head.next = mid;
        mid.prev = head;

        mid.next = tail;
        tail.prev = mid;

        this.head = head;
        this.tail = tail;
        this.length = 0;
    }

    advance(direction) {
        const nextHead = new Body(this.head.x, this.head.y);
        switch (direction) {
            case "right":
                nextHead.x += 10;
                break;
            case "left":
                nextHead.x -= 10;
                break;
            case "up":
                nextHead.y -= 10;
                break;
            case "down":
                nextHead.y += 10;
                break;
            default:
                return;
        }
        nextHead.next = this.head;
        this.head.prev = nextHead;
        this.head = nextHead;
    }

    eraseTail() {
        ctx.fillStyle = "rgb(0 0 0)";
        ctx.fillRect(this.tail.x, this.tail.y, 10, 10);
        this.tail = this.tail.prev;
        this.tail.next = null;
    }

    checkEat() {
        if (this.head.x == curApple[0] && this.head.y == curApple[1]) {
            curApple = apple();
            this.length++;
            return true;
        }
        return false;
    }

    checkWalls() {
        if (this.head.x < 0 || this.head.x >= 250) {
            return true;
        } else if (this.head.y < 0 || this.head.y >= 250) {
            return true;
        }
        return false;
    }

    checkSelf() {
        var head = this.head;
        head = head.next;
        while (head) {
            if (this.head.x == head.x && this.head.y == head.y) {
                return true;
            }
            head = head.next;
        }
        return false;
    }
}

class Body {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.prev = null;
        this.next = null;
    }
}

function draw(head) {
    ctx.fillStyle = "rgb(0 150 0)";
    ctx.fillRect(head.x, head.y, 10, 10);
    head = head.next;

    ctx.fillStyle = "rgb(0 255 0)";
    while (head) {
        ctx.fillRect(head.x, head.y, 10, 10);
        head = head.next;
    }
}

function apple() {
    var randx = Math.random();
    var randy = Math.random();
    randx = Math.floor(randx * 24) * 10;
    randy = Math.floor(randy * 24) * 10;

    checker = player.head;
    while (checker) {
        if (checker.x == randx && checker.y == randy) {
            randx = Math.random();
            randy = Math.random();

            randx = Math.floor(randx * 24) * 10;
            randy = Math.floor(randy * 24) * 10;
            checker = player.head;
        }
        checker = checker.next;
    }
    console.log(player.head, randx, randy);
    ctx.fillStyle = "rgb(255 0 0)";
    ctx.fillRect(randx, randy, 10, 10);
    return [randx, randy];
}

function gameLoop() {
    player.advance(direction);
    if (buffer) {
        direction = buffer;
        buffer = null;
    }
    if (!player.checkEat()) {
        player.eraseTail();
    }
    if (player.checkWalls() || player.checkSelf()) {
        clearInterval(animation);
        document.getElementsByClassName("overlay")[1].style.display = "block";
        document.getElementById("scoreBoard").style.display = "none";
    }
    draw(player.head);
    inputAllowed = true;
    for (let i = 0; i < document.getElementsByClassName("score").length; i++) {
        document.getElementsByClassName("score")[i].innerHTML = `${player.length}`;
    }
}

function restart() {
    ctx.fillStyle = "rgb(0 0 0)";
    ctx.fillRect(0, 0, 250, 250);

    player = new Snake();
    curApple = apple();
    direction = "right";
    inputAllowed = true;
    buffer = null;

    document.getElementsByClassName("overlay")[1].style.display = "none";
    document.getElementById("scoreBoard").style.display = "block";
    animation = setInterval(gameLoop, speed);
}

function start() {
    document.getElementById("scoreBoard").style.display = "block";
    document.getElementsByClassName("overlay")[0].style.display = "none";
    speed = (1 - document.getElementsByTagName("input")[0].value / 100) * 200 + 50;
    restart();
}

function update() {
    document.getElementById("selectedSpeed").innerText = document.getElementsByTagName("input")[0].value;
}

//Entry point
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
var player = new Snake();
var direction = "right";
var inputAllowed = true;
var buffer = null;
var speed;

document.getElementById("scoreBoard").style.display = "none";
document.getElementsByClassName("overlay")[0].style.display = "block";

document.onkeydown = function (event) {
    var inDirection = direction;
    switch (event.key) {
        case "d":
        case "ArrowRight":
            if (direction != "left") {
                inDirection = "right";
            }
            break;
        case "a":
        case "ArrowLeft":
            if (direction != "right") {
                inDirection = "left";
            }
            break;
        case "w":
        case "ArrowUp":
            if (direction != "down") {
                inDirection = "up";
            }
            break;
        case "s":
        case "ArrowDown":
            if (direction != "up") {
                inDirection = "down";
            }
            break;
        case "Enter":
            if (document.getElementsByClassName("overlay")[1].style.display == "block") {
                restart();
            }
        default:
            return;
    }
    if (inputAllowed == false) {
        buffer = inDirection;
    } else {
        direction = inDirection;
        inputAllowed = false;
    }
};
