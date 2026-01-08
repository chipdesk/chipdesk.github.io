window.addEventListener("load", async () => {
    const editor = monaco.editor.create(document.getElementById("monaco"), {
        language: "javascript",
        theme: "vs-dark",
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
