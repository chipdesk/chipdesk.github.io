window.addEventListener("message", ({ data }) =>
    logger[data.method](...data.args)
);
