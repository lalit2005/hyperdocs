import { NavbarLink } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export type ApiRoute = (
  req: NextApiRequest,
  res: NextApiResponse,
  data: User
) => Promise<void>;

export interface User {
  name?: string;
  email?: string;
  image?: string;
  id: string;
}

export interface NewSite {
  siteName: string;
  siteDescription: string;
  repoLink: string;
  ogImageUrl: string;
  siteSlug: string;
}

export interface DocsPageProps {
  content: string;
  tocHtml: string;
  navLinks: NavbarLink[];
  navCta: string;
  siteName: string;
  description: string;
  sidebar: string[];
  slug: string;
  siteId: string;
  footerText: string;
  nextPage: string;
  prevPage: string;
  announcementText?: string;
  announcementUrl?: string;
}
