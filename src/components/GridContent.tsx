import React, { useState, useCallback, useRef, useEffect } from "react";
import { Link } from "react-router";
import { Photo } from "../types";
import pexelWrapper from "../api/pexelWrapper";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

import ImageTile from "./ImageTile";
import { MasonryHydrateFallback } from "./MasonryHydrateFallback";

export default function GridContent() {
    const [isLoading, setLoading] = useState(false);
    const [items, setItems] = useState<Photo[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [page, setPage] = useState(1);
    // using this to figure out if the data is going to be loaded
    const [totalResults, setTotalResults] = useState(0);
    const isLoadingMore = useRef(false);

    const fetchData = useCallback(async (page: number) => {
        // if the data is already being loaded, stop
        if (isLoadingMore.current) return;
        try {
            isLoadingMore.current = true;
            setLoading(true);

            const response = await pexelWrapper().popular(page);

            setTotalResults(response.total_results);
            if (response.photos) {
                setItems(prevItems => {
                    const newPhotos = response.photos.filter(
                        (newPhoto: Photo) => !prevItems.some(existingPhoto => existingPhoto.id === newPhoto.id)
                    );
                    return [...prevItems, ...newPhotos];
                });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
            isLoadingMore.current = false;
        }
    }, []);

    // Initial data fetch
    useEffect(() => {
        if (items.length === 0) {
            fetchData(1);
        }
    }, [fetchData, items.length]);

    // this is the custom hook for infinite scroll
    const boundaryRef = useInfiniteScroll({
        onLoadMore: () => {
            setPage(prev => {
                const next = prev + 1;
                fetchData(next);
                return next;
            });
        },
        hasMore: items.length < totalResults,
        isLoading,
        rootMargin: "400px",
    });

    return (
        <div className="container">
            <header className="header">Greetings from the Masonry Grid</header>
            <div className="grid-layout" role="grid">
                {items.map((photo: Photo, index: number) => (
                    <Link to={`/${photo.id}`} key={`${photo.id}-${index}`}>
                        <ImageTile photo={photo} imageSrc={photo.src.medium} />
                    </Link>
                ))}
                <div ref={boundaryRef} />
            </div>
            {isLoading && <MasonryHydrateFallback />}
        </div>
    );
}
