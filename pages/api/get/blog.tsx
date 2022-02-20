import requireSession from '@/lib/require-session';
import prisma from '@/utils/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from 'types/types';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user: User
) => {
  const userId = user.id;

  const blog = await prisma.blog.findUnique({
    where: {
      id: req.query.blogId as string,
    },
  });

  res.json(blog);
};

export default requireSession(handler);
