import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",  // ← Must be "/" for Vercel
  server: {
    host: true,
    port: 5173,
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  },
  build: {
    outDir: "dist",
  },
});












// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";  // Correct import statement

// export default defineConfig({
//   plugins: [react()],  // Use the react plugin
//   base: process.env.VITE_BASE_PATH || "/PrabhatVerse",
//   server: {
//     host: true,       // Make server externally accessible
//     port: 5173,       // Correct port
//     headers: {
//       "ngrok-skip-browser-warning": "true",  // Skip Ngrok browser warning page
//     },
//   },
// });
