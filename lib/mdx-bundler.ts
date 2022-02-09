import { bundleMDX } from 'mdx-bundler';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import moonlight from './moonlight-ii.json';
import shikiThemes from './shikiThemes';

const bundleMdxContent = async (rawContent: string, theme: string) => {
  // let codeBlockTheme;
  // if (shikiThemes.includes(theme)) {
  //   codeBlockTheme = theme;
  // } else {
  //   codeBlockTheme = moonlight;
  // }
  const syntaxHighlightingOptions = {
    // Use one of Shiki's packaged themes
    theme: moonlight,
    onVisitLine(node: any) {
      // Prevent lines from collapsing in `display: grid` mode, and allow empty
      // lines to be copy/pasted
      if (node.children.length === 0) {
        node.children = [{ type: 'text', value: ' ' }];
      }
    },
    onVisitHighlightedLine(node: any) {
      node.properties.className.push('highlighted');
    },
    onVisitHighlightedWord(node: any) {
      node.properties.className = ['word'];
    },
  };

  console.log('FROM MDX-BUNDLER: \n');
  console.log(rawContent);

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
        [rehypePrettyCode, syntaxHighlightingOptions],
      ];
      return options;
    },
  });
  return result;
};

export default bundleMdxContent;
