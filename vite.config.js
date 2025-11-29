import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite' //Connector for Tailwind CSS and Vite, not just tailwind


export default defineConfig({
  plugins: [
    react(),
  //  tailwindcss()
  ],
  server: {
    // Server config issues so I'm forcing IPv4 and a specific port
    host: '127.0.0.1', // Forces IPv4 
    port: 3000,        // Forced port
    strictPort: true,
    open: true
  }
})