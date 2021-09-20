import type { GetStaticProps, NextPage } from 'next';
import Seo from '~/components/common/Seo';
import { getTags } from '~/helpers/api';
import TagsTemplate from '~/templates/TagsTemplate';

type PageProps = {
  tags: TagDetail[];
};

const TagsPage: NextPage<PageProps> = ({ tags }) => {
  return (
    <>
      <Seo title="tags" />
      <TagsTemplate tags={tags} />
    </>
  );
};

export default TagsPage;

export const getStaticProps: GetStaticProps<PageProps> = () => {
  const tags = getTags();
  return {
    props: {
      tags,
    },
  };
};
