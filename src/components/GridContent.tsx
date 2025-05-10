import React, { useState, useCallback, useEffect, useRef } from "react";
import { Link } from "react-router";
import { Photo } from "../types";
import ImageTile from "./ImageTile";
import pexelWrapper from "../api/pexelWrapper";
import { MasonryHydrateFallback } from "./MasonryHydrateFallback";

export default function GridContent() {
    const [isLoading, setLoading] = useState(false);
    const [items, setItems] = useState<Photo[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const isLoadingMore = useRef(false);

    const fetchData = useCallback(async (page: number) => {
        if (isLoadingMore.current) return;
        
        try {
            isLoadingMore.current = true;
            setLoading(true);
            const response = await pexelWrapper().popular(page);
            if (response.photos) {
                setItems(prevItems => {
                    // Filter out any duplicates based on photo ID
                    const newPhotos = response.photos.filter(
                        (newPhoto: Photo) => !prevItems.some(existingPhoto => existingPhoto.id === newPhoto.id)
                    );
                    return [...prevItems, ...newPhotos];
                });
            }
            setTotalResults(response.total_results);
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

    useEffect(() => {
        const debounceScroll = (func: (args: any) => void, delay: number) => {
            let timeoutId: ReturnType<typeof setTimeout>;
            return function (...args: any) {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                timeoutId = setTimeout(() => {
                    func(args);
                }, delay);
            };
        };
    
        const handleScroll = debounceScroll(() => {
            if (isLoadingMore.current) return;

            const bottom =
                Math.ceil(window.innerHeight + window.scrollY) >=
                document.documentElement.scrollHeight - 200;
            if (bottom && items.length < totalResults) {
                setPage((prevPage: number) => {
                    const nextPage = prevPage + 1;
                    fetchData(nextPage);
                    return nextPage;
                });
            }
        }, 300);

        // handle scroll loading
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [fetchData, items.length, totalResults]);

    return (
        <div className="App">
            <header className="App-header">Greetings from the Masonry Grid</header>
            <div className="grid-layout" role="grid">
                {items.map((photo: Photo, index: number) => (
                    <Link to={`/${photo.id}`} key={`${photo.id}-${index}`}>
                        <ImageTile photo={photo} imageSrc={photo.src.medium} />
                    </Link>
                ))}
            </div>
            {isLoading && <MasonryHydrateFallback />}
        </div>
    );
}