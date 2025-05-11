import React from 'react';
import { useLazyRender } from '../hooks/useLazyRender';
import { ImageTileProps } from '../types';
import "./ImageTile.css";

export default function ImageTile({ imageSrc, photo }: ImageTileProps) {
    const [tileRef, isVisible] = useLazyRender();

    return (
        <div className={`image-tile ${isVisible ? "visible" : ""}`} style={{ background: "#eee" }} ref={tileRef}>
            {isVisible && (
                <img src={imageSrc} alt={photo.alt} loading="lazy" />
            )}
        </div>
    );
}
