import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { postList } from '~/mocks';
import PostListFilteredByTagPage from '~/pages/tag/[tag]';

export default {
  title: 'pages/PostListFilteredByTag',
  component: PostListFilteredByTagPage,
  args: {
    tag: 'React',
    postList,
  },
} as ComponentMeta<typeof PostListFilteredByTagPage>;

const Template: ComponentStory<typeof PostListFilteredByTagPage> = (args) => (
  <PostListFilteredByTagPage {...args} />
);

export const Default = Template.bind({});
