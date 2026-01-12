const methods = [
    { name: "error", what: "an error"    },
    { name: "warn",  what: "a warning"   },
    { name: "debug", what: "a debug log" },
    { name: "log",   what: "a log"       },
    { name: "info",  what: "an info log" }
];

console.clear();

for (const { name, what } of methods) {
    console[name](`This is ${what}.`);
}
