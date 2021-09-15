const Post: React.VFC<PostDetail> = ({
  preview,
  title,
  date,
  tags,
  content,
}) => {
  return (
    <article>
      <header>
        {preview && <div>{preview}</div>}
        <h1>{title}</h1>
        <div>{date}</div>
        {tags && <div>{tags}</div>}
      </header>
      <section>{content}</section>
    </article>
  );
};

export default Post;
