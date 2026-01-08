const modifierKey =
    /Macintosh/.test(navigator.userAgent)
    ? "Meta" : "Control";
    
window.addEventListener("load", () => {
    const input = document.getElementById("input");
    const display = document.getElementById("display").contentDocument;
    const logs = document.getElementById("console");
    
    input.addEventListener("keydown", event => {
        if (event.getModifierState(modifierKey) && event.code === "Enter") {
            event.preventDefault();
            executeInput(input.value);
        }
    });

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
