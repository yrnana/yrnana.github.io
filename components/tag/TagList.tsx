import Tag from './Tag';

export interface TagListProps {
  tags: TagDetail[];
}

// TODO: color step 정의

const TagList: React.VFC<TagListProps> = ({ tags }) => {
  return (
    <div className="flex flex-col space-y-4 items-start">
      {tags.map((tag) => (
        <Tag key={tag.name} {...tag} color="purple" />
      ))}
    </div>
  );
};

export default TagList;
