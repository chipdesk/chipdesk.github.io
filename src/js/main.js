const storage = JSON.parse(window.localStorage.getItem("lastEntry"));

const monaco = await window.monacoPromise;

await fetch("../res/theme/github-dark-default.json")
    .then(response => response.json())
    .then(theme => monaco.editor.defineTheme("github-dark-default", theme));

if (document.readyState === "loading") {
    await new Promise(resolve => document.addEventListener("DOMContentLoaded", resolve));
}

document.getElementById(":options.module").checked = storage?.script.module ?? true;
document.getElementById(":options.iife").value = storage?.script.iife ?? "top-level";

const editor = monaco.editor.create(document.getElementById("monaco"), {
    language: "javascript",
    value: storage?.content ?? "",
    theme: "github-dark-default",
    minimap: {
        enabled: false
    }
});

const display = document.getElementById("display");
const logs = document.getElementById("console");

editor.addCommand(
    monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
    () => {
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
);

window.addEventListener("message", ({ data }) => {
    if (data.recipient) switch (data.recipient) {
        case "console": {
            logs.contentWindow.postMessage(data.forward);
        } break;
    }
});
