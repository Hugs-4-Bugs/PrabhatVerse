import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
    server: {
    host: true,       // Make server externally accessible
    port: 5173,       // Correct port
    headers: {
      "ngrok-skip-browser-warning": "true",  // Skip Ngrok browser warning page
    },
  },
});

