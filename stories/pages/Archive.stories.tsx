import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { postGroups } from '~/mocks';
import ArchivePage from '~/pages/archive';

export default {
  title: 'pages/Archive',
  component: ArchivePage,
  args: {
    postGroups,
  },
} as ComponentMeta<typeof ArchivePage>;

const Template: ComponentStory<typeof ArchivePage> = (args) => (
  <ArchivePage {...args} />
);

export const Default = Template.bind({});
