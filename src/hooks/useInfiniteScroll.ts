import { useEffect, useRef, useCallback } from "react";
import { UseInfiniteScrollOptions } from "../types";

export function useInfiniteScroll({
    onLoadMore,
    hasMore,
    isLoading,
    rootMargin = "400px",
}: UseInfiniteScrollOptions) {
    const boundaryRef = useRef<HTMLDivElement | null>(null);

    const handleIntersect = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            if (
                entries[0].isIntersecting &&
                hasMore &&
                !isLoading
            ) {
                onLoadMore();
            }
        },
        [onLoadMore, hasMore, isLoading]
    );

    useEffect(() => {
        if (!boundaryRef.current) return;
        const observer = new IntersectionObserver(handleIntersect, { rootMargin });
        observer.observe(boundaryRef.current);
        return () => observer.disconnect();
    }, [handleIntersect, rootMargin]);

    return boundaryRef;
}
