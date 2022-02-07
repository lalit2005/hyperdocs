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
}
