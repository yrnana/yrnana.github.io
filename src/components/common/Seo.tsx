import { useLocation } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';
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
            url
            defaultImage
          }
        }
      }
    `,
  );

  const blogTitle = site?.siteMetadata?.title!;
  const blogUrl = site?.siteMetadata?.url!;
  const defaultImage = site?.siteMetadata?.defaultImage!;

  const url = `${blogUrl}${pathname}`;
  const imageUrl = `${blogUrl}${image || defaultImage}`;
  const metaTitle = isBlogTitleDisabled
    ? title || blogTitle
    : `${blogTitle}${title ? ` | ${title}` : ''}`;

  return (
    <Helmet>
      <title>{metaTitle}</title>
      <html lang="ko" />
      <meta charSet="utf-8" />
      {noindex && <meta name="robots" content="noindex" />}
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
