import { defineConfig } from "vite";

export default defineConfig({
    base: "/plant-mama/", // Base URL for the project
    server: {
        open: true, // Auto-open browser on startup
    },
    build: {
        sourcemap: true, // Useful for debugging
    },
});
