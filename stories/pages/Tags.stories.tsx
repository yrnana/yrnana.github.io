import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { tags } from '~/mocks';
import TagsPage from '~/pages/tags';

export default {
  title: 'pages/Tags',
  component: TagsPage,
  args: {
    tags,
  },
} as ComponentMeta<typeof TagsPage>;

const Template: ComponentStory<typeof TagsPage> = (args) => (
  <TagsPage {...args} />
);

export const Default = Template.bind({});
