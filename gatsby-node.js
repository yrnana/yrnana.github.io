const path = require(`path`);
const slugify = require('slugify');
const { createFilePath } = require(`gatsby-source-filesystem`);
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { kebabCase } = require('lodash');

const templatePath = path.resolve(process.cwd(), 'src/templates');

/** @type {import('gatsby').GatsbyNode['createPages']} */
exports.createPages = async ({ graphql, actions, reporter }) => {
  const result = await graphql(`
    fragment PreviousOrNext on MarkdownRemark {
      slug
      frontmatter {
        title
      }
    }
    query CreatePages {
      posts: allMarkdownRemark(
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
      tags: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { glob: "**/_contents/posts/*" }
          frontmatter: { published: { eq: true } }
        }
      ) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
      markdowns: allFile(
        filter: { sourceInstanceName: { eq: "pages" }, extension: { eq: "md" } }
      ) {
        nodes {
          id
          name
          relativeDirectory
          childMarkdownRemark {
            id
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors,
    );
    return;
  }

  // 1. create `md` page (get from `pages` directory)
  const markdownTemplate = path.resolve(templatePath, 'MarkdownTemplate.tsx');
  const markdowns = result.data.markdowns.nodes;
  markdowns.forEach(({ id, name, relativeDirectory, childMarkdownRemark }) => {
    actions.createPage({
      path: relativeDirectory ? `${relativeDirectory}/${name}` : name,
      component: markdownTemplate,
      context: {
        id: childMarkdownRemark.id,
      },
    });
  });

  const posts = result.data.posts.edges;
  if (!posts) {
    return;
  }

  // 2. create `postList` page
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

  // 3. create `post` page
  const postTemplate = path.resolve(templatePath, 'PostTemplate.tsx');
  posts.forEach((post) => {
    actions.createPage({
      path: post.node.slug,
      component: postTemplate,
      context: {
        id: post.node.id,
        next: post.previous,
        previous: post.next,
      },
    });
  });

  // 4. create `postListByTag` page
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
  type MarkdownRemark implements Node {
    slug: String!
    frontmatter: Frontmatter
  }
  type Frontmatter {
    title: String!
    date: Date! @dateformat
    excerpt: String
    excerptAst: JSON
    tags: [String!]
    preview: File @fileByRelativePath
    published: Boolean!
    year: Int!
  }
`;

  createTypes(typeDefs);
};

/** @type {import('gatsby').GatsbyNode['createResolvers']} */
exports.createResolvers = ({
  createResolvers,
  getNode,
  createContentDigest,
}) => {
  // create slug
  createResolvers({
    MarkdownRemark: {
      slug: {
        type: `String!`,
        resolve(source) {
          if (!source?.frontmatter?.title) {
            return null;
          }
          const fileName = createFilePath({
            node: source,
            getNode,
            basePath: `_contents/posts`,
            trailingSlash: false,
          }).substring(1);
          const slug = slugify(fileName, {
            lower: true,
            locale: 'ko',
          });
          return `/post/${slug}`;
        },
      },
    },
  });

  // create frontmatter.year & frontmatter.excerptAst
  createResolvers({
    Frontmatter: {
      excerptAst: {
        type: `JSON`,
        async resolve(source, args, context, info) {
          const value = source.excerpt;
          if (typeof value === 'undefined') {
            return null;
          }
          const { resolve } = info.schema
            .getType('MarkdownRemark')
            .getFields().htmlAst;
          const excerptAst = await resolve(
            {
              rawMarkdownBody: value,
              internal: {
                type: 'MarkdownRemark',
                content: value,
                contentDigest: createContentDigest(value),
              },
            },
            args,
            context,
            info,
          );
          return excerptAst;
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
