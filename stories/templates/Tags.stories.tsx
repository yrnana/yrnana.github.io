import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { tags } from '~/mocks';
import TagsTemplate from '~/templates/TagsTemplate';

export default {
  title: 'templates/Tags',
  component: TagsTemplate,
  args: {
    tags,
  },
} as ComponentMeta<typeof TagsTemplate>;

const Template: ComponentStory<typeof TagsTemplate> = (args) => (
  <TagsTemplate {...args} />
);

export const Tags = Template.bind({});
