import type { ComponentStory, ComponentMeta } from '@storybook/react';
import AboutPage from '~/pages/about';

export default {
  title: 'pages/About',
  component: AboutPage,
} as ComponentMeta<typeof AboutPage>;

const Template: ComponentStory<typeof AboutPage> = (args) => (
  <AboutPage {...args} />
);

export const Default = Template.bind({});
