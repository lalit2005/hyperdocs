import requireSession from '@/lib/require-session';
import prisma from '@/utils/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from 'types/types';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user: User
) => {
  const site = await prisma.feedback.findMany({
    where: {
      siteId: req.query.siteId as string,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  res.json(site);
};

export default requireSession(handler);
