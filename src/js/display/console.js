[
    "assert",
    "clear",
    "count", "countReset", // todo
    "debug",
    "dir", "dirxml", // todo
    "error", "exception",
    "group", "groupCollapsed", "groupEnd", // todo
    "info", "log",
    "profile", "profileEnd",
    "table", // todo
    "time", "timeEnd", "timeLog", "timeStamp", // todo
    "trace", // todo
    "warn"
]
.forEach(method =>
    console[method] = (...args) =>
        parent.postMessage({
            recipient: "console",
            forward: {
                action: "method",
                method, args
            }
        })
);

window.addEventListener("error", event => console.error(event.message));
