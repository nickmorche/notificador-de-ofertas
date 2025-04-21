# Etapa 1: Build da aplicação
FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Servir com Nginx
FROM nginx:stable-alpine

# Remove config default do Nginx
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copia seu próprio arquivo de config (opcional, fornecerei um exemplo abaixo)
COPY nginx.conf /etc/nginx/conf.d

# Copia os arquivos do build React para o diretório que o Nginx serve
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]