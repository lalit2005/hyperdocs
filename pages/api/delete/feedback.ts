import requireSession from '@/lib/require-session';
import prisma from '@/utils/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { feedbackId } = req.body;

  const site = await prisma.feedback.delete({
    where: {
      id: feedbackId,
    },
  });

  res.json(site);
};

export default requireSession(handler);
