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

export const LongTitle = Template.bind({});
LongTitle.storyName = '긴 제목';
LongTitle.args = {
  title:
    '긴 제목입니다 제목이 길어요 제목이 깁니다 긴 제목입니다 제목이 길어요 제목이 깁니다 긴 제목입니다 제목이 길어요 제목이 깁니다 긴 제목입니다 제목이 길어요 제목이 깁니다 긴 제목입니다 제목이 길어요 제목이 깁니다 긴 제목입니다 제목이 길어요 제목이 깁니다 긴 제목입니다 제목이 길어요 제목이 깁니다',
};

export const NoTag = Template.bind({});
NoTag.storyName = '태그 없음';
NoTag.args = {
  tags: undefined,
};

export const NoPreview = Template.bind({});
NoPreview.storyName = '이미지 없음';
NoPreview.args = {
  preview: undefined,
};

// TODO: 내용 경우의 수 abcde (markdown, oembed 등)
