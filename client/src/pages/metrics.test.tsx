import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import MetricsPage from '../pages/metrics.page';

const mockFetch = jest.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve([]) }));
global.fetch = mockFetch as jest.Mock;

test('should render error message when fetching data fails', async () => {
  mockFetch.mockImplementationOnce(() => Promise.reject(new Error('Mock error')));
  render(<MetricsPage />);
  await waitFor(() => expect(screen.getByText(/Error:/i)).toBeInTheDocument());
});

test('should render data when fetch is successful', async () => {
  const mockData = [
    { timestamp: '01/01/2022 13:05', kwh: 100, pressure: 8.5, temp: 25 },
  ];
  mockFetch.mockImplementationOnce(() => Promise.resolve({ ok: true, json: () => Promise.resolve(mockData as never[]) } as Response));

  render(<MetricsPage />);

  await waitFor(() => expect(screen.getByText(/Timestamp/i)).toBeInTheDocument());
  await waitFor(() => expect(screen.getByText(/KWH/i)).toBeInTheDocument());
  await waitFor(() => expect(screen.getByText(/Pressure/i)).toBeInTheDocument());
  await waitFor(() => expect(screen.getByText(/Temperature/i)).toBeInTheDocument());
});

test('should render "No records to display" when no data is found', async () => {
  // Mock fetch to return an empty array
  mockFetch.mockImplementationOnce(() => Promise.resolve({ ok: true, json: () => Promise.resolve([] as never[]) } as Response));

  render(<MetricsPage />);

  // Expecting "No records to display" to be rendered
  await waitFor(() => expect(screen.getByText(/No records to display/i)).toBeInTheDocument());
});
