window.addEventListener("message", ({ data }) => {
    if (data.action === "execute") {
        const oldScript = document.getElementById("execute");
        const newScript = document.createElement("script");
        newScript.setAttribute("id", "execute");

        if (data.script.module) newScript.setAttribute("type", "module");

        let keyword = "",
            prefix = "",
            suffix = "";
        switch (data.script.iife) {
            case "async":
                keyword = "async ";
            case "sync":
                prefix = `Promise.resolve((${keyword}() => {\n\n`;
                suffix = `\n\n})()).then(item => parent.postMessage({ recipient: "console", forward: { action: "return", content: item }}));`;
            case "top-level":
                newScript.innerHTML = `\n${prefix}${data.content}${suffix}\n`;
        }
        
        oldScript.replaceWith(newScript);
    }
});
