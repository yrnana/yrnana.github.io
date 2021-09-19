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

export const Content = Template.bind({});
Content.storyName = '컨텐츠';
Content.args = {
  content: `
<h1>h1 Heading</h1>
<h2>h2 Heading</h2>
<h3>h3 Heading</h3>
<h4>h4 Heading</h4>
<h5>h5 Heading</h5>
<h6>h6 Heading</h6>
<p>텍스트 <strong>강조</strong></p>
<p>텍스트 <em>기울기</em></p>
<blockquote>
<p>이렇게</p>
<blockquote>
<p>하면됨</p>
</blockquote>
</blockquote>
<ol>
<li>첫번째
<ol>
<li>안녕</li>
<li>하세요</li>
</ol>
</li>
<li>두번째</li>
<li>세번째</li>
</ol>
<ul>
<li>첫번째</li>
<li>두번째
<ul>
<li>안녕</li>
<li>하세요</li>
</ul>
</li>
<li>세번째</li>
</ul>
<p>인라인 코드는 <code>이렇게</code></p>
<pre><code class="hljs language-js"><span class="hljs-comment">// 코드블록</span>
<span class="hljs-variable hljs-language">console</span>.<span class="hljs-title hljs-function">log</span>(<span class="hljs-string">'코드블록'</span>);
</code></pre>
<p><img src="https://octodex.github.com/images/minion.png" alt="Minion"></p>
<p><a href="https://yurinadev.github.io">link text</a></p>
  `.trim(),
};
