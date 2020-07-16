const ballExample = document.getElementsByClassName("ball")[0];
const screenWidth = 800;
const screenHeight = 500;
class Ball {
    constructor(posX, posY, initVelX, initVelY, accX, accY, size = 5) {
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
    render() {
        this.element.style.top = `${screenHeight - this.y}px`;
        this.element.style.left = `${this.x}px`;
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
        this.dx += this.ax;
        this.dy += this.ay;
    }
};

// Ball(positionX,  positionY, velocityX, velocityY, accelerationX, accelerationY)
const ball1 = new Ball(300, 400, 0, -2, 0, -2, 10);
const ball2 = new Ball(100, 200, 30, 50, 0, -2, 10);
setInterval(() => {
    ball1.move();
    ball1.render();
    ball2.move();
    ball2.render();
}, 20);