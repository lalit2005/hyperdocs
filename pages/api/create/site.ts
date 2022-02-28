import requireSession from '@/lib/require-session';
import prisma from '@/utils/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { ogImageUrl, repoLink, siteName, siteDescription, siteSlug } =
    req.body;

  const session = await getSession({ req });
  // @ts-ignore
  const userId = session?.user?.id;

  const site = await prisma.site.create({
    data: {
      createdBy: userId,
      repoLink,
      siteName,
      siteDescription,
      ogImageUrl: ogImageUrl,
      siteSlug: siteSlug,
      navbarCta: `GitHub|||${repoLink}`,
      navbarLinks: {
        create: {
          link: `/${siteSlug}/docs`,
          linkText: 'Docs',
        },
      },
      homePage: `<Hero1 heading="${siteName}" description="${siteDescription}"/>

<Features1 features={[
{"title": "Feature 1", "description": "Change these in the dashboard"},

{"title": "Feature 2", "description": "Change these in the dashboard"},

{"title": "Feature 3", "description": "Change these in the dashboard"}

]} />`,
    },
  });

  res.json(site);
};

export default requireSession(handler);
