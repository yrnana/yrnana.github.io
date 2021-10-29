const remarkBreaks = require('remark-breaks');

module.exports = ({ markdownAST }) => {
  remarkBreaks()(markdownAST);
  return markdownAST;
};
