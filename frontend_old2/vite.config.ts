import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// ===========================================================
// Configuração completa do Vite para o projeto Minhas Notas
// - Suporte ao alias "@"
// - Compatível com Docker e Docker Compose
// - Hot reload dentro do container (usePolling)
// - Compatível com Nginx servindo o build em produção
// ===========================================================

export default defineConfig({
  plugins: [react()],

  // Alias para permitir importações como "@/components/Button"
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // Configurações para ambiente de desenvolvimento
  server: {
    host: true,        // permite acesso externo (Docker/WSL)
    port: 5173,        // porta fixa
    strictPort: true,  // impede o Vite de mudar a porta automaticamente
    watch: {
      usePolling: true, // necessário para hot reload dentro do Docker
    },
  },

  // Configurações para o modo "vite preview"
  preview: {
    port: 4173,        // porta padrão usada pelo "npm run preview"
    host: true,
  },
});
