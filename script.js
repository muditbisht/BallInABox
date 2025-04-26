const ballExample = document.getElementsByClassName("ball")[0];
const screenWidth = 810;
const screenHeight = 500;
let intervalID = null;

function parseNumber(num) {
    return num.toFixed(2);
}


class Ball {
    dampnessX = 1;
    dampnessY = 1;
    friction = 0.0;

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
        this.x = posX;
        this.y = posY;
        this.dx = initVelX;
        this.dy = initVelY;
        this.ax = accX;
        this.ay = accY;
        this.size = size;
        intervalID = setInterval(() => {
            this.move();
            this.render();
        }, 20);
    }
    render() {
        this.element.style.top = `${screenHeight - this.y }px`;
        this.element.style.left = `${this.x - this.size}px`;
        this.element.style.visibility = "visible";
        document.getElementById("posX").innerText = parseNumber(this.x);
        document.getElementById("posY").innerText = parseNumber(this.y);
        document.getElementById("speedX").innerText = parseNumber(this.dx);
        document.getElementById("speedY").innerText = parseNumber(this.dy);
        document.getElementById("accX").innerText = parseNumber(this.ax);
        document.getElementById("accY").innerText = parseNumber(this.ay);
    }
    move() {
      // Increase distance in X-direction
      this.x += this.dx + 0.5 * this.ax;

      // Increase distance in Y-direction
      this.y += this.dy + 0.5 * this.ay;

      // Change after ball hit either (left-right) side
      if (this.x < this.size || this.x > screenWidth - this.size) {
        this.dx = -this.dx * this.dampnessX; // dampening effect of ground

        // change on x (if we don't do this ball would just go underground)
        this.x = this.x < this.size ? this.size : screenWidth - this.size;
      }

      // Change after ball hit either (top-bottom) side
      if (this.y < this.size || this.y > screenHeight - this.size) {
        this.dy = -this.dy * this.dampnessY; // dampening effect of ground

        // change on y (if we don't do this ball just freezes on floor)
        this.y = this.y < this.size ? this.size : screenHeight - this.size;
      }

      // this take friction in-account
      if (Math.abs(this.y - this.size) < 1) {
        this.dx =
          (this.dx < 0 ? -1 : 1) *
          (Math.abs(this.dx) - this.friction > 0 ? Math.abs(this.dx) - this.friction : 0);
      }

      this.dx += this.ax;
      this.dy += this.ay;
    }
};

// Ball(positionX,  positionY, velocityX, velocityY, accelerationX, accelerationY)
const ball = new Ball(250, 300, 0, 0, 0, -1, 10);
setInputValues(ball);
intervalID = setInterval(() => {
    ball.move();
    ball.render();
}, 20);