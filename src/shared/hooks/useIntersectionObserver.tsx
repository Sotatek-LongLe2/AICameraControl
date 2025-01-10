import { useEffect, useRef, useState } from "react";

interface IUseIntersectionObserver {
  /**
   * Must wrapped in `useCallback`, only fetch data when `!loading` and `hasMore`
   * @returns undefined
   */
  loadMore?: () => void;
}

export const DEFAULT_THRESHOLD = 0;
export const DEFAULT_THRESHOLD_STRING = `${DEFAULT_THRESHOLD}px`;

const options: IntersectionObserverInit = {
  root: null,
  rootMargin: DEFAULT_THRESHOLD_STRING,
  threshold: 1,
};

export const useIntersectionObserver = ({
  loadMore,
}: IUseIntersectionObserver) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [stateEl, setEl] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current ? ref : { current: stateEl };
    const observer = new IntersectionObserver((observerEntry) => {
      if (observerEntry[0].isIntersecting) loadMore?.();
    }, options);

    if (el.current) observer.observe(el.current);

    return () => {
      if (el.current) observer.unobserve(el.current);
    };
  }, [loadMore, ref, stateEl]);

  return { ref, setEl };
};
