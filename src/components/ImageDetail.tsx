import "./ImageDetail.css";
import { GridLayoutHydrateFallback } from './GridLayout';
import pexelWrapper from "../api/pexelWrapper";
import { useCallback, useEffect } from "react";
import { useState } from "react";
import { Photo } from "../types";

interface ImageDetailProps {
    photoId: string;
}

export default function ImageDetail({ photoId }: ImageDetailProps) {
    const [photo, setPhoto] = useState<Photo>();
    const fetchData = useCallback(async () => {
        try {
            const response = await pexelWrapper().getPhoto(photoId);
            if (response) {
                setPhoto(response);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [photoId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (!photo) {
        return <GridLayoutHydrateFallback />;
    }

    return (
        <div className="image-detail-container">
            <button onClick={() => window.history.back()}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
                Back to Gallery
            </button>
            <div className="image-detail">
                <img src={photo.src.original} alt={photo.alt} loading="lazy" />
                <div className="image-detail-info">
                    <h1>{photo.alt}</h1>
                    <p>Author: {photo.photographer}</p>
                    <p>Link: <a href={photo.photographer_url} target="_blank" rel="noopener noreferrer">{photo.photographer_url}</a></p>
                </div>
            </div>
        </div>
    );
}
