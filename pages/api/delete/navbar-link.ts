import requireSession from '@/lib/require-session';
import prisma from '@/utils/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body;

  const site = await prisma.navbarLink.delete({
    where: {
      id,
    },
  });
  console.log(site);

  res.json(site);
};

export default requireSession(handler);
