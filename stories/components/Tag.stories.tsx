import type { ComponentStory, ComponentMeta } from '@storybook/react';
import Tag from '~/components/tag/Tag';

export default {
  title: 'components/tag/Tag',
  component: Tag,
  args: {
    name: 'React',
    color: 'purple',
  },
  decorators: [(StoryFn) => <div className="p-4">{StoryFn()}</div>],
} as ComponentMeta<typeof Tag>;

const Template: ComponentStory<typeof Tag> = (args) => <Tag {...args} />;

export const CountVisible = Template.bind({});
CountVisible.storyName = '갯수 표기';
CountVisible.args = {
  count: 10,
};

export const CountInVisible = Template.bind({});
CountInVisible.storyName = '갯수 미표기';

export const Color = () => (
  <div className="flex flex-col space-y-4 items-start">
    <Tag name="Typescript" color="pink" count={10} />
    <Tag name="Typescript" color="yellow" count={10} />
    <Tag name="Typescript" color="green" count={10} />
    <Tag name="Typescript" color="blue" count={10} />
    <Tag name="Typescript" color="purple" count={10} />
  </div>
);
Color.storyName = '색상';
