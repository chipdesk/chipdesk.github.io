const modifierKey =
    /Macintosh/.test(navigator.userAgent)
    ? "Meta" : "Control";
    
window.addEventListener("load", () => {
    const input = document.getElementById("input");
    
    input.addEventListener("keydown", event => {
        if (event.getModifierState(modifierKey) && event.code === "Enter") {
            event.preventDefault();
            executeInput(input.value);
        }
    });
});

function executeInput(input) {
    console.clear();
    const oldScript = document.getElementById("execute");
    const newScript = document.createElement("script");
    newScript.setAttribute("id", "execute");
    newScript.innerHTML = input;
    oldScript.replaceWith(newScript);
}
