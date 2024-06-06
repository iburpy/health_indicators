# Usar una imagen base oficial de Node.js con una versión específica
FROM node:16

# Crear y establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto de la aplicación
EXPOSE 5173

# Comando para iniciar la aplicación
CMD ["npm", "start"]
