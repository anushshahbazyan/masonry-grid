import { useEffect, useRef } from "react";
import ImageTile from "./ImageTile";
import "./GridLayout.css";

export default function GridLayout() {
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateTotalColumns = () => {
            if (gridRef.current) {
                const containerWidth = gridRef.current.clientWidth;
                const minColumnWidth = 200; // Minimum width for a column
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

        return () => {
            window.removeEventListener('resize', updateTotalColumns);
        };
    }, []);

    // render some test tiles as an initial step
    return (
        <div className="grid-layout" ref={gridRef}>
            <ImageTile image="https://picsum.photos/200/300" />
            <ImageTile image="https://picsum.photos/200/300" />
            <ImageTile image="https://picsum.photos/200/250" />
            <ImageTile image="https://picsum.photos/200/350" />
            <ImageTile image="https://picsum.photos/200/200" />
            <ImageTile image="https://picsum.photos/200/400" />
            <ImageTile image="https://picsum.photos/200/300" />
            <ImageTile image="https://picsum.photos/200/300" />
        </div>
    );
}