import type { ComponentStory, ComponentMeta } from '@storybook/react';
import PostList from '~/components/post/PostList';
import { postList } from '~/mocks';

export default {
  title: 'components/post/PostList',
  component: PostList,
  args: {
    posts: postList.data,
  },
} as ComponentMeta<typeof PostList>;

const Template: ComponentStory<typeof PostList> = (args) => (
  <PostList {...args} />
);

export const Default = Template.bind({});
Default.storyName = '기본';

export const Empty = Template.bind({});
Empty.storyName = '목록없음';
Empty.args = {
  posts: [],
};
