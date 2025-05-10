import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import MainLayout from "../components/MainLayout";
import GridContent from "../components/GridContent";

// Mock intersection observer
beforeAll(() => {
    class IntersectionObserverMock {
        observe = jest.fn();
        unobserve = jest.fn();
        disconnect = jest.fn();
        takeRecords = jest.fn();
        root = null;
        rootMargin = '';
        thresholds = [];
    }
    Object.defineProperty(window, 'IntersectionObserver', {
        writable: true,
        configurable: true,
        value: IntersectionObserverMock,
    });
});

// Mock the pexelWrapper
jest.mock("../api/pexelWrapper", () => ({
    __esModule: true,
    default: () => ({
        popular: jest.fn().mockResolvedValue({
            photos: [{
                id: 1,
                src: { medium: "test.jpg", original: "test.jpg" },
                alt: "Test Image",
                photographer: "Test Photographer",
                photographer_url: "https://test.com"
            }]
        }),
        getPhoto: jest.fn().mockResolvedValue({
            id: 1,
            src: { medium: "test.jpg", original: "test.jpg" },
            alt: "Test Image",
            photographer: "Test Photographer",
            photographer_url: "https://test.com"
        }),
    })
}));

test("renders greetings header", async () => {
    render(<GridContent />);
    
    const headerElement = await screen.findByText(/Greetings from the Masonry Grid/i);
    expect(headerElement).toBeInTheDocument();
});

test("renders grid layout with 4 columns", async () => {
    render(<GridContent />);

    const gridLayout = screen.getByRole("grid");
    expect(gridLayout).toBeInTheDocument();
  
});

test("redirects to image detail page", async () => {
    render(<MainLayout />);

    const imageTile = await screen.findByRole("link");
    fireEvent.click(imageTile);
    const imageDetail = await screen.findByText("Author: Test Photographer");
    expect(imageDetail).toBeInTheDocument();
});
