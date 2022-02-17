import prisma from '@/utils/prisma';
import type { NextApiHandler } from 'next';
import web3forms from 'use-web3forms';

const handler: NextApiHandler = async (req, res) => {
  const { siteId, feedback, stars, sentBy } = req.body;

  console.log(siteId, feedback, stars, sentBy);

  const site = await prisma.feedback.create({
    data: {
      feedback,
      stars,
      sentBy,
      siteId,
    },
    include: {
      site: true,
    },
  });

  const { submit } = web3forms({
    apikey: site?.site.web3formsKey || '',
    onSuccess: () => {
      console.log('success');
    },
    onError: () => {
      console.log('error');
    },
  });

  submit({
    message: `A new feedback has been submitted to ${site?.site.siteName}`,
    feedback: site.feedback,
    stars: site.stars,
    'View in Hyperdocs dashboard': `https://hyperdocs.netlify.app/dashboard/${site.siteId}/feedbacks`,
  });

  res.json(site);
};

export default handler;
