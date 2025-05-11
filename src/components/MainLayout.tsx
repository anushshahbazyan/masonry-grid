import React from "react";
import { createHashRouter, RouterProvider, useParams } from "react-router";
import { MasonryErrorBoundary } from "./MasonryErrorBoundary";
import { MasonryHydrateFallback } from "./MasonryHydrateFallback";
import GridContent from "./GridContent";
import ImageDetail from "./ImageDetail";
import "./MainLayout.css";

// this is a wrapper for the image detail component
// get the id from the url and pass it to the image detail component
function ImageDetailWrapper() {
    const { id } = useParams();
    const photo = id?.split("-")[0] || "0";
    return <ImageDetail photoId={photo} />;
}

export default function MainLayout() {
    // hash router, in order to maintain SPA behavior
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
        errorElement: <MasonryErrorBoundary />,
        hydrateFallbackElement: <MasonryHydrateFallback />,
        },
    ]);

    return (
        <RouterProvider router={router} />
    );
}
