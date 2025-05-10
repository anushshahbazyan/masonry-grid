import { useEffect, useRef, useState } from "react";

export function useLazyRender(options?: IntersectionObserverInit) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        if (!ref.current) return;
        const observer = new IntersectionObserver(([entry]) => {
            setIntersecting(
                entry.rootBounds?.bottom
                ? entry.rootBounds?.bottom <= window.innerHeight
                : entry.isIntersecting
            );
        }, options);

        observer.observe(ref.current);

        return () => {
            observer.disconnect();
        };
    }, [options]);

    return [ref, isIntersecting] as const;
}
