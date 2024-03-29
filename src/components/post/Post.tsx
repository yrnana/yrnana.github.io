import { format } from 'date-fns';
import parse from 'html-react-parser';
import Tag from '~/components/tag/Tag';

const Post: React.VFC<PostDetail> = ({
  preview,
  title,
  date,
  tags,
  content,
}) => {
  return (
    <article>
      <header className="text-center mt-10 mb-20">
        {preview && (
          <div className="w-full max-w-screen-lg mx-auto mb-10">
            <img src={preview} alt={`${title} Preview`} />
          </div>
        )}
        <h1 className="text-3xl font-semibold">{title}</h1>
        <div className="text-gray-500 mt-4">{format(new Date(date), 'PP')}</div>
        {tags && (
          <div className="flex flex-row flex-wrap justify-center space-x-3 mt-4">
            {tags.map((tag) => (
              <Tag key={tag} name={tag} color="purple" />
            ))}
          </div>
        )}
      </header>
      <div className="markdown">{parse(content)}</div>
    </article>
  );
};

export default Post;
