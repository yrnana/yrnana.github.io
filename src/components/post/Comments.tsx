import { useRef, useLayoutEffect, memo } from 'react';
import { COMMENT_ISSUE_REPO } from '~/helpers/constants';

const Comments: React.VFC = memo(() => {
  const divRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = divRef.current;
    if (container) {
      const script = document.createElement('script');
      script.setAttribute('src', 'https://utteranc.es/client.js');
      script.setAttribute('repo', COMMENT_ISSUE_REPO);
      script.setAttribute('issue-term', 'pathname');
      script.setAttribute('label', 'comment');
      script.setAttribute('theme', 'github-light');
      script.setAttribute('crossorigin', 'anonymous');
      script.setAttribute('async', 'true');
      container.appendChild(script);
    }
    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return <div className="my-10" ref={divRef} />;
});

Comments.displayName = 'Comments';

export default Comments;