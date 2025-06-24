var obj;

function moveAround() {
    "use strict";
    var d = 100; // the diameter of thae sphere
    var h = window.screen.height - d;  // screen resolution: 1252 x 704
    var w = window.screen.width - d; // : 1152 x 604  = 1.91 x 1 : 2.16
    var i = 0; // the current and next indexes of the array
    var posH = 0; // horizontal and vertccal positions
    var posV = 0;


    function kickBall() {
        posH = Math.floor(Math.random() * w);
        posV = Math.floor(Math.random() * h);
        obj.style.left = posH + "px";
        obj.style.top = posV + "px";
        i += 1;
        if (i < 300) { // 500" / 60 = 5; 
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

    moveAround();
}

window.onload = function () {
    "use strict";
    document.getElementById("start").onclick = function (e) {
        requestFullScreen();
        init();
    };
};