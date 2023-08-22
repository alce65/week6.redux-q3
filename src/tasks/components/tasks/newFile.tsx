import { render, screen } from '@testing-library/react';
import { Tasks } from './tasks';
import { Add } from '../add/add';
import { Card } from '../card/card';
import { useTasks } from '../../hooks/use.tasks';

describe('Given the component Tasks', () => {
  describe('When we render it', () => {
    test.skip('The component should be in the document before the data load', async () => {
      // mockContextValue.tasksContext.loadState = 'Loading';
      render(<Tasks></Tasks>);
      const h2Element = screen.getByRole('heading');
      expect(h2Element).toBeInTheDocument();
      expect(Add).toHaveBeenCalled();
      const pElement = screen.getByText('Loading...');
      expect(pElement).toBeInTheDocument();
    });

    test('The component should be in the document after the data load', async () => {
      render(<Tasks></Tasks>);
      expect(Card).toHaveBeenCalled();
      await expect(useTasks().loadTasks).toHaveBeenCalled();
    });
  });
});
