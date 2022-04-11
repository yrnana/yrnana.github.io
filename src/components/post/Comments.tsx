import { useEffect, useRef } from 'react';

export const Comments: React.VFC<{ id: string }> = ({ id }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      // add utteranc comment
      const script = document.createElement('script');
      script.setAttribute('src', 'https://utteranc.es/client.js');
      script.setAttribute('repo', 'yrnana/yrnana.github.io');
      script.setAttribute('issue-term', id);
      script.setAttribute('label', 'comment');
      script.setAttribute('theme', 'github-light');
      script.setAttribute('crossorigin', 'anonymous');
      script.setAttribute('async', 'true');
      container.appendChild(script);
      return () => {
        container.innerHTML = '';
      };
    }
  }, [id]);

  return (
    <div
      ref={containerRef}
      className="mt-20 relative"
      style={{ minHeight: 269 }}
    />
  );
};

Comments.displayName = 'Comments';
