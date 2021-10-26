const path = require(`path`);
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { kebabCase } = require('lodash');

const templatePath = path.resolve(process.cwd(), 'src/templates');

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

/** @type {import('gatsby').GatsbyNode['onCreateWebpackConfig']} */
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      plugins: [
        new TsconfigPathsPlugin({
          configFile: path.resolve(process.cwd(), 'tsconfig.json'),
          extensions: ['.ts', '.tsx', '.js', '.jsx'],
        }),
      ],
    },
  });
};

/** @type {import('gatsby').GatsbyNode['createSchemaCustomization']} */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
    type Mdx implements Node {
      slug: String!
      frontmatter: Frontmatter
    }
    type Frontmatter {
      title: String!
      date: Date! @dateformat
      excerpt: ExcerptJson
      tags: [String!]
      preview: File @fileByRelativePath
      published: Boolean!
      year: Int!
    }
    type ExcerptJson @dontInfer {
      rawBody: String
      body: String
    }
  `;

  createTypes(typeDefs);
};

/** @type {import('gatsby').GatsbyNode['createResolvers']} */
exports.createResolvers = ({ createResolvers, createContentDigest }) => {
  createResolvers({
    Frontmatter: {
      excerpt: {
        type: `ExcerptJson`,
        resolve(source, args, context, info) {
          const value = source.excerpt;
          if (typeof value === 'undefined') {
            return null;
          }
          const mdxType = info.schema.getType('Mdx');
          const { resolve } = mdxType.getFields().body;
          const rendered = resolve(
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
          return {
            rawBody: value,
            body: rendered,
          };
        },
      },
      year: {
        type: `Int!`,
        resolve(source) {
          return new Date(source.date).getFullYear();
        },
      },
    },
  });
};
