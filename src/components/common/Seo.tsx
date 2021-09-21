import Head from 'next/head';
import { BLOG_TITLE, BLOG_URL } from '~/helpers/constants';

export interface SeoProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  isBlogTitleDisabled?: boolean;
}

const Seo: React.VFC<SeoProps> = ({
  title,
  description,
  path,
  image,
  isBlogTitleDisabled,
}) => {
  const metaTitle = isBlogTitleDisabled
    ? title || BLOG_TITLE
    : `${BLOG_TITLE}${title ? ` | ${title}` : ''}`;
  return (
    <Head>
      <title>{metaTitle}</title>
      {description && <meta name="description" content={description} />}
      <meta property="og:type" content="website" />
      {path && <meta property="og:url" content={`${BLOG_URL}${path}`} />}
      <meta property="og:title" content={metaTitle} />
      {description && <meta property="og:description" content={description} />}
      {image && (
        <>
          <meta property="og:image" content={image} />
          <link rel="preload" as="image" href={image} />
        </>
      )}
    </Head>
  );
};

export default Seo;
