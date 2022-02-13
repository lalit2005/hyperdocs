import { bundleMDX } from 'mdx-bundler';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
// import remarkRemoveComments from 'remark-remove-comments'
// import remarkImgLink from '@pondorasti/remark-img-links'

const bundleMdxContent = async (rawContent: string) => {
  const result = await bundleMDX({
    source: rawContent,
    xdmOptions(options) {
      options.remarkPlugins = [...(options?.remarkPlugins ?? []), remarkGfm];
      options.rehypePlugins = [
        ...(options?.rehypePlugins ?? []),
        rehypeSlug,
        rehypeCodeTitles,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['anchor'],
            },
          },
        ],
        rehypeHighlight,
      ];
      return options;
    },
  });
  return result;
};

export default bundleMdxContent;
