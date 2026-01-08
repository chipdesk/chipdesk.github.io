require.config({ 
    paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.52.0/min/vs' } 
});

require(['vs/editor/editor.main'], function() {
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.ES2020,
        lib: ["es2020", "dom"]
    });
});

window.addEventListener("load", () => {
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
