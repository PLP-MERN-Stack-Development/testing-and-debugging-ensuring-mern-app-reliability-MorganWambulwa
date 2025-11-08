import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dashboard from '../../pages/Dashboard';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// Mock API responses
const mockBugs = [
  {
    _id: '1',
    title: 'Test Bug 1',
    description: 'Bug description 1',
    status: 'Open',
    priority: 'Medium',
  },
  {
    _id: '2',
    title: 'Test Bug 2',
    description: 'Bug description 2',
    status: 'In-Progress',
    priority: 'High',
  },
];

const server = setupServer(
  rest.get('http://localhost:5000/api/bugs', (req, res, ctx) => {
    return res(ctx.json({ data: mockBugs }));
  }),
  rest.post('http://localhost:5000/api/bugs', (req, res, ctx) => {
    const newBug = { ...req.body, _id: '3' };
    mockBugs.push(newBug);
    return res(ctx.json({ data: newBug }));
  }),
  rest.put('http://localhost:5000/api/bugs/:id', (req, res, ctx) => {
    const { id } = req.params;
    const index = mockBugs.findIndex(b => b._id === id);
    if (index !== -1) {
      mockBugs[index] = { ...mockBugs[index], ...req.body };
      return res(ctx.json({ data: mockBugs[index] }));
    }
    return res(ctx.status(404));
  }),
  rest.delete('http://localhost:5000/api/bugs/:id', (req, res, ctx) => {
    const { id } = req.params;
    const index = mockBugs.findIndex(b => b._id === id);
    if (index !== -1) {
      mockBugs.splice(index, 1);
      return res(ctx.status(200));
    }
    return res(ctx.status(404));
  })
);

// Start server before all tests
beforeAll(() => server.listen());
// Reset handlers after each test
afterEach(() => server.resetHandlers());
// Close server after all tests
afterAll(() => server.close());

describe('Dashboard Integration', () => {
  test('renders list of bugs', async () => {
    render(<Dashboard />);
    
    // Wait for API data to load
    await waitFor(() => {
      expect(screen.getByText(/Test Bug 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Test Bug 2/i)).toBeInTheDocument();
    });
  });

  test('adds a new bug', async () => {
    render(<Dashboard />);

    const titleInput = screen.getByPlaceholderText(/title/i);
    const descInput = screen.getByPlaceholderText(/description/i);
    const addButton = screen.getByRole('button', { name: /add bug/i });

    await userEvent.type(titleInput, 'New Bug');
    await userEvent.type(descInput, 'New description');
    await userEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText(/New Bug/i)).toBeInTheDocument();
      expect(screen.getByText(/New description/i)).toBeInTheDocument();
    });
  });

  test('edits an existing bug', async () => {
    render(<Dashboard />);

    // Wait for initial bugs
    await waitFor(() => screen.getByText(/Test Bug 1/i));

    const editButtons = screen.getAllByText(/edit/i);
    await userEvent.click(editButtons[0]);

    const titleInput = screen.getByPlaceholderText(/title/i);
    const updateButton = screen.getByRole('button', { name: /update bug/i });

    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, 'Updated Bug');
    await userEvent.click(updateButton);

    await waitFor(() => {
      expect(screen.getByText(/Updated Bug/i)).toBeInTheDocument();
    });
  });

  test('deletes a bug', async () => {
    render(<Dashboard />);

    await waitFor(() => screen.getByText(/Test Bug 1/i));

    const deleteButtons = screen.getAllByText(/delete/i);
    await userEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(screen.queryByText(/Test Bug 1/i)).not.toBeInTheDocument();
    });
  });
});
