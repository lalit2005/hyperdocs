import requireSession from '@/lib/require-session';
import prisma from '@/utils/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, description, siteId } = req.body;

  const session = await getSession({ req });
  // @ts-ignore
  const userId = session?.user?.id;

  const site = await prisma.blog.create({
    data: {
      title,
      description,
      siteId,
      published: false,
    },
  });

  res.json(site);
};

export default requireSession(handler);
