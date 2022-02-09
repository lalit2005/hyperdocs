import prisma from '@/utils/prisma';
import type { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  const { siteId, feedback, stars, sentBy } = req.body;

  const site = await prisma.feedback.create({
    data: {
      feedback,
      stars,
      sentBy,
      siteId,
    },
  });

  res.json(site);
};

export default handler;
