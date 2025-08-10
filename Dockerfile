# Stage 1: Build Stage (Development)
FROM oven/bun:latest AS build

WORKDIR /app

# Salin file konfigurasi dan instal dependensi
COPY package.json ./
RUN bun install

# Salin kode sumber aplikasi
COPY . .

# Instal npm untuk mengakses npx
RUN apt-get update && apt-get install -y npm

# Generate Prisma Client menggunakan npx
RUN npx prisma generate

# Build aplikasi TypeScript
RUN bun build src/index.ts --outfile dist/index.js --target node

# Stage 2: Production Stage
FROM node:24.5-alpine3.22 AS production

WORKDIR /app

RUN apk add --no-cache curl bash

# Instal Bun di Production Stage
RUN curl -fsSL https://bun.sh/install | bash

# Menambahkan Bun ke PATH secara eksplisit
ENV PATH="/root/.bun/bin:$PATH"

# Memverifikasi apakah bun dapat dijalankan
RUN bun --version

# Salin hanya file yang dibutuhkan dari build stage
COPY --from=build /app /app

# Install hanya dependensi produksi
RUN bun install --prod

# Expose port untuk aplikasi
EXPOSE 3000

# Health Check (opsional)
HEALTHCHECK CMD curl --fail http://localhost:3000/ || exit 1

# Jalankan aplikasi menggunakan Bun yang sudah terinstal
CMD ["bun", "run", "dist/index.js"]
