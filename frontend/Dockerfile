# ===============================
# 1. Etapa de build do frontend
# ===============================
FROM node:20-alpine AS build

WORKDIR /app

# Copia apenas package.json para instalar dependências
COPY package*.json ./

RUN npm install

# Copia o restante do frontend
COPY . .

# Gera o build da aplicação Vite
RUN npm run build



# ===============================
# 2. Etapa final - Servida pelo Nginx
# ===============================
FROM nginx:alpine

# Remove configurações default do nginx e arquivos antigos
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos do build
COPY --from=build /app/dist /usr/share/nginx/html

# Expor porta padrão
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
