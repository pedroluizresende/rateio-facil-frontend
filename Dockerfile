# Use a imagem Node.js como base
FROM node:latest

# Cria e define o diretório de trabalho no contêiner
WORKDIR /app

# Copia o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências, incluindo o Vite globalmente
RUN npm install -g vite && npm install --production

# Copia os arquivos do código-fonte para o diretório de trabalho
COPY . .

# Expõe a porta 3000 (ou a porta que sua aplicação React está configurada para usar)
EXPOSE 3000

# Comando para iniciar a aplicação em modo de produção
CMD ["npm", "run", "build"]
