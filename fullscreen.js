function requestFullScreen() {
    "use strict";
    var el = document.body;
    // Supports most browsers and their versions.
    var requestMethod = el.requestFullScreen || el.webkitRequestFullScreen
            || el.mozRequestFullScreen || el.msRequestFullScreen;
    var wscript;

    if (requestMethod) {
        // Native full screen.
        requestMethod.call(el);
    } else if (window.ActiveXObject !== "undefined") {
        // Older IE.
        wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }

    document.body.style.overflow = "hidden";
    document.body.style.cursor = 'none';
}