# Imagem base
FROM node:18

# Diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos de dependência
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código
COPY . .

# Expor a porta usada pelo app (ex: 5000)
EXPOSE 5000

# Comando para iniciar o backend
CMD ["npm", "run", "dev"]