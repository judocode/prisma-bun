import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await connect()

  console.log('Hello via Prisma + Bun!')

  const userToUpsert = { email: 'prisma@bun.sh' }
  const user = await prisma.user.upsert({
    where: userToUpsert,
    update: userToUpsert,
    create: userToUpsert,
  })

  console.log(`User upserted: ${user.email}`)
}

async function connect() {
  console.log('Connecting...')
  await prisma.$connect()
  console.log('Connected')
}

async function disconnect() {
  console.log('Disconnecting...')
  await prisma.$disconnect()
  console.log('Disconnected')
}

main()
  .then(async () => {
    console.log('Finished')
    await disconnect()
    process.exit(0)
  })
  .catch(async (e) => {
    console.error(e)
    await disconnect()
    process.exit(1)
  })
