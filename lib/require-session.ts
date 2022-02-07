import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { ApiRoute } from 'types/types';

export default function requireSession(apiRoute: ApiRoute) {
  return async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });
    const user = session?.user;
    if (!session) {
      res.status(401).json({
        status: 401,
        message: 'Unauthorized',
      });
      return null;
    } else {
      // @ts-ignore
      return apiRoute(req, res, user);
    }
  };
}
