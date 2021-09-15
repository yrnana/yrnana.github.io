import type { ComponentStory, ComponentMeta } from '@storybook/react';
import LayoutComponent from '~/components/layout/Layout';

export default {
  title: 'components/layout/Layout',
  component: LayoutComponent,
} as ComponentMeta<typeof LayoutComponent>;

const Template: ComponentStory<typeof LayoutComponent> = (args) => (
  <LayoutComponent {...args}>content</LayoutComponent>
);

export const Layout = Template.bind({});
