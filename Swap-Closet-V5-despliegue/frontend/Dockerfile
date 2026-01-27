# ---------- BUILD ----------
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Forzamos build production (aunque tu script "build" esté en development)
RUN npx ng build --configuration production

# ---------- RUNTIME ----------
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Tu outputPath es "www"
COPY --from=build /app/www/ /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
