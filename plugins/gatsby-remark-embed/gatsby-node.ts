import type { GatsbyNode } from 'gatsby';

export const onPreInit: GatsbyNode['onPreInit'] = () => {
  console.log('\x1b[32msuccess \x1b[0mload gatsby-remark-embed plugin');
};
