import type { ComponentStory, ComponentMeta } from '@storybook/react';
import ArchiveList from '~/components/archive/ArchiveList';
import { postGroups } from '~/mocks';

export default {
  title: 'components/archive/ArchiveList',
  component: ArchiveList,
  args: {
    postGroups,
  },
} as ComponentMeta<typeof ArchiveList>;

const Template: ComponentStory<typeof ArchiveList> = (args) => (
  <ArchiveList {...args} />
);

export const Default = Template.bind({});
Default.storyName = '기본(4개년도)';

export const OneYear = Template.bind({});
OneYear.storyName = '1개년도';
OneYear.args = {
  postGroups: [postGroups[0]],
};

export const Empty = Template.bind({});
Empty.storyName = '목록없음';
Empty.args = {
  postGroups: [],
};
