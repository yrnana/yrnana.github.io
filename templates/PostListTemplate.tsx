import Layout from '~/components/layout/Layout';
import Pagination from '~/components/post/Pagination';
import PostList from '~/components/post/PostList';

export interface PostListTemplateProps {
  postList: Pageable<PostSummary>;
  hasPagination?: boolean;
  tag?: string;
}

const PostListTemplate: React.VFC<PostListTemplateProps> = ({
  postList,
  hasPagination,
  tag,
}) => {
  const { data, ...paginationProps } = postList;

  return (
    <Layout>
      {tag && (
        <h2 className="text-center mb-10">
          <div className="inline-block rounded-full px-6 py-2 text-indigo-500 bg-indigo-100 text-2xl font-semibold">
            {tag}
          </div>
        </h2>
      )}
      <PostList posts={data} />
      {hasPagination && <Pagination {...paginationProps} />}
    </Layout>
  );
};

export default PostListTemplate;
