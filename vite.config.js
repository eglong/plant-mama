import { defineConfig } from "vite";

export default defineConfig({
    server: {
        open: true, // Auto-open browser on startup
    },
    build: {
        sourcemap: true, // Useful for debugging
    },
});
