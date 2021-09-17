import type { ComponentStory, ComponentMeta } from '@storybook/react';
import Pagination from '~/components/post/Pagination';

export default {
  title: 'components/post/Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => (
  <Pagination {...args} />
);

export const Pages1Curr1 = Template.bind({});
Pages1Curr1.storyName = '페이지 1개 / 현재 1페이지';
Pages1Curr1.args = {
  first: true,
  last: true,
  size: 10,
  page: 1,
  totalElements: 5,
  totalPages: 1,
};

export const Pages5Curr1 = Template.bind({});
Pages5Curr1.storyName = '페이지 5개 / 현재 1페이지';
Pages5Curr1.args = {
  first: true,
  last: false,
  size: 10,
  page: 1,
  totalElements: 45,
  totalPages: 5,
};

export const Pages5Curr3 = Template.bind({});
Pages5Curr3.storyName = '페이지 5개 / 현재 3페이지';
Pages5Curr3.args = {
  first: false,
  last: false,
  size: 10,
  page: 3,
  totalElements: 45,
  totalPages: 5,
};

export const Pages5Curr5 = Template.bind({});
Pages5Curr5.storyName = '페이지 5개 / 현재 5페이지';
Pages5Curr5.args = {
  first: false,
  last: true,
  size: 10,
  page: 5,
  totalElements: 45,
  totalPages: 5,
};

export const Pages20Curr1 = Template.bind({});
Pages20Curr1.storyName = '페이지 20개 / 현재 1페이지';
Pages20Curr1.args = {
  first: true,
  last: false,
  size: 10,
  page: 1,
  totalElements: 195,
  totalPages: 20,
};

export const Pages20Curr10 = Template.bind({});
Pages20Curr10.storyName = '페이지 20개 / 현재 10페이지';
Pages20Curr10.args = {
  first: false,
  last: false,
  size: 10,
  page: 10,
  totalElements: 195,
  totalPages: 20,
};

export const Pages20Curr20 = Template.bind({});
Pages20Curr20.storyName = '페이지 20개 / 현재 20페이지';
Pages20Curr20.args = {
  first: false,
  last: true,
  size: 10,
  page: 20,
  totalElements: 195,
  totalPages: 20,
};
