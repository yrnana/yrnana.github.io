import { useMemo } from 'react';
import NoData from '~/components/common/NoData';
import Tag from './Tag';

export interface TagListProps {
  tags: TagDetail[];
}

const TagList: React.VFC<TagListProps> = ({ tags }) => {
  const { m, σ } = useMemo(() => getMeanAndDeviation(tags), [tags]);

  if (tags.length === 0) {
    return <NoData />;
  }

  return (
    <div className="flex flex-col space-y-4 items-start">
      {tags.map((tag) => (
        <Tag key={tag.name} {...tag} color={getColor(tag.count, m, σ)} />
      ))}
    </div>
  );
};

export default TagList;

/**
 * 태그목록으로부터 평균과 표준편차를 계산
 * @param tags 태그목록
 * @returns 평균 & 표준편차
 */
function getMeanAndDeviation(tags: TagDetail[]) {
  // 평균 m
  const m = tags.reduce((prev, curr) => prev + curr.count, 0) / tags.length;
  // 분산 V
  const V =
    tags.reduce((prev, curr) => prev + (curr.count - m) ** 2, 0) / tags.length;
  // 표준편차 σ
  const σ = V ** (1 / 2);
  return { m, σ };
}

/**
 * 태그 frequency로부터 color를 계산
 * @param count 태그 frequency
 * @param m 평균
 * @param σ 표준편차
 * @returns 색상 string
 */
function getColor(count: number, m: number, σ: number): TagColor {
  const z = (count - m) / σ; // 표준화
  if (z < -0.84) {
    return 'yellow'; // 0 ~ 20%
  } else if (z >= -0.84 && z < -0.25) {
    return 'green'; // 20 ~ 40%
  } else if (z >= -0.25 && z < 0.25) {
    return 'purple'; // 40 ~ 60%
  } else if (z >= 0.25 && z < 0.84) {
    return 'blue'; // 60 ~ 80%
  }
  return 'pink'; // 80 ~ 100%
}
