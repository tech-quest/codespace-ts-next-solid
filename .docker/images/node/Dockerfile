FROM node:18.16.0-bullseye-slim

RUN apt-get update \
    && apt-get install -y git vim locales \
    && sed -i -E 's/# (ja_JP.UTF-8)/\1/' /etc/locale.gen && locale-gen \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /var/www

ENV TZ="Asia/Tokyo"
ENV PRISMA_CLI_QUERY_ENGINE_TYPE="binary"
ENV DATABASE_URL="file:./dev.db"

COPY ./package.json ./yarn.lock* ./package-lock.json* ./pnpm-lock.yaml* ./
RUN npm ci

COPY . .

RUN npm run migrate
