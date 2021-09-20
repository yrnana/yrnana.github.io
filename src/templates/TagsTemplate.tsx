import Layout from '~/components/layout/Layout';
import TagList from '~/components/tag/TagList';

export interface TagsTemplateProps {
  tags: TagDetail[];
}

const TagsTemplate: React.VFC<TagsTemplateProps> = ({ tags }) => {
  return (
    <Layout>
      <TagList tags={tags} />
    </Layout>
  );
};

export default TagsTemplate;
