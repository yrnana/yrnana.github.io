import type { ComponentStory, ComponentMeta } from '@storybook/react';
import HeaderComponent from '~/components/layout/Header';

export default {
  title: 'components/layout/Header',
  component: HeaderComponent,
} as ComponentMeta<typeof HeaderComponent>;

const Template: ComponentStory<typeof HeaderComponent> = () => (
  <HeaderComponent />
);

export const Header = Template.bind({});
