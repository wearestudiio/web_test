let PrismaClient: any;
try {
  PrismaClient = require("@prisma/client").PrismaClient;
} catch {
  PrismaClient = null;
}

const globalForPrisma = globalThis as unknown as { prisma: any };

let prismaInstance: any;

if (PrismaClient) {
  prismaInstance =
    globalForPrisma.prisma ||
    new PrismaClient({
      log: ["error", "warn"],
    });
} else {
  const { createMockPrisma } = require("./mock-prisma");
  prismaInstance = createMockPrisma();
}

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prismaInstance;

export const prisma = prismaInstance;
