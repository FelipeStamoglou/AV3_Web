FROM nginx:alpine

# Copia configurações do nginx
# COPY default.conf /etc/nginx/conf.d/default.conf

# Coloquei essa configuração para testar o front simultaneamente com o back-end
# Remove a página padrão do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia apenas o arquivo de config
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
