import * as Monaco from "monaco-editor/esm/vs/editor/editor.api";

const modifierKey =
    /Macintosh/.test(navigator.userAgent)
    ? "Meta" : "Control";
    
window.addEventListener("load", () => {
    const editor = Monaco.editor.create(document.getElementById("monaco"), {
        language: "javascript",
        minimap: {
            enabled: false
        }
    });

    const display = document.getElementById("display").contentDocument;
    const logs = document.getElementById("console");
    
    editor.addCommand(
        Monaco.KeyMod.CtrlCmd | Monaco.KeyCode.Enter,
        () => executeInput(editor.getValue())
    );

    function executeInput(input) {
        const oldScript = display.getElementById("execute");
        const newScript = display.createElement("script");
        newScript.setAttribute("id", "execute");
        newScript.innerHTML = input;
        oldScript.replaceWith(newScript);
    }

    window.addEventListener("message", ({ data }) => {
        if (data.action === "console")
            logs.contentWindow.postMessage(data.forward);
    });
});
