const path = require(`path`);
const { kebabCase } = require('lodash');

const templatePath = path.resolve(__dirname, 'src/templates');

/** @type {import('gatsby').GatsbyNode['createPages']} */
exports.createPages = async ({ graphql, actions, reporter }) => {
  const result = await graphql(
    `
      fragment PreviousOrNext on Mdx {
        slug
        frontmatter {
          title
        }
      }
      query CreatePages {
        posts: allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          filter: {
            fileAbsolutePath: { glob: "**/_contents/posts/*" }
            frontmatter: { published: { eq: true } }
          }
        ) {
          edges {
            node {
              id
              slug
            }
            next {
              ...PreviousOrNext
            }
            previous {
              ...PreviousOrNext
            }
          }
        }
        tags: allMdx(
          filter: {
            fileAbsolutePath: { glob: "**/_contents/posts/*" }
            frontmatter: { published: { eq: true } }
          }
        ) {
          group(field: frontmatter___tags) {
            fieldValue
          }
        }
      }
    `,
  );

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors,
    );
    return;
  }

  const posts = result.data.posts.edges;
  if (!posts) {
    return;
  }

  // 1. create `postList` page
  const postListTemplate = path.resolve(templatePath, 'PostListTemplate.tsx');
  const perPage = 10;
  const pageCount = Math.ceil(posts.length / perPage);
  actions.createPage({
    path: '/',
    component: postListTemplate,
    context: {
      limit: perPage,
      skip: 0,
    },
  });
  Array.from({ length: pageCount }).forEach((_, i) => {
    actions.createPage({
      path: `/page/${i + 1}`,
      component: postListTemplate,
      context: {
        limit: perPage,
        skip: i * perPage,
      },
    });
  });

  // 2. create `post` page
  const postTemplate = path.resolve(templatePath, 'PostTemplate.tsx');
  posts.forEach((post) => {
    actions.createPage({
      path: `/post/${post.node.slug}`,
      component: postTemplate,
      context: {
        id: post.node.id,
        next: post.previous,
        previous: post.next,
      },
    });
  });

  // 3. create `postListByTag` page
  const postListByTagTemplate = path.resolve(
    templatePath,
    'PostListByTagTemplate.tsx',
  );
  const tags = result.data.tags.group;
  tags.forEach((tag) => {
    const tagValue = tag.fieldValue;
    actions.createPage({
      path: `/tag/${kebabCase(tagValue)}`,
      component: postListByTagTemplate,
      context: {
        tag: tagValue,
      },
    });
  });
};

/** @type {import('gatsby').GatsbyNode['onCreateNode']} */
exports.onCreateNode = ({ node, actions }) => {
  if (node.internal.type === 'Mdx' && node.frontmatter) {
    actions.createNodeField({
      node,
      name: 'year',
      value: new Date(node.frontmatter.date).getFullYear(),
    });
  }
};

/** @type {import('gatsby').GatsbyNode['onCreatePage']} */
exports.onCreatePage = ({ page, actions }) => {
  // remove trailing slash
  const newPage = Object.assign({}, page, {
    path: page.path === '/' ? page.path : page.path.replace(/\/$/, ''),
  });
  if (newPage.path !== page.path) {
    actions.deletePage(page);
    actions.createPage(newPage);
  }
};

/** @type {import('gatsby').GatsbyNode['onCreateBabelConfig']} */
exports.onCreateBabelConfig = ({ actions }) => {
  // support jsx transform
  actions.setBabelPreset({
    name: 'babel-preset-gatsby',
    options: {
      reactRuntime: 'automatic',
    },
  });
};

/** @type {import('gatsby').GatsbyNode['createSchemaCustomization']} */
exports.createSchemaCustomization = ({
  actions: { createTypes, createFieldExtension },
  createContentDigest,
}) => {
  createFieldExtension({
    name: 'mdx',
    extend() {
      return {
        type: 'String',
        resolve(source, args, context, info) {
          // Grab field
          const value = source[info.fieldName];
          if (typeof value === 'undefined') {
            return null;
          }
          // Isolate MDX
          const mdxType = info.schema.getType('Mdx');
          // Grab just the body contents of what MDX generates
          const { resolve } = mdxType.getFields().body;
          return resolve(
            {
              rawBody: value,
              internal: {
                contentDigest: createContentDigest(value), // Used for caching
              },
            },
            args,
            context,
            info,
          );
        },
      };
    },
  });

  createTypes(`
    type Mdx implements Node {
      frontmatter: MdxFrontmatter
    }
    type MdxFrontmatter {
      excerpt: String @mdx
    }
  `);
};
