/**///The sleep function !!!!DO NOT DELETE!!!!!!!!!!!!!!!!!!!!!/**/
/**/function sleep(ms) {                                       /**/
/**/    return new Promise(resolve => setTimeout(resolve, ms));/**/
/**/  }                                                        /**/
/**///!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!





var animate = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60)
};
var canvas = document.createElement("canvas");
var width = 400;
var height = 600;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');
var player = new Player();
var computer = new Computer();
var ball = new Ball(200, 300);
p2 = 0
p1 = 0
loop = 0

var keysDown = {};

var keysDown2 = {};

var render = function () {
context.fillStyle = "#000000";
context.fillRect(0, 0, width, height);
player.render();
computer.render();
ball.render();
};

var update = function () {
player.update();
computer.update(ball);
ball.update(player.paddle, computer.paddle);
};

var step = function () {
update();
render();
animate(step);
};

function Paddle(x, y, width, height) {
this.x = x;
this.y = y;
this.width = width;
this.height = height;
this.x_speed = 0;
this.y_speed = 0;
}

Paddle.prototype.render = function () {
context.fillStyle = "#FFF";
context.fillRect(this.x, this.y, this.width, this.height);
};

Paddle.prototype.move = function (x, y) {
this.x += x;
this.y += y;
this.x_speed = x;
this.y_speed = y;
if (this.x < 0) {
    this.x = 0;
    this.x_speed = 0;
} else if (this.x + this.width > 400) {
    this.x = 400 - this.width;
    this.x_speed = 0;
}
};

function Computer() {
this.paddle = new Paddle(175, 10, 50, 10);
}

Computer.prototype.render = function () {
this.paddle.render();

};

Computer.prototype.update = function (ball) {
for (var key in keysDown2) {
    var value = Number(key);
    if (value == 65) {
        this.paddle.move(-4, 0);
    } else if (value == 68) {
        this.paddle.move(4, 0);
    } else {
        this.paddle.move(0, 0);
    }
}

};

function Player() {
this.paddle = new Paddle(175, 580, 50, 10);

}

Player.prototype.render = function () {
this.paddle.render();
};

Player.prototype.update = function () {
for (var key in keysDown) {
    var value = Number(key);
    if (value == 37) {
        this.paddle.move(-4, 0);
    } else if (value == 39) {
        this.paddle.move(4, 0);
    } else {
        this.paddle.move(0, 0);
    }
}
};

function Ball(x, y) {
this.x = x;
this.y = y;
this.x_speed = 0;
this.y_speed = 3;
}

Ball.prototype.render = function () {
context.beginPath();
context.arc(this.x, this.y, 5, 2 * Math.PI, false);
context.fillStyle = "#FFFFFF";
context.fill();
};

Ball.prototype.update = function (paddle1, paddle2) {
this.x += this.x_speed;
this.y += this.y_speed;
var top_x = this.x - 5;
var top_y = this.y - 5;
var bottom_x = this.x + 5;
var bottom_y = this.y + 5;

if (this.x - 5 < 0) {
    this.x = 5;
    this.x_speed = -this.x_speed;
} else if (this.x + 5 > 400) {
    this.x = 395;
    this.x_speed = -this.x_speed;
}

if (this.y < 0) {
    this.x_speed = 0;
    this.y_speed = 3;
    this.x = 200;
    this.y = 300;
    console.log("p1");
    p1 = p1 + 1
    document.getElementById("p1").innerText = p1
}

if (this.y > 600 ) {
    this.x_speed = 0;
    this.y_speed = -3;
    this.x = 200;
    this.y = 300;
    console.log("p2");
    p2 = p2 + 1
    document.getElementById("p2").innerText = p2;
    fillStyle = "#000";
    

}


if (top_y > 300) {
    if (top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y && top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x) {
        this.y_speed = -3;
        this.x_speed += (paddle1.x_speed / 2);
        this.y += this.y_speed;
    }
} else {
    if (top_y < (paddle2.y + paddle2.height) && bottom_y > paddle2.y && top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x) {
        this.y_speed = 3;
        this.x_speed += (paddle2.x_speed / 2);
        this.y += this.y_speed;
    }
}
};

document.body.appendChild(canvas);
animate(step);

window.addEventListener("keydown", function (event) {
keysDown[event.keyCode] = true;

});

window.addEventListener("keyup", function (event) {
delete keysDown[event.keyCode];
});




window.addEventListener("keydown", function (event) {
keysDown2[event.keyCode] = true;



});

window.addEventListener("keyup", function (event) {
delete keysDown2[event.keyCode];
});


async function win(){
while (loop == 0) {
    await sleep(10);
    if (p1 == 11){
        alert("Congrulations Player1 You Win")
        p2 = 0
        p1 = 0
    }
    else if(p2 == 11){
        alert("Congrulations Player2 You Win")
        p2 = 0
        p1 = 0
    }
}
};

win();

