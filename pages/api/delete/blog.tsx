import requireSession from '@/lib/require-session';
import prisma from '@/utils/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { blogId } = req.body;

  const site = await prisma.blog.delete({
    where: {
      id: blogId,
    },
  });

  res.json(site);
};

export default requireSession(handler);
