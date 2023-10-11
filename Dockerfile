FROM oven/bun:1.0.5

WORKDIR /app

COPY bun.lockb package.json ./

RUN bun install

COPY . .

RUN bun run prisma generate

CMD ["bun", "./src/index.ts"]