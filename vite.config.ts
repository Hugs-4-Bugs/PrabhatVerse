import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
import  react  from "@vitejs/plugin-react";



// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
  base: process.env.VITE_BASE_PATH || "/",
    server: {
    host: true,       // Make server externally accessible
    port: 5173,       // Correct port
    headers: {
      "ngrok-skip-browser-warning": "true",  // Skip Ngrok browser warning page
    },
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
