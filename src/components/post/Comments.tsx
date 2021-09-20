import { useRef, useEffect, useLayoutEffect, useState, memo } from 'react';
import cx from 'classnames';
import { COMMENT_ISSUE_REPO } from '~/helpers/constants';

// ssr support
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const Comments: React.VFC = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    if (container) {
      // observe container node
      const observer = new MutationObserver((mutations) => {
        setIsLoaded(mutations.length > 1);
      });
      observer.observe(container, { childList: true });

      // add utteranc comment
      const script = document.createElement('script');
      script.setAttribute('src', 'https://utteranc.es/client.js');
      script.setAttribute('repo', COMMENT_ISSUE_REPO);
      script.setAttribute('issue-term', 'pathname');
      script.setAttribute('label', 'comment');
      script.setAttribute('theme', 'github-light');
      script.setAttribute('crossorigin', 'anonymous');
      script.setAttribute('async', 'true');
      container.appendChild(script);
      return () => {
        container.querySelector('.utterances')?.remove();
        observer.disconnect();
      };
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="my-10 relative"
      style={{ minHeight: 269 }}
    >
      <div
        className={cx('animate-pulse absolute w-full box-border', {
          hidden: isLoaded,
        })}
        style={{ paddingLeft: 4, paddingRight: 4 }}
      >
        <div
          className="h-5 rounded bg-gray-200"
          style={{ marginLeft: 62, marginTop: 16, marginBottom: 16 }}
        />
        <div className="flex w-full">
          <div
            className="flex-shrink-0 rounded bg-gray-200"
            style={{ width: 44, height: 44, marginRight: 16 }}
          />
          <div
            className="flex-grow rounded bg-gray-200"
            style={{ height: 196 }}
          />
        </div>
      </div>
    </div>
  );
});

Comments.displayName = 'Comments';

export default Comments;
