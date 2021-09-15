import type { ComponentStory, ComponentMeta } from '@storybook/react';
import TagList from '~/components/tag/TagList';
import { tags } from '~/mocks';

export default {
  title: 'components/tag/TagList',
  component: TagList,
  args: {
    tags,
  },
} as ComponentMeta<typeof TagList>;

const Template: ComponentStory<typeof TagList> = (args) => (
  <TagList {...args} />
);

export const Default = Template.bind({});
Default.storyName = '기본';

export const Empty = Template.bind({});
Empty.storyName = '목록없음';
Empty.args = {
  tags: [],
};
