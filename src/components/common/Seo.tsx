import Head from 'next/head';
import { BLOG_TITLE, BLOG_URL, DEFAULT_IMAGE_URL } from '~/helpers/constants';

export interface SeoProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noindex?: boolean;
  keywords?: string;
  type?: string;
  isBlogTitleDisabled?: boolean;
}

const Seo: React.VFC<SeoProps> = ({
  title,
  description,
  path,
  image,
  noindex,
  keywords,
  type = 'website',
  isBlogTitleDisabled,
}) => {
  const url = `${BLOG_URL}${path}`;
  const imageUrl = `${BLOG_URL}${image || DEFAULT_IMAGE_URL}`;
  const metaTitle = isBlogTitleDisabled
    ? title || BLOG_TITLE
    : `${BLOG_TITLE}${title ? ` | ${title}` : ''}`;
  return (
    <Head>
      <title>{metaTitle}</title>
      {noindex && <meta name="robots" content="noindex" />}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      <meta property="og:type" content={type} />
      {path && <meta property="og:url" content={url} />}
      <meta property="og:title" content={metaTitle} />
      {description && <meta property="og:description" content={description} />}
      {imageUrl && (
        <>
          <meta property="og:image" content={imageUrl} />
          <link rel="preload" as="image" href={imageUrl} />
        </>
      )}
      <meta name="twitter:card" content="summary_large_image" />
      {metaTitle && <meta name="twitter:title" content={metaTitle} />}
      {description && <meta name="twitter:description" content={description} />}
    </Head>
  );
};

export default Seo;
