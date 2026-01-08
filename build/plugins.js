import removeSrc from "./plugin/remove-src.js";

import monacoEditor from "vite-plugin-monaco-editor";

export default [
    removeSrc(),

    monacoEditor.default({
        languageWorkers: [ "typescript" ]
    })
];
