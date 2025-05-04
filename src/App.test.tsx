import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

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

Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
  writable: true,
  configurable: true,
  value: 1024,
});

global.ResizeObserver = ResizeObserverMock;

// test cases
test('renders greetings header', () => {
  render(<App />);
  
  const headerElement = screen.getByText(/Greetings from the Masonry Grid/i);
  expect(headerElement).toBeInTheDocument();

  const imageTiles = screen.queryAllByRole('presentation');
  expect(imageTiles).toHaveLength(8);
});

// to be moved to a different suite
test('renders 8 image tiles', () => {
  render(<App />);
  
  // it appeared that image without alt has role: presentation :)
  const imageTiles = screen.queryAllByRole('presentation');
  expect(imageTiles).toHaveLength(8);
});
