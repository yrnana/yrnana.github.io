import { graphql, Link } from 'gatsby';
import { kebabCase } from 'lodash-es';

export interface TagProps {
  name: string;
  color: string;
  count?: number;
}

const Tag: React.VFC<TagProps> = ({ name, color, count }) => {
  return (
    <Link
      to={`/tag/${kebabCase(name)}`}
      className={`select-none inline-flex items-center text-sm leading-4 rounded-full px-4 py-1.5 text-${color}-500 bg-${color}-100 hover:text-${color}-700 hover:bg-${color}-200`}
    >
      <span>{name}</span>
      {count && <span className="ml-1">({count})</span>}
    </Link>
  );
};

export default Tag;

export const tagItemFragment = graphql`
  fragment TagItem on MdxGroupConnection {
    fieldValue
    totalCount
  }
`;
