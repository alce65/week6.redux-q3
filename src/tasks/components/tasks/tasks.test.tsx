import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Tasks } from './tasks';
import { Add } from '../add/add';
import { Card } from '../card/card';
import { useTasks } from '../../hooks/use.tasks';

jest.mock('../add/add');
jest.mock('../card/card');
jest.mock('../../hooks/use.tasks');

describe('Given the component Tasks', () => {
  const mockLoadTasks = jest.fn().mockImplementation(() => {
    console.log('Soy un mock de loadTasks');
  });

  describe('When we render it', () => {
    test('The component should be in the document before the data load', () => {
      (useTasks as jest.Mock).mockReturnValue({
        tasks: [{ id: 1 }],
        loadState: 'loading',
        loadTasks: mockLoadTasks,
      });
      render(<Tasks></Tasks>);
      const h2Element = screen.getByRole('heading');
      expect(h2Element).toBeInTheDocument();
      expect(Add).toHaveBeenCalled();
      const pElement = screen.getByText('Loading...');
      expect(pElement).toBeInTheDocument();
    });

    test('The component should be in the document after the data load', () => {
      (useTasks as jest.Mock).mockReturnValue({
        tasks: [{ id: 1 }],
        loadState: 'loaded',
        loadTasks: mockLoadTasks,
      });
      render(<Tasks></Tasks>);
      expect(Card).toHaveBeenCalled();
      expect(mockLoadTasks).toHaveBeenCalled();
    });
  });
});
