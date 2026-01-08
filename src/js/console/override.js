const consoleElement = document.getElementsByTagName("main")[0];

const escapeHTML = (string) => string
.replace(
    /[\u00A0-\u9999<>\&]/g,
    char => `&#${char.charCodeAt(0)};`
);

const stringify = (...messages) => messages
.map(
    item => escapeHTML(item.toString())
).join(" ")

function output(className, content) {
    const element = document.createElement("div");
    element.className = className;
    element.innerHTML = content;
    consoleElement.append(element);
}

// Console methods

const logger = {};

[ "debug", "error", "info", "log", "warn" ]
.forEach(method =>
    logger[method] = (...message) =>
        output(method, stringify(...message))
);

logger.assert = (assertion, ...message) => {
    if (!assertion) {
        output("error", "Assertion failed: " + stringify(...message));
    }
}

[ "dir", "dirxml", "group", "groupCollapsed", "groupEnd", "table", "time", "timeEnd", "timeLog", "timeStamp", "trace" ]
.forEach(method =>
    logger[method] = () =>
        logger.warn(`The console method "${method}" is not supported yet.`)
);

[ "profile", "profileEnd" ]
.forEach(method =>
    logger[method] = () =>
        logger.warn(`The console method "${method}" is not supported.`)
);

// Use logger when message

window.addEventListener("message", ({ data }) =>
    logger[data.method](...data.args)
);

