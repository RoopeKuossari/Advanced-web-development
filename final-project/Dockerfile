# Vaihe 1: Rakentaminen (Build stage)
FROM node:20-slim AS build
WORKDIR /app

# Kopioidaan pakettitiedostot ja asennetaan riippuvuudet
COPY package*.json ./
RUN npm install

# Kopioidaan koodit ja rakennetaan projekti
COPY . .
RUN npm run build

# Vaihe 2: Tarjoileminen (Production stage)
FROM nginx:stable-alpine
# Kopioidaan rakennettu sisältö Nginxin oletuskansioon
COPY --from=build /app/dist /usr/share/nginx/html

# Avataan portti 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]