const modifierKey =
    /Macintosh/.test(navigator.userAgent)
    ? "Meta" : "Control";

const storage = JSON.parse(window.localStorage.getItem("lastEntry"));

document.getElementById(":options.module").checked = storage?.script.module ?? true;
document.getElementById(":options.iife").value = storage?.script.iife ?? "top-level";
editor.value = storage.content;

const editor = document.getElementById("editor");
const display = document.getElementById("display");
const logs = document.getElementById("console");

editor.addEventListener("keydown", event => {
    if (event.getModifierState(modifierKey) && event.code === "Enter") {
        event.preventDefault();
        const data = {
            content: editor.value,
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
