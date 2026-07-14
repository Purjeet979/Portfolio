import React, { useEffect, useRef, useState } from "react";

const LazyMount = ({ id, minHeight = 320, rootMargin = "600px", children }) => {
  const ref = useRef(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    if (shouldMount) return undefined;

    if (!("IntersectionObserver" in window)) {
      setShouldMount(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [rootMargin, shouldMount]);

  return (
    <div id={id} ref={ref} style={!shouldMount ? { minHeight } : undefined}>
      {shouldMount ? children : null}
    </div>
  );
};

export default LazyMount;
