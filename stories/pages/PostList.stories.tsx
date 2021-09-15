import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { postList } from '~/mocks';
import PostListPage from '~/pages/index';

export default {
  title: 'pages/PostList',
  component: PostListPage,
  args: {
    postList,
  },
} as ComponentMeta<typeof PostListPage>;

const Template: ComponentStory<typeof PostListPage> = (args) => (
  <PostListPage {...args} />
);

export const Default = Template.bind({});
