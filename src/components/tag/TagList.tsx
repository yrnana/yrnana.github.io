import { useEffect, useMemo, useRef } from 'react';
import cloud from 'd3-cloud';
import { scaleLog } from 'd3-scale';
import { select } from 'd3-selection';
import { sortBy } from 'lodash-es';
import NoData from '~/components/common/NoData';
import Tag from './Tag';

export interface TagListProps {
  tags: TagItemFragment[];
}

const TagList: React.VFC<TagListProps> = ({ tags }) => {
  const { m, σ } = useMemo(() => getMeanAndDeviation(tags), [tags]);
  const sortedTags = useMemo(
    () => sortBy(tags, (tag) => tag.fieldValue?.toLowerCase()),
    [tags],
  );

  const cloudRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fontSize = scaleLog()
      .domain(tags.map((tag) => tag.totalCount))
      .range([20, 60]);

    const layout = cloud()
      .size([800, 500])
      .words(
        tags.map((tag) => ({
          text: tag.fieldValue!,
          size: tag.totalCount,
        })),
      )
      .rotate(0)
      .font('Impact')
      .fontSize((d) => fontSize(d.size!))
      .on('end', (words) => {
        console.log(words);

        const container = select(cloudRef.current!);
        container.selectAll('svg').remove();
        container
          .append('svg')
          .attr('width', layout.size()[0])
          .attr('height', layout.size()[1])
          .append('g')
          .attr(
            'transform',
            'translate(' +
              layout.size()[0] / 2 +
              ',' +
              layout.size()[1] / 2 +
              ')',
          )
          .selectAll('text')
          .data(words)
          .enter()
          .append('text')
          .style('font-family', (d) => d.font!)
          .style('font-size', (d) => d.size + 'px')
          .attr('text-anchor', 'middle')
          .attr('transform', (d) => {
            return `translate(${[d.x, d.y]}) rotate(${d.rotate})`;
          })
          .text((d) => d.text!);
      });
    layout.start();
  }, [m, tags, σ]);

  if (sortedTags.length === 0) {
    return <NoData />;
  }

  return (
    <>
      <div ref={cloudRef} />
      <div className="flex flex-col space-y-4 items-start">
        {sortedTags.map((tag) => (
          <Tag
            key={tag.fieldValue}
            name={tag.fieldValue!}
            count={tag.totalCount}
            color={getColor(tag.totalCount, m, σ)}
          />
        ))}
      </div>
    </>
  );
};

export default TagList;

/**
 * 태그목록으로부터 평균과 표준편차를 계산
 * @param tags 태그목록
 * @returns 평균 & 표준편차
 */
function getMeanAndDeviation(tags: TagItemFragment[]) {
  // 평균 m
  const m =
    tags.reduce((prev, curr) => prev + curr.totalCount, 0) / tags.length;
  // 분산 V
  const V =
    tags.reduce((prev, curr) => prev + (curr.totalCount - m) ** 2, 0) /
    tags.length;
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
function getColor(count: number, m: number, σ: number): string {
  const z = (count - m) / σ; // 표준화
  if (z < -0.84) {
    return 'yellow'; // 0 ~ 20%
  } else if (z >= -0.84 && z < -0.25) {
    return 'violet'; // 20 ~ 40%
  } else if (z >= -0.25 && z < 0.25) {
    return 'green'; // 40 ~ 60%
  } else if (z >= 0.25 && z < 0.84) {
    return 'sky'; // 60 ~ 80%
  }
  return 'rose'; // 80 ~ 100%
}
