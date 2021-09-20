import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { postGroups } from '~/mocks';
import ArchiveTemplate from '~/templates/ArchiveTemplate';

export default {
  title: 'templates/Archive',
  component: ArchiveTemplate,
  args: {
    postGroups,
  },
} as ComponentMeta<typeof ArchiveTemplate>;

const Template: ComponentStory<typeof ArchiveTemplate> = (args) => (
  <ArchiveTemplate {...args} />
);

export const Archive = Template.bind({});
