import { useEffect, useRef } from "react";
import "./ImageTile.css";

export default function ImageTile({ image }: { image: string }) {
    const tileRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    // Effect for row span calculation
    useEffect(() => {
        const updateRowSpan = () => {
            if (imgRef.current) {
                const height = imgRef.current?.getBoundingClientRect().height || 0;
                console.log('Height:', height);
                const rowSpan = Math.ceil(height / 300);
                console.log('Row span:', rowSpan);
                if (tileRef.current) {
                    tileRef.current.style.setProperty("--row-span", rowSpan.toString());
                }
            }
        };

        const debouncedUpdate = () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                updateRowSpan();
            }, 100); // 100ms delay
        };

        const resizeObserver = new ResizeObserver(debouncedUpdate);
        
        if (tileRef.current) {
            resizeObserver.observe(tileRef.current);
        }

        updateRowSpan();

        if (imgRef.current) {
            if (imgRef.current.complete) {
                updateRowSpan();
            } else {
                imgRef.current.onload = () => {
                    updateRowSpan();
                };
            }
        }

        return () => {
            resizeObserver.disconnect();
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        }
    }, []);

    return (
        <div className="image-tile" ref={tileRef}>
            <img ref={imgRef} src={image} alt="" loading="lazy" />
        </div>
    );
}
