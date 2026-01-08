[
    "assert",
    "clear",
    "count", "countReset",
    "debug",
    "dir", "dirxml",
    "error", "exception",
    "group", "groupCollapsed", "groupEnd",
    "info", "log",
    "profile", "profileEnd",
    "table",
    "time", "timeEnd", "timeLog", "timeStamp",
    "trace",
    "warn"
]
.forEach(method =>
    console[method] = (...args) =>
        parent.postMessage({
            action: "console",
            forward: { method, args }
        })
);

window.addEventListener("error", event => console.error(event.message));
