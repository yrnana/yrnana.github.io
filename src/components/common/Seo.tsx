import { useLocation } from '@reach/router';
import { graphql, useStaticQuery } from 'gatsby';
import { Helmet } from 'react-helmet';

export interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  noindex?: boolean;
  keywords?: string;
  type?: string;
  isBlogTitleDisabled?: boolean;
}

const Seo: React.VFC<SeoProps> = ({
  title,
  description,
  image,
  noindex,
  keywords,
  type = 'website',
  isBlogTitleDisabled,
}) => {
  const { pathname } = useLocation();
  const { site } = useStaticQuery<SeoQuery>(
    graphql`
      query Seo {
        site {
          siteMetadata {
            title
            siteUrl
            defaultImage
          }
        }
      }
    `,
  );

  const blogTitle = site?.siteMetadata?.title!;
  const blogUrl = site?.siteMetadata?.siteUrl!;
  const defaultImage = site?.siteMetadata?.defaultImage!;

  const url = `${blogUrl}${pathname}`;
  const imageUrl = `${blogUrl}${image || defaultImage}`;
  const metaTitle = isBlogTitleDisabled
    ? title || blogTitle
    : `${blogTitle}${title ? ` | ${title}` : ''}`;

  return (
    <Helmet>
      <html lang="ko" />
      <meta charSet="utf-8" />
      {noindex && <meta name="robots" content="noindex" />}
      <title>{metaTitle}</title>
      <meta
        name="google-site-verification"
        content="H7DNse5ObBh-m99zO6U0iw-K6iC00p7BJxRBuWp-nyc"
      />
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      {/* 페이스북 */}
      <meta property="og:type" content={type} />
      {pathname && <meta property="og:url" content={url} />}
      <meta property="og:title" content={metaTitle} />
      {description && <meta property="og:description" content={description} />}
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      {/* 트위터 */}
      <meta name="twitter:card" content="summary_large_image" />
      {metaTitle && <meta name="twitter:title" content={metaTitle} />}
      {description && <meta name="twitter:description" content={description} />}
    </Helmet>
  );
};

export default Seo;
