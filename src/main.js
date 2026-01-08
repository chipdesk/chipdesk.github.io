fetch("https://raw.githubusercontent.com/brijeshb42/monaco-themes/refs/heads/master/themes/GitHub%20Dark.json")
.then(response => response.json())
.then(theme => monaco.editor.defineTheme("github-dark", theme));

window.addEventListener("load", async () => {
    const editor = monaco.editor.create(document.getElementById("monaco"), {
        language: "javascript",
        theme: "github-dark",
        minimap: {
            enabled: false
        }
    });

    const display = document.getElementById("display").contentDocument;
    const logs = document.getElementById("console");
    
    editor.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
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
