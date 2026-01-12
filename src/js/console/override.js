const display = document.getElementsByTagName("main")[0];

const escapeHTML = (string) => string
.replace(
    /[\u00A0-\u9999<>\&]/g,
    char => `&#${char.charCodeAt(0)};`
);

const stringify = (...messages) => messages
.map(item => escapeHTML(item.toString()))
.join(" ") || "&nbsp";

function output(className, content) {
    const element = document.createElement("div");
    element.className = className;
    element.innerHTML = content;
    display.append(element);
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
};

logger.clear = () => {
    display.innerHTML = "";
};

[
    "count", "countReset",
    "dir", "dirxml",
    "group", "groupCollapsed", "groupEnd",
    "table",
    "time", "timeEnd", "timeLog", "timeStamp",
    "trace"
]
.forEach(method =>
    logger[method] = () =>
        logger.warn(`The console method "${method}" is not supported yet.`)
);

[ "exception", "profile", "profileEnd" ]
.forEach(method =>
    logger[method] = () =>
        logger.warn(`The console method "${method}" is not supported.`)
);

// Use logger when message

window.addEventListener("message", ({ data }) => {
    switch (data.action) {
        case "method": {
            logger[data.method](...data.args);
        } break;
        case "return": {
            if (data.content === undefined) break;
            if (data.content instanceof String)
                output("return", `"${data.content}"`);
            else
                output("return", stringify(data.content ?? "null"));
        } break;
    }
});
