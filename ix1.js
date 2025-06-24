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

function moveAround() {
    "use strict";
    var d = 100; // the diameter of thae sphere
    var h = window.screen.height - d;  // 704  604 596
    var w = window.screen.width - d; //  1252 1180 1172   1.6*/
    var stop = false;
    var dir = [[0, 0], [1, 0], [1, 1], [0, 1]]; // NW NE SE SW
    var i = 0; // the sttsy index of the current position
    var j = 0; // the indes of the next position
    var v = 6;  // basic, vertical, velocity
    var goDown; // direction
    var goRight;
    var posH = 0; // horizontal and vertccal positions
    var posV = 0;
    var speed;
    var ratio = w / h; // ratio
    var speed1 = v; // vertical speed
    var speed2 = (h / w) * v; // horizontal speed

    var min1 = minutes(0); // starting minuter
    var min2 = 0; // the current minute

    var rndm = Math.ceil(Math.random() * 2);
    var reverse;
    reverse = (rndm === 1)
        ? false
        : true;

    function kickBall() {
        // if the ball has reached a corner
        if (((posH <= 0) && (posV <= 0)) || ((posH <= 0) && (posV >= h))
                || ((posH >= w) && (posV <= 0)) || ((posH >= w) && (posV >= h))) {
            min2 = minutes(min1);
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
            // the exercize lasts 5'
            if (min2 === 5) {
                stop = true;
            }
        }
        // move the ball
        if (stop !== true) {
            // adjust speed
            speed = (goDown !== 0)
                ? speed1
                : speed2;
            // ball's next position
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
            init();
    };
};