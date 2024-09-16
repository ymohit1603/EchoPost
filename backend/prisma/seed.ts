import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
        email: 'alice@gmail.com',
        password:'Alice@123',
      name: 'Alice',
      posts: {
        create: {
          title: 'Getting Started with React',
          content: 'Learn the basics of React and start building your first app...',
          published: true,
          tag:'React'
        },
      },
    },
  })
  
  console.log({ alice })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })

