import type { ComponentStory, ComponentMeta } from '@storybook/react';
import Post from '~/components/post/Post';
import { postDetail } from '~/mocks';

export default {
  title: 'components/post/Post',
  component: Post,
  args: {
    ...postDetail,
  },
} as ComponentMeta<typeof Post>;

const Template: ComponentStory<typeof Post> = (args) => <Post {...args} />;

export const Default = Template.bind({});
Default.storyName = '기본';

export const Long_Title = Template.bind({});
Long_Title.storyName = '긴 제목';
Long_Title.args = {
  title:
    '긴 제목입니다 제목이 길어요 제목이 깁니다 긴 제목입니다 제목이 길어요 제목이 깁니다 긴 제목입니다 제목이 길어요 제목이 깁니다 긴 제목입니다 제목이 길어요 제목이 깁니다 긴 제목입니다 제목이 길어요 제목이 깁니다 긴 제목입니다 제목이 길어요 제목이 깁니다 긴 제목입니다 제목이 길어요 제목이 깁니다',
};

export const No_Tag = Template.bind({});
No_Tag.storyName = '태그 없음';
No_Tag.args = {
  tags: undefined,
};

export const No_Preview = Template.bind({});
No_Preview.storyName = '이미지 없음';
No_Preview.args = {
  preview: undefined,
};

// TODO: 내용 경우의 수 abcde (markdown, oembed 등)
