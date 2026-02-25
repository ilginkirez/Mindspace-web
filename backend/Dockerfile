FROM node:20-alpine

WORKDIR /app

# Bağımlılıklar
COPY package*.json ./
RUN npm ci

# Kaynak kodlar
COPY . .

# Prisma client oluştur + TypeScript derle
RUN npx prisma generate
RUN npm run build

# Sadece production node_modules kalsın
RUN npm prune --omit=dev

EXPOSE 3000

# Veritabanı migration + sunucu başlatma
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]
