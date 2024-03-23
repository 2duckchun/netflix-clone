import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

export const prismadb = global.prismaGlobal ?? prismaClientSingleton()

if (process.env.NODE_ENV === 'production') global.prismaGlobal = prismadb
