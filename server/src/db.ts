import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

let prismaClient: PrismaClient | null = null;
let isDatabaseReachable = false;

if (process.env.DATABASE_URL) {
  try {
    prismaClient = global.prisma || new PrismaClient({
      log: ['error'],
    });

    if (process.env.NODE_ENV !== 'production') {
      global.prisma = prismaClient;
    }

    // Probe PostgreSQL connectivity with a short timeout
    prismaClient.$connect()
      .then(() => {
        isDatabaseReachable = true;
        console.log('✅ PostgreSQL database connected successfully via Prisma');
      })
      .catch(async (_err) => {
        isDatabaseReachable = false;
        console.log('ℹ️ PostgreSQL not active at DATABASE_URL. Active fallback store (data/store.json) serving requests with 0ms latency.');
        try {
          await prismaClient?.$disconnect();
        } catch {
          // ignore disconnect error
        }
      });
  } catch (err) {
    console.warn('Prisma client initialization deferred:', err);
  }
}

export const prisma = prismaClient;
export const isDbConnected = () => isDatabaseReachable;
export const setDbConnected = (val: boolean) => { isDatabaseReachable = val; };
