import type { ComponentStory, ComponentMeta } from '@storybook/react';
import AboutTemplate from '~/templates/AboutTemplate';

export default {
  title: 'templates/About',
  component: AboutTemplate,
} as ComponentMeta<typeof AboutTemplate>;

const Template: ComponentStory<typeof AboutTemplate> = (args) => (
  <AboutTemplate {...args} />
);

export const About = Template.bind({});
