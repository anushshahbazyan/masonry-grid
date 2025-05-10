import React from 'react';
import { render, screen } from '@testing-library/react';
import GridLayout from './GridLayout';

// Mock some objects as they are not present in the test environment
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 1024,
});

global.ResizeObserver = ResizeObserverMock;

// Mock the pexelWrapper
jest.mock('../api/pexelWrapper', () => ({
  __esModule: true,
  default: () => ({
    popular: jest.fn().mockResolvedValue({
      photos: [
        {
          id: 1,
          src: { medium: 'test.jpg' },
          alt: 'Test Image',
          photographer: 'Test Photographer',
          photographer_url: 'https://test.com'
        }
      ]
    }),
    processResponse: jest.fn().mockResolvedValue({
      photos: [
        {
          id: 1,
          src: { medium: 'test.jpg' },
          alt: 'Test Image',
          photographer: 'Test Photographer',
          photographer_url: 'https://test.com'
        }
      ]
    })
  })
}));

test('renders greetings header', () => {
  render(<GridLayout />);
  
  const headerElement = screen.getByText(/Greetings from the Masonry Grid/i);
  expect(headerElement).toBeInTheDocument();
}); 