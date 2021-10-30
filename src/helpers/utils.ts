import { createElement } from 'react';
import { format } from 'date-fns';
import type { Root } from 'hast';
import rehypeReact from 'rehype-react';
import rehypeSanitize from 'rehype-sanitize';
import { unified } from 'unified';

// inline code 외 sanitize
const runner = unified().use(rehypeSanitize, {
  tagNames: ['code'],
  strip: ['pre'],
  attributes: {
    '*': ['className'],
  },
});

const compiler = unified().use(rehypeReact, {
  createElement,
});

export const renderAst = (htmlAst: Root, sanitize = false) => {
  return compiler.stringify(sanitize ? runner.runSync(htmlAst) : htmlAst);
};

export const formatDate = (date: string, formatString = 'PP') =>
  format(new Date(date), formatString);
