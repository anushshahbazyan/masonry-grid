import React from "react";
import { createHashRouter, RouterProvider, useParams } from "react-router";
import ImageDetail from "./ImageDetail";
import { MasonryErrorBoundary } from "./MasonryErrorBoundary";
import { MasonryHydrateFallback } from "./MasonryHydrateFallback";
import GridContent from "./GridContent";
import "./MainLayout.css";

function ImageDetailWrapper() {
    const { id } = useParams();
    const photo = id?.split('-')[0] || '0';
    return <ImageDetail photoId={photo} />;
}

export default function MainLayout() {
    const router = createHashRouter([
        {
            path: "/",
            element: <GridContent />,
            errorElement: <MasonryErrorBoundary />,
            hydrateFallbackElement: <MasonryHydrateFallback />,
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
