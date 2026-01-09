const monaco = await window.monacoPromise;

await fetch("https://raw.githubusercontent.com/chipdesk/chipdesk.github.io/main/src/res/theme/github-dark-default.json")
    .then(response => response.json())
    .then(theme => monaco.editor.defineTheme("github-dark-default", theme));

if (document.readyState === 'loading') {
    await new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve));
}

const editor = monaco.editor.create(document.getElementById("monaco"), {
    language: "javascript",
    theme: "github-dark-default",
    minimap: {
        enabled: false
    }
});

const display = document.getElementById("display");
const logs = document.getElementById("console");

editor.addCommand(
    monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
    () => display.contentWindow.postMessage({
        action: "execute",
        content: editor.getValue(),
        script: {
            module: document.getElementById(":options.module").checked,
            iife: document.getElementById(":options.iife").value
        }
    })
);

window.addEventListener("message", ({ data }) => {
    if (data.recipient) switch (data.recipient) {
        case "console": {
            logs.contentWindow.postMessage(data.forward);
        } break;
    }
});
