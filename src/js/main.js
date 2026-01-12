const ace = window.ace;

const initial =
    JSON.parse(window.localStorage.getItem("lastEntry"))
    ?? {
        content: (
`const methods = [
    { name: "error", what: "an error"    },
    { name: "warn",  what: "a warning"   },
    { name: "debug", what: "a debug log" },
    { name: "log",   what: "a log"       },
    { name: "info",  what: "an info log" }
];

console.clear();

for (const { name, what } of methods) {
    console[name](\`This is \${what}.\`);
}
`
        ),
        script: {
            module: true,
            iife: "top-level"
        }
    };

const display = document.getElementById("display");
const logs = document.getElementById("console");
const editor = ace.edit("editor", {
    theme: "ace/theme/github_dark",
    mode: "ace/mode/javascript",
    value: initial.content
});

document.getElementById(":options.module").checked = initial.script.module ?? true;
document.getElementById(":options.iife").value = initial.script.iife ?? "top-level";

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
