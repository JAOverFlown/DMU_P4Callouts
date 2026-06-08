const BUTTONS = {
    A: {
        output: "雷出",
        output2: "背对",
        output3: "面对"
    },

    B: {
        output: "水出",
        output2: "面对",
        output3: "背对"
    },

    zh: {
        output: "放置钢铁 出",
        output2: "钢铁"
    },

    jh: {
        output: "放置月环 留",
        output2: "月环"
    },

    C: {},

    D: {},

    zs: {
        output: "放置月环 留",
        output2: "钢铁外"
    },

    js: {
        output: "放置钢铁 出",
        output2: "月环内"
    },

    E: {
        output: "雷出",
        output3: "背对"
    },

    F: {
        output: "水出",
        output3: "面对"
    },

    zl: {
        output: "真雷"
    },
    jl: {
        output: "假雷"
    },
    zb: {
        output: "真冰"
    },
    jb: {
        output: "假冰"
    },
    zl2: {},
    jl2: {},
    zb2: {},
    jb2: {}
};

const PAIRS = [
    ["A", "B"],
    ["C", "D"],
    ["zh", "jh"],
    ["zs", "js"],
    ["E", "F"],
    ["zl", "jl"],
    ["zb", "jb"],
    ["zl2", "jl2"],
    ["zb2", "jb2"]
];

const selected = {};

const pairLookup = {};

PAIRS.forEach(([a, b]) => {
    pairLookup[a] = b;
    pairLookup[b] = a;
});

function getSelected(a, b) {
    if (selected[a]) return a;
    if (selected[b]) return b;
    return null;
}

function updateButtonStyles() {
    document.querySelectorAll("button[data-id]").forEach(btn => {
        const id = btn.dataset.id;

        btn.classList.toggle(
            "selected",
            !!selected[id]
        );
    });
}

function updateOutput() {

    const lines = Array(7).fill("");

    const ab = getSelected("A", "B");
    const zhjh = getSelected("zh", "jh");
    const zsjs = getSelected("zs", "js");
    const ef = getSelected("E", "F");

    const lightning1 = getSelected("zl", "jl");
    const lightning2 = getSelected("zl2", "jl2");

    const ice1 = getSelected("zb", "jb");
    const ice2 = getSelected("zb2", "jb2");

    if (zhjh) {
        lines[2] = "场中集合，" + BUTTONS[zhjh].output;
    }

    if (zsjs) {
        lines[5] = "场中集合，" + BUTTONS[zsjs].output;
    }

    if (selected["C"]) {

        if (ab) {
            lines[0] = "提前报动静剑 + " + BUTTONS[zsjs].output2 + "后" + BUTTONS[ab].output;
            lines[1] = "C前集合，安全区，" + BUTTONS[ab].output2;
        }

        if (ef) {
            lines[3] = "提前报动静剑 + " + BUTTONS[zsjs].output2 + "后" + BUTTONS[ef].output;
            lines[4] = "C前集合，安全区，" + BUTTONS[ef].output3;
        }
    }

    if (selected["D"]) {

        if (ab) {
            lines[3] = "提前报动静剑 + " + BUTTONS[zsjs].output2 + "后" + BUTTONS[ab].output;
            lines[1] = "C前集合，安全区，" + BUTTONS[ab].output2;
        }

        if (ef) {
            lines[0] = "提前报动静剑 + " + BUTTONS[zsjs].output2 + "后" + BUTTONS[ef].output;
            lines[4] = "C前集合，安全区，" +BUTTONS[ef].output3;
        }
    }

    let lightningResult = "";
    let iceResult = "";

    if (lightning1 && lightning2) {
        lightningResult =
            ((lightning1 === "zl") === (lightning2 === "zl2"))
                ? "真雷"
                : "假雷";
    }

    if (ice1 && ice2) {
        iceResult =
            ((ice1 === "zb") === (ice2 === "zb2"))
                ? "真冰"
                : "假冰";
    }

    if (lightningResult && iceResult) {
        lines[6] =  BUTTONS[zsjs].output2 +" + "+ iceResult + lightningResult;
    }

    let text = "";

    for (let i = 0; i < lines.length; i++) {
        text += `${i + 1}: ${lines[i]}\n`;
    }

    document.getElementById("output").textContent = text;
}

function press(id) {

    const partner = pairLookup[id];

    const button = document.querySelector(
        `[data-id="${id}"]`
    );

    const partnerButton = document.querySelector(
        `[data-id="${partner}"]`
    );

    if (selected[id]) {

        delete selected[id];

        partnerButton.disabled = false;

        updateButtonStyles();
        updateOutput();
        return;
    }

    selected[id] = true;

    partnerButton.disabled = true;

    updateButtonStyles();
    updateOutput();
}

document
    .querySelectorAll("button[data-id]")
    .forEach(btn => {
        btn.addEventListener("click", () => {
            press(btn.dataset.id);
        });
    });

document
    .getElementById("resetButton")
    .addEventListener("click", () => {

        Object.keys(selected).forEach(k => {
            delete selected[k];
        });

        document
            .querySelectorAll("button[data-id]")
            .forEach(btn => {
                btn.disabled = false;
            });

        updateButtonStyles();
        updateOutput();
    });

updateOutput();