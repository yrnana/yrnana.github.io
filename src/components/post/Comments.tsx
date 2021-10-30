import { memo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import cx from 'classnames';
import { graphql, useStaticQuery } from 'gatsby';

// ssr support
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const Comments: React.VFC = memo(() => {
  const data = useStaticQuery<CommentsQuery>(
    graphql`
      query Comments {
        site {
          siteMetadata {
            commentIssueRepo
          }
        }
      }
    `,
  );
  const commentIssueRepo = data.site?.siteMetadata?.commentIssueRepo!;

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
      script.setAttribute('repo', commentIssueRepo);
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
  }, [commentIssueRepo]);

  return (
    <div
      ref={containerRef}
      className="mt-20 relative"
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
