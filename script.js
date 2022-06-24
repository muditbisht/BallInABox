const ballExample = document.getElementsByClassName("ball")[0];
const screenWidth = 800;
const screenHeight = 500;
let intervalID = null;

class Ball {
    constructor(posX, posY, initVelX, initVelY, accX, accY, size = 10) {
        this.x = posX;
        this.y = posY;
        this.dx = initVelX;
        this.dy = initVelY;
        this.ax = accX;
        this.ay = accY;
        this.size = size;
        this.element = ballExample.cloneNode();
        this.element.style.borderWidth = `${this.size}px`;
        document.getElementById("screen").appendChild(this.element);
    }
    setData(posX, posY, initVelX, initVelY, accX, accY, size = 10) {
        clearInterval(intervalID);
        intervalID = null;
        this.x = parseInt(posX);
        this.y = parseInt(posY);
        this.dx = parseInt(initVelX);
        this.dy = parseInt(initVelY);
        this.ax = parseInt(accX);
        this.ay = parseInt(accY);
        this.size = parseInt(size);
        intervalID = setInterval(() => {
            this.move();
            this.render();
        }, 20);
    }
    render() {
        this.element.style.top = `${screenHeight - this.y }px`;
        this.element.style.left = `${this.x - this.size}px`;
        this.element.style.visibility = "visible";
        document.getElementById("posX").innerText = this.x;
        document.getElementById("posY").innerText = this.y;
        document.getElementById("speedX").innerText = this.dx;
        document.getElementById("speedY").innerText = this.dy;
        document.getElementById("accX").innerText = this.ax;
        document.getElementById("accY").innerText = this.ay;
    }
    move() {
        this.x += this.dx + 0.5 * this.ax;
        this.y += this.dy + 0.5 * this.ay;
        if (this.x < this.size || this.x > screenWidth - this.size) {
            this.dx = -this.dx * 0.9;
            this.x = this.x < this.size ? this.size : screenWidth - this.size;
        }
        if (this.y < this.size || this.y > screenHeight - this.size) {
            this.dy = -this.dy * 0.9;
            this.y = this.y < this.size ? this.size : screenHeight - this.size;
        }
        if (Math.abs(this.y - this.size) < 1) {
            this.dx = (this.dx < 0 ? -1 : 1) * (Math.abs(this.dx) - 0.05 > 0 ? Math.abs(this.dx) - 0.05 : 0);
        }
        this.dx += this.ax;
        this.dy += this.ay;
    }
};

// Ball(positionX,  positionY, velocityX, velocityY, accelerationX, accelerationY)
const ball = new Ball(250, 300, 10, 10, 0, -1, 10);
setInputValues(ball);
intervalID = setInterval(() => {
    ball.move();
    ball.render();
}, 20);