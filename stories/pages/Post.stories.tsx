import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { postDetail } from '~/mocks';
import PostPage from '~/pages/post/[slug]';

export default {
  title: 'pages/Post',
  component: PostPage,
  args: {
    postDetail,
  },
} as ComponentMeta<typeof PostPage>;

const Template: ComponentStory<typeof PostPage> = (args) => (
  <PostPage {...args} />
);

export const Default = Template.bind({});
