function init(i) {
    "use strict";
    var h = window.screen.height;  // 704  604 596
    var w = window.screen.width; //  1252 1180 1172   1.6
    var panel = document.getElementById("panel");
    var fs = 500;
    var c = 0;

    var chrctr = [[], []];
    chrctr[0] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K",
            "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W",
            "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i",
            "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u",
            "v", "w", "x", "y", "z", "9", "8", "7", "6", "5", "4", "3",
            "2", "1", "0"];
    chrctr[1] = ["Α", "Β", "Γ", "Δ", "Ε", "Ζ", "Η", "Θ", "Ι", "Κ", "Λ",
            "Μ", "Ν", "Ξ", "Ο", "Π", "Ρ", "Σ", "Τ", "Υ", "Φ", "Χ", "Ψ",
            "Ω", "α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "ι", "κ", "λ",
            "μ", "ν", "ξ", "ο", "π", "ρ", "σ", "τ", "υ", "φ", "χ", "ψ",
            "ω", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0"];


    panel.style.width = w + "px";
    panel.style.height = h + "px";

    function project() {
        panel.innerHTML = chrctr[i][c];
        panel.style.fontSize = fs + "px";
        fs -= 2;
        if (fs > 0) {
            if ((fs < 4) && (c < chrctr[i].length - 1)) {
                c += 1;
                fs = 400;
            }
            setTimeout(project, 30);
        } else {
            panel.innerHTML = "";
        }
    }

    project();
}

window.onload = function () {
    "use strict";
    document.getElementById("start").onclick = function (e) {
        var i;
        requestFullScreen();
        i = (e.ctrlKey)
            ? 1
            : 0;
        init(i);
    };
};