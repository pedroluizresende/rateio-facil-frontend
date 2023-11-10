# Use a imagem Node.js como base
FROM node:latest

# Cria e define o diretório de trabalho no contêiner
WORKDIR /app

# Copia o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia os arquivos do código-fonte para o diretório de trabalho
COPY . .

# Expõe a porta 3000 (ou a porta que sua aplicação React está configurada para usar)
EXPOSE 3000

# Comando para iniciar a aplicação (pode precisar ser ajustado com base nas configurações da sua aplicação)
CMD ["npm", "run", "dev"]
