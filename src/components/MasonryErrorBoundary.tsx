import React from "react";
import { ErrorResponse, isRouteErrorResponse } from "react-router";
import "./MasonryErrorBoundary.css";

export function MasonryErrorBoundary(error: Error | ErrorResponse | unknown) {
    if (isRouteErrorResponse(error)) {
        return (
            <div className="error-container">
                <h1>Not Found</h1>
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
