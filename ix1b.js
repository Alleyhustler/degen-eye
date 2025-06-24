var obj;
var v;  // basic, vertical, velocity

// IT RETURNS THE TIME IN MINUTES SINCE STARTING (min1)
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

function moveAround() {
    "use strict";
    var d = 100; // the diameter of thae sphere
    var h = window.screen.height - d;  // screen resolution: 1252 x 704
    var w = window.screen.width - d; // : 1152 x 604  = 1.91 x 1 : 2.16
    var stop = false;
    var dir = [[0, 0], [1, 0], [1, 1], [0, 1]]; // NW NE SE SW
    var i = 0; // the current and next indexes of the array
    var j = 0; // the indes of the next position
    var i0; // former positions of j and j
    var j0;
    var goDown; // direction
    var goRight;
    var posH = 0; // horizontal and vertccal positions
    var posV = 0;
    var speed;
    var ratio = w / h; // screen ratio
    var speed1 = (h / h) * v; // vertical speed
    var speed2 = (h / w) * v; // horizontal speed
    // Pythagorian theorem formula:
    var speed3 = (h / Math.sqrt((h * h) + (w * w))) * v; // diagonal speed
    var rndm; // random selection of direction from 0 to 3

    var min1 = minutes(0); // starting minuter
    var min2; // the current minute

    function kickBall() {
        // when the ball reaches a corner
        if (((posH <= 0) && (posV <= 0)) || ((posH <= 0) && (posV >= h))
                || ((posH >= w) && (posV <= 0)) || ((posH >= w) && (posV >= h))) {
            min2 = minutes(min1);
            // bring the ball back into the court
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
            // random direction
            i0 = i;
            j0 = j;
            // to exclude returning to former postion
            do {
                rndm = Math.ceil(Math.random() * 3);
                i = j0;
                j = (i + rndm < 4)
                    ? i + rndm
                    : i + rndm - 4;
}           while ((i0 === j) && (j0 === i))
            goRight = dir[j][0] - dir[i][0];
            goDown = dir[j][1] - dir[i][1];
            // the exercize lasts 5'
            if (min2 === 5) {
                stop = true;
            }
        }
        // move the ball along
        if (stop !== true) {
            // choose right speed interval
            if ((Math.abs(goRight) + Math.abs(goDown)) === 2) {
                speed = speed3; // diagonically
            } else if (goDown === 0) {
                speed = speed2; // horizontally
            } else {
                speed = speed1; // vertically
            }
            // the ball's next position
            posH = posH + goRight * ratio * speed;
            posV = posV + goDown * speed;
            obj.style.left = posH + "px";
            obj.style.top = posV + "px";

            setTimeout(kickBall, 5);
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

    moveAround();
}

window.onload = function () {
    "use strict";
    document.getElementById("start").onclick = function (e) {
        requestFullScreen();
        v = (e.ctrlKey)
            ? 3
            : 6;
        init();
    };
};