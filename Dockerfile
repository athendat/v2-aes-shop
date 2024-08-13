# Etapa 1: Construcción
FROM node AS builder

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instalar las dependencias de la aplicación
RUN npm install --force

# Copiar todo el proyecto en el directorio de trabajo
COPY . .

# Construir la aplicación Angular
RUN npm run build:ssr

# Etapa 2: Servidor de producción
FROM node

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar los archivos de la etapa de construcción
COPY --from=builder /app/dist ./dist

# Instalar solo las dependencias de producción
COPY package*.json ./
RUN npm install --production --force

# Establecer el entorno como producción
ENV NODE_ENV=production

# Exponer el puerto en el que correrá la aplicación
EXPOSE 4000

# Comando para iniciar la aplicación SSR
CMD ["npm", "run", "serve:ssr"]
