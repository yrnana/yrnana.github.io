import { createElement, Fragment } from 'react';
import { format } from 'date-fns';
import type { Root } from 'hast';
import rehypeReact from 'rehype-react';
import { unified } from 'unified';

const compiler = unified().use(rehypeReact, {
  createElement,
  Fragment,
});

export const renderAst = (htmlAst: Root, sanitize = false) => {
  return compiler.stringify(htmlAst);
};

export const formatDate = (date: string, formatString = 'PP') =>
  format(new Date(date), formatString);
