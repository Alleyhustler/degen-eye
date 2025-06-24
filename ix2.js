var obj;

// IT RETURNS THE TIME IN MINUTES SINCE STARTING
function minutes(min1) {
    "use strict";
    var now;
    var mn;  // from now
    var sc;
    var min; // elapsed minutes
    now = new Date();
    mn = now.getMinutes();
    sc = now.getSeconds();
    min = (mn + (sc / 60)) - min1;
    // if change of hour zeros minutes
    if (min < 0) {
        min = min + 60;
    }
    return Math.floor(min);
}

function moveAround(obj) {
    "use strict";
    var d = 100; // the diameter of thae sphere
    var w = window.screen.width - d; //  1252 1180 1172   1.6
    var h = window.screen.height - d;  // 704  604 596
    var stop = false;
    var dir = [[0, 0], [1, 0], [1, 1], [0, 1]];
    var i = 0; // the sttsy index of the current position
    var j = 0; // the indes of the next position
    var goDown; // direction
    var goRight;
    var posH = 0; // horizontal and vertccal positions
    var posV = 0;
    var speed;
    var ratio = w / h; // ratio
    var v = 50; // the distance between 2 iterations
    var speed1 = (h / h) * v; // vertical speed
    var speed2 = (h / w) * v; // horizontal speed
    var opposite = true;

    var min1 = minutes(0); // starting minuter
    var min2 = 0; // the current minute
    var min2a = 0;
    var min2b = 0;

    var rndm = Math.ceil(Math.random() * 2);
    var reverse;
    reverse = (rndm === 1)
        ? false
        : true;

    function kickBall() {
        // when the ball is at a corner
        if (((posH <= 0) && (posV <= 0)) || ((posH <= 0) && (posV >= h))
                || ((posH >= w) && (posV <= 0)) || ((posH >= w) && (posV >= h))) {
            // check the time
            min2 = minutes(min1);
            min2a = min2b;
            min2b = min2;
            // the exercize lasts 5'
            if (min2 === 5) {
                stop = true;
            }
            // change to the next corner
            i = j;
            if (reverse === false) {
                j = (i + 1 < 4)
                    ? i + 1
                    : i + 1 - 4;
            } else {
                j = (i - 1 < 0)
                    ? i - 1 + 4
                    : i - 1;
            }
            goRight = dir[j][0] - dir[i][0];
            goDown = dir[j][1] - dir[i][1];
        }
        // move the ball along
        if (stop !== true) {
            // different speed intervals
            speed = (goDown !== 0)
                ? speed1
                : speed2;
            // the balls position
            posH = posH + goRight * ratio * speed;
            posV = posV + goDown * speed;
            // bring the ball back in the court
            if (posH < 0) {
                posH = 0;
            }
            if (posV < 0) {
                posV = 0;
            }
            if (posH > w) {
                posH = w;
            }
            if (posV > h) {
                posV = h;
            }
            /* the first=beat ball follows the first if
               the second beat ball one of the rest     */
            if (opposite === false) { // first/beat ball
                obj.style.left = posH + "px";
                obj.style.top = posV + "px";
            } else if (posV === 0) { // top -> bottom
                obj.style.left = (w - posH) + "px";
                obj.style.top = (posV + h) + "px";
            } else if (posV === h) { // bottom -> top
                obj.style.left = (w - posH) + "px";
                obj.style.top = (posV - h) + "px";
            } else if (posH === 0) { // left -> right
                obj.style.left = (posH + w) + "px";
                obj.style.top = (h - posV) + "px";
            } else if (posH === w) { // right -> left
                obj.style.left = (posH - w) + "px";
                obj.style.top = (h - posV) + "px";
            }
            // change first-beat and second beat balls
            opposite = !opposite;
            // the balls alternate every 1"
            setTimeout(kickBall, 1000);
        }
    }

    kickBall();
}

function init() {
    "use strict";
    var panel = document.getElementById("panel");
    obj = document.getElementById("ball");
    // wipe away the intro
    panel.innerHTML = "";
    // set the ball at the starting position
    obj.style.position = "absolute";
    obj.style.left = "0px";
    obj.style.top = "0px";

    moveAround(obj);
}

window.onload = function () {
    "use strict";
    document.getElementById("start").onclick = function () {
        requestFullScreen();
        init();
    };
};