import Head from 'next/head';

export interface SeoProps {
  title?: string;
  content?: string;
}

const Seo: React.VFC<SeoProps> = ({ title, content }) => {
  return (
    <Head>
      <title>nana.log | {title}</title>
      {content && <meta name="description" content={content} />}
    </Head>
  );
};

export default Seo;
