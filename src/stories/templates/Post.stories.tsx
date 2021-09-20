import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { postDetail } from '~/mocks';
import PostTemplate from '~/templates/PostTemplate';

export default {
  title: 'templates/Post',
  component: PostTemplate,
  args: {
    postDetail,
  },
} as ComponentMeta<typeof PostTemplate>;

const Template: ComponentStory<typeof PostTemplate> = (args) => (
  <PostTemplate {...args} />
);

export const Post = Template.bind({});
