# Prisma + Bun

My system specs (all should be latest version as of 2023-10-04, minus macOS version as 14.0 is too new for my liking and knowledge of history):

- MacBook Pro v13.6 14in 2021 M1 Pro
- Bun v1.04
- Docker v24.0.6, build ed223bc
- Prisma v5.4.1
- Typescript v5.2.2

Project to demonstrate the issues with Prisma and Bun (in Docker). I generated this project using `bun init` and then following the prisma docs here: https://www.prisma.io/docs/getting-started/quickstart:

## Prisma + Bun (non-docker)

```bash
bun install prisma
```

```bash
bun run prisma init --datasource-provider sqlite
```

Then copying the following into prisma:

```prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

Create migration and apply it to db

```bash
bun run prisma migrate dev --name init
```

Run index.ts

```shell
bun run index.ts
```

Notice it say "Connecting..." and then quit. If you `open index.ts`, you will notice it's doing a lot more than that. It seems to silently fail after `prisma.$connect()`

So that was just regular Prisma + Bun

## Prisma + Bun in Docker

If you run:

```shell
docker build -t prismabun .
```

The following error occurs:

```shell
 > [6/6] RUN bun run prisma generate:
16.82 error: "prisma" exited with code 9 (SIGKILL)
------
Dockerfile:11
--------------------
   9 |     COPY . .
  10 |
  11 | >>> RUN bun run prisma generate
  12 |
  13 |     CMD ["bun", "./src/index.ts"]
--------------------
ERROR: failed to solve: process "/bin/sh -c bun run prisma generate" did not complete successfully: exit code: 9
```
