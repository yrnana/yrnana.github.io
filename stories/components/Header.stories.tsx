import type { ComponentStory, ComponentMeta } from '@storybook/react';
import HeaderComponent from '~/components/layout/Header';

export default {
  title: 'components/layout/Header',
  component: HeaderComponent,
  parameters: {
    nextRouter: {
      path: '/tags',
      asPath: '/tags',
      pathname: '/tags',
      route: '/tags',
    },
  },
} as ComponentMeta<typeof HeaderComponent>;

const Template: ComponentStory<typeof HeaderComponent> = () => (
  <HeaderComponent />
);

export const Header = Template.bind({});
