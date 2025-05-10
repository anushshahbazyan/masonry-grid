import React from 'react';
import { useLazyRender } from '../hooks/useLazyRender';
import { ImageTileProps } from '../types';
import "./ImageTile.css";

export default function ImageTile({ imageSrc, photo }: ImageTileProps) {
    const [tileRef, isVisible] = useLazyRender();

    return (
        <div className="image-tile" ref={tileRef}>
            {isVisible ? (
                <img src={imageSrc} alt={photo.alt} loading="lazy" />
            ) : (
                <div style={{ width: "100%", paddingTop: "75%", background: "#eee" }} />
            )}
        </div>
    );
}
