import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { postList } from '~/mocks';
import PostListTemplate from '~/templates/PostListTemplate';

export default {
  title: 'templates/PostList',
  component: PostListTemplate,
  args: {
    postList,
    hasPagination: true,
  },
} as ComponentMeta<typeof PostListTemplate>;

const Template: ComponentStory<typeof PostListTemplate> = (args) => (
  <PostListTemplate {...args} />
);

export const Default = Template.bind({});
Default.storyName = '글 목록';

export const HasTag = Template.bind({});
HasTag.storyName = '태그 검색 결과';
HasTag.args = {
  tag: 'React',
  hasPagination: undefined,
};
