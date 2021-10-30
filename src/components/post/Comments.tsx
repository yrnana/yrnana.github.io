import { useEffect, useRef } from 'react';

const Comments: React.VFC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      // add utteranc comment
      const script = document.createElement('script');
      script.src = 'https://utteranc.es/client.js';
      script.async = true;
      // script.setAttribute('src', 'https://utteranc.es/client.js');
      script.setAttribute('repo', 'yrnana/yrnana.github.io');
      script.setAttribute('issue-term', 'pathname');
      script.setAttribute('label', 'comment');
      script.setAttribute('theme', 'github-light');
      script.setAttribute('crossorigin', 'anonymous');
      // script.setAttribute('async', 'true');
      container.appendChild(script);
      return () => {
        container.innerHTML = '';
      };
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="mt-20 relative"
      style={{ minHeight: 269 }}
    />
  );
};

Comments.displayName = 'Comments';

export default Comments;
