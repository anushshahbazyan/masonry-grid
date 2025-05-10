import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import GridLayout from './GridLayout';

beforeAll(async () => {
  global.TextEncoder = require('util').TextEncoder;
  global.TextDecoder = require('util').TextDecoder;
});

// Mock the pexelWrapper
jest.mock('../api/pexelWrapper', () => ({
  __esModule: true,
  default: () => ({
    popular: jest.fn().mockResolvedValue({
      photos: [
        {
          id: 1,
          src: { medium: 'test.jpg', original: 'test.jpg' },
          alt: 'Test Image',
          photographer: 'Test Photographer',
          photographer_url: 'https://test.com'
        }
      ]
    }),
    getPhoto: jest.fn().mockResolvedValue({
      photo: {
        id: 1,
        src: { medium: 'test.jpg', original: 'test.jpg' },
        alt: 'Test Image',
        photographer: 'Test Photographer',
        photographer_url: 'https://test.com'
      }
    }),
    processResponse: jest.fn().mockResolvedValue({
      photos: [
        {
          id: 1,
          src: { medium: 'test.jpg', original: 'test.jpg' },
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

test('renders grid layout with 4 columns', () => {
  render(<GridLayout />);

  const gridLayout = screen.getByRole('grid');
  expect(gridLayout).toBeInTheDocument();
  
});

test('redirects to image detail page', async () => {
  render(<GridLayout />);

  const imageTile = await screen.findByAltText('Test Image');
  fireEvent.click(imageTile);
  const imageDetail = await screen.findByText('Author: Test Photographer');
  expect(imageDetail).toBeInTheDocument();
});