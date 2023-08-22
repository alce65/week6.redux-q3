import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { Add } from './add';
import { TaskNoId } from '../../../model/task';
import { useTasks } from '../../hooks/use.tasks';

jest.mock('../../hooks/use.tasks');
describe('Given the component Add', () => {
  describe('When we render it', () => {
    const addTaskMock = jest.fn();
    const mockTask: TaskNoId = {
      title: 'Test title',
      owner: 'Test owner',
      isCompleted: false,
    };

    (useTasks as jest.Mock).mockReturnValue({
      add: addTaskMock,
    });

    beforeEach(() => {
      render(<Add></Add>);
    });

    test('The component should be in the document', async () => {
      const formElement = screen.getByRole('form');
      expect(formElement).toBeInTheDocument();
    });

    test('The form should be completed and will call the received function', async () => {
      const formElement = screen.getByRole('form');
      const inputElements = screen.getAllByRole('textbox');
      await userEvent.type(inputElements[0], mockTask.title);
      expect(inputElements[0]).toHaveValue(mockTask.title);
      await userEvent.type(inputElements[1], mockTask.owner);
      expect(inputElements[1]).toHaveValue(mockTask.owner);

      await fireEvent.submit(formElement);
      expect(addTaskMock).toHaveBeenCalledWith(mockTask);
    });
  });
});
