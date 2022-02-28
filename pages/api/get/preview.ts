import bundleMdxContent from '@/lib/mdx-bundler';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const mdxString = req.body.mdxString;

  const bundledMDX = await bundleMdxContent(mdxString);

  res.send({
    mdxCode: bundledMDX.code,
  });
};

export default handler;
