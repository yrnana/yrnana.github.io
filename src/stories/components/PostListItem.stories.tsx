import type { ComponentStory, ComponentMeta } from '@storybook/react';
import PostListItem from '~/components/post/PostListItem';
import { postList } from '~/mocks';

export default {
  title: 'components/post/PostList/PostListItem',
  component: PostListItem,
  args: {
    ...postList.data[0],
  },
} as ComponentMeta<typeof PostListItem>;

const Template: ComponentStory<typeof PostListItem> = (args) => (
  <PostListItem {...args} />
);

export const Default = Template.bind({});
Default.storyName = '기본';

export const HasExcerpt = Template.bind({});
HasExcerpt.storyName = '발췌있음';
HasExcerpt.args = {
  excerpt:
    'Dignissimos autem nisi dolores quia in at assumenda fuga. Laborum autem quasi. Est repudiandae doloremque eos beatae ullam recusandae tenetur. Quae nostrum expedita. Iusto dolor vero.',
};

export const NoTags = Template.bind({});
NoTags.storyName = '태그없음';
NoTags.args = {
  tags: undefined,
};
