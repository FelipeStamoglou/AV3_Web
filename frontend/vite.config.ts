import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Configuração padrão + compatível com Docker Compose + Nginx
export default defineConfig({
  plugins: [react()],

  // Alias para suportar "@/algumaCoisa"
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    host: true,     // permite acesso externo (docker)
    port: 5173,     // porta fixa
    strictPort: true,
    watch: {
      usePolling: true, // importante para hot reload dentro do Docker
    },
  },

  // importante para o Nginx servir arquivos estáticos do build
  preview: {
    port: 4173,
    host: true,
  },
});
