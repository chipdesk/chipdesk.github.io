const ace = window.ace;

const modifierKey =
    /Macintosh/.test(navigator.userAgent)
    ? "Meta" : "Control";

const storage = JSON.parse(window.localStorage.getItem("lastEntry"));

const display = document.getElementById("display");
const logs = document.getElementById("console");
const editor = ace.edit("editor", {
    theme: "ace/theme/github_dark",
    mode: "ace/mode/javascript",
    value: storage.content ?? await fetch("./res/default-content.js").then(r => r.text())
});

document.getElementById(":options.module").checked = storage?.script.module ?? true;
document.getElementById(":options.iife").value = storage?.script.iife ?? "top-level";

editor.commands.addCommand({
    name: "execute",
    bindKey: {
        win: "Ctrl-Enter",
        mac: "Command-Enter"
    },
    exec(editor) {
        const data = {
            content: editor.getValue(),
            script: {
                module: document.getElementById(":options.module").checked,
                iife: document.getElementById(":options.iife").value
            }
        };

        display.contentWindow.postMessage({
            action: "execute",
            ...data
        });

        window.localStorage.setItem("lastEntry", JSON.stringify(data));
    }
});

window.addEventListener("message", ({ data }) => {
    if (data.recipient) switch (data.recipient) {
        case "console": {
            logs.contentWindow.postMessage(data.forward);
        } break;
    }
});
