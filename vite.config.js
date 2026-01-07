import { defineConfig } from "vite";
import { glob } from "glob";

import plugins from "./build/plugins.js";

export default defineConfig({
    preview: {
        port: 2763
    },
    build: {
        emptyOutDir: true,
        assetsInlineLimit: 0,
        sourcemap: true,
        rollupOptions: {
            input: [
                ...glob.sync("src/**/*.html")
            ]
        }
    },
    css: {
        devSourcemap: true
    },
    plugins
});
