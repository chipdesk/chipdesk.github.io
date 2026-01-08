[
    "debug", "dir", "dirxml", "error", "group", "groupCollapsed", "groupEnd",
    "info", "log", "table", "time", "timeEnd", "timeLog", "timeStamp", "trace",
    "warn"
]
.forEach(method =>
    console[method] = (...args) =>
        parent.postMessage({
            action: "console",
            forward: { method, args }
        })
);

window.addEventListener("error", event => window.alert(event.message));
