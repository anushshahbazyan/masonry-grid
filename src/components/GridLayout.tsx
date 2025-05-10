import React, { useState, useCallback, useEffect, useRef } from "react";
import { Link, createHashRouter, isRouteErrorResponse, RouterProvider, useParams } from "react-router";
import ImageTile from "./ImageTile";
import ImageDetail from "./ImageDetail";
import pexelWrapper from '../api/pexelWrapper';
import { Photo } from '../types';
import "./GridLayout.css";

export function GridLayoutHydrateFallback() {
  return (
    <div className="loading-container">
      <h2>Loading...</h2>
    </div>
  );
}

export function GridLayoutErrorBoundary(error: any) {
  if (isRouteErrorResponse(error)) {
    return (
      <div className="error-container">
        <h1>Not Found</h1>
        <p>We couldn't find what you're looking for</p>
      </div>
    );
  }
  if (error instanceof Error) {
    return (
      <div className="error-container">
        <h1>Error</h1>
        <p>{error.message}</p>
      </div>
    );
  }
  return (
    <div className="error-container">
      <h1>Error</h1>
      <p>Something went wrong</p>
    </div>
  );
}

function ImageDetailWrapper() {
    return <></>;
}

function GridContent() {
    const gridRef = useRef<HTMLDivElement>(null);
    const [isLoading, setLoading] = useState(false);
    const [items, setItems] = useState<Photo[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [page, setPage] = useState(1);
    const isLoadingMore = useRef(false);

    const fetchData = useCallback(async (page: number) => {
        if (isLoadingMore.current) return;
        
        try {
            isLoadingMore.current = true;
            setLoading(true);
            const response = await pexelWrapper().popular(page);
            if (response) {
                const processedResponse = await pexelWrapper().processResponse(response);
                setItems(prevItems => {
                    // Filter out any duplicates based on photo ID
                    const newPhotos = processedResponse.photos.filter(
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
            if (bottom) {
                setPage((prevPage: number) => {
                    const nextPage = prevPage + 1;
                    fetchData(nextPage);
                    return nextPage;
                });
            }
        }, 300);

        const updateTotalColumns = () => {
            if (gridRef.current) {
                const containerWidth = gridRef.current.clientWidth;
                const minColumnWidth = 300; // Minimum width for a column
                const gap = 25; // Gap between columns
                
                // calculate how many columns can fit
                const availableWidth = containerWidth - gap;
                const totalColumns = Math.floor(availableWidth / (minColumnWidth + gap));
                
                // ensure at least 1 column
                const columns = Math.max(1, totalColumns);
                
                console.log('Grid width:', containerWidth);
                console.log('Total columns:', columns);
                
                gridRef.current.style.setProperty("--total-columns", columns.toString());
            }
        };

        // initial calculation
        updateTotalColumns();

        // update on window resize
        window.addEventListener('resize', updateTotalColumns);
        // handle scroll loading
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener('resize', updateTotalColumns);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [fetchData]);

    return (
        <div className="App">
            <header className="App-header">Greetings from the Masonry Grid</header>
            <div className="grid-layout" ref={gridRef}>
                {items.map((photo: Photo, index: number) => (
                    <Link to={`/${photo.id}`} key={`${photo.id}-${index}`}>
                        <ImageTile photo={photo} imageSrc={photo.src.medium} />
                    </Link>
                ))}
            </div>
            {isLoading && <div className="loading-indicator">Loading more...</div>}
        </div>
    );
}

export default function GridLayout() {
    const router = createHashRouter([
        {
            path: "/",
            element: <GridContent />,
            errorElement: <GridLayoutErrorBoundary />,
            hydrateFallbackElement: <GridLayoutHydrateFallback />,
        },
        {
            path: "/:id",
            element: <ImageDetailWrapper />,
        },
    ]);

    return (
        <RouterProvider router={router} />
    );
}