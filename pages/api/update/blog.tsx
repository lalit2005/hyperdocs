import requireSession from '@/lib/require-session';
import prisma from '@/utils/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { blogId, content } = req.body;

  const site = await prisma.blog.update({
    where: {
      id: blogId,
    },
    data: {
      content,
    },
  });

  res.json(site);
};

export default requireSession(handler);
