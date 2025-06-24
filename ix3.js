var stanza = [[], [], []];

function textFile(i) {
    "use strict";
    var reader = new XMLHttpRequest();
    var text;

    function textArray(data) {
        var begin;
        var end;
        var j = 0;

        // ewmocw \r breaks
        data = data.replace(/(\r)/gm, "");

        begin = 0;
        end = -4; // it affects stanza 1

        do {
            begin = end + 1; // +1 to skip the initial hard return
            end = data.indexOf("\n\n", begin);
            if (end === -1) {
                end = data.length;
            }
            stanza[i][j] = data.substring(end, begin + 1); // wotjout empty paragraphs
            j += 1;
        } while (end !== data.length);
    }

    function loadData() {
        var data;
        if (reader.readyState === 4) {
            data = reader.responseText;
            textArray(data);
        }
    }

    function loadFile() {
        reader.open("get", text, true);
        reader.send(null);
        reader.onreadystatechange = loadData;
    }

    text = "text" + i + ".txt";
    loadFile();
}

// returns a random number from 0 to |n|-1
function random(n) {
    var now = new Date();
    var tim = now.getTime();
    var rndm;
    n = Math.floor(n);
    rndm = tim % n;
    return rndm;
}

// i indicates the poem selected
function init(i) {
    "use strict";
    var h = window.screen.height;
    var w = window.screen.width;
    var panel = document.getElementById("panel");
    var c = 0; // counter of elements of stanza
    var total = 0; // total letters of stanzaw
    var rndm = random(stanza[i].length) + 1;
    var current = ""; // current letter
    var previous;
    var delay; // between letters

    panel.style.width = w + "px";
    panel.style.height = h + "px";
    panel.style.fontSize = "250px";

    function project() {
        previous = current;
        current = stanza[i][rndm].substr(c, 1);
        if (current === previous) {
            current = ""; // blink
            delay = 80;
        } else {
            c += 1;
            delay = 1000;
        }
        panel.innerHTML = current;
        if (c <= stanza[i][rndm].length) {
            total += 1;
            setTimeout(project, delay);
        } else { // start another stanza or stop
            if (total < 300) { // 300 letters * 1" = 5'
                rndm = (rndm < stanza[i].length - 1)
                    ? rndm + 1
                    : 1;
                c = 0;
                setTimeout(project, 2000);
            } // else end
        }
    }

    project();
}

window.onload = function () {
    "use strict";
    // load all text files
    textFile(0);
    textFile(1);
    textFile(2);
    document.getElementById("start").onclick = function (e) {
        var i;
        requestFullScreen();
        i = (e.ctrlKey)
            ? 1
            : (e.altKey)
                ? 2
                : 0;
        init(i);
    };
};