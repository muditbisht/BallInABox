function formSubmit() {
    console.log(event);
    event.preventDefault();
    let [posX, posY] = [document.getElementById("in-posX").value, document.getElementById("in-posY").value];
    let [velX, velY] = [document.getElementById("in-velX").value, document.getElementById("in-velY").value];
    let [accX, accY] = [document.getElementById("in-accX").value, document.getElementById("in-accY").value];
    ball.setData(posX, posY, velX, velY, accX, accY);
    console.log(posX, posY, velX, velY, accX, accY);
    console.log(ball);
    document.getElementById("stop").removeAttribute("disabled");
    document.getElementById("start").setAttribute("disabled", true);
}

function setInputValues(ball) {
    document.getElementById("in-posX").value = ball.x;
    document.getElementById("in-posY").value = ball.y;
    document.getElementById("in-velX").value = ball.dx;
    document.getElementById("in-velY").value = ball.dy;
    document.getElementById("in-accX").value = ball.ax;
    document.getElementById("in-accY").value = ball.ay;
}

function stopCycle() {
    clearInterval(intervalID);
    intervalID = null;
    document.getElementById("stop").setAttribute("disabled", true);
    document.getElementById("start").removeAttribute("disabled");
}

function startCycle() {
    console.log(intervalID);
    if (intervalID === null) {
        intervalID = setInterval(() => {
            ball.move();
            ball.render();
        }, 20);
        document.getElementById("stop").removeAttribute("disabled");
        document.getElementById("start").setAttribute("disabled", true);
    }
}