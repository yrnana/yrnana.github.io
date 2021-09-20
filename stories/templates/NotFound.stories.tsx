import type { ComponentStory, ComponentMeta } from '@storybook/react';
import NotFoundTemplate from '~/templates/NotFoundTemplate';

export default {
  title: 'templates/404 Not Found',
  component: NotFoundTemplate,
} as ComponentMeta<typeof NotFoundTemplate>;

const Template: ComponentStory<typeof NotFoundTemplate> = (args) => (
  <NotFoundTemplate {...args} />
);

export const Default = Template.bind({});
Default.storyName = '404 Not Found';
