import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider';
import { action } from '@storybook/addon-actions';
import type { ComponentStory, ComponentMeta } from '@storybook/react';
import HeaderComponent from '~/components/layout/Header';

export default {
  title: 'components/layout/Header',
  component: HeaderComponent,
} as ComponentMeta<typeof HeaderComponent>;

const Template: ComponentStory<typeof HeaderComponent> = () => (
  <MemoryRouterProvider
    url="/about"
    onPush={action('push')}
    onReplace={action('replace')}
  >
    <HeaderComponent />
  </MemoryRouterProvider>
);

export const Header = Template.bind({});
