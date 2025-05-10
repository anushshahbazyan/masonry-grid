import { Photo } from '../types';
import "./ImageTile.css";

interface ImageTileProps {
    imageSrc: string;
    photo: Photo;
}

export default function ImageTile({ imageSrc, photo }: ImageTileProps) {
    return (
        <div className="image-tile">
            <img src={imageSrc} alt={photo.alt} loading="lazy" />
        </div>
    );
}
