import prisma from '@/utils/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  // @ts-ignore
  const userId = session?.user?.id;

  const site = await prisma.site.findMany({
    where: {
      createdBy: userId,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  res.json(site);
}
