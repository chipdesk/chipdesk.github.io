const consoleElement = document.getElementById("console");

[
    "log",
    "warn",
    "error",
    "info",
    "debug"
].forEach(method => {
    console[method] = (...input) => {
        const element = document.createElement("div");
        element.classList.add(method);
        element.textContent = (input.join(" "));
        consoleElement.append(element);
    }
});
