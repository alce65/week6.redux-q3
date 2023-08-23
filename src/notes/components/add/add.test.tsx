import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { Add } from './add';
import { NoteNoId } from '../../../model/note';
import { AppContext, AppContextStructure } from '../../../context/app.context';

describe('Given the component Add', () => {
  describe('When we render it', () => {
    const addNoteMock = jest.fn();
    const mockNote: NoteNoId = {
      title: 'Test title',
      author: 'Test author',
      isImportant: false,
    };

    const mockContextValue: AppContextStructure = {
      notesContext: { add: addNoteMock },
    } as unknown as AppContextStructure;

    beforeEach(() => {
      render(
        <AppContext.Provider value={mockContextValue}>
          <Add></Add>
        </AppContext.Provider>
      );
    });

    test('The component should be in the document', async () => {
      const formElement = screen.getByRole('form');
      expect(formElement).toBeInTheDocument();
    });

    test('The form should be completed and will call the received function', async () => {
      const formElement = screen.getByRole('form');
      const inputElements = screen.getAllByRole('textbox');
      await userEvent.type(inputElements[0], mockNote.title);
      expect(inputElements[0]).toHaveValue(mockNote.title);
      await userEvent.type(inputElements[1], mockNote.author);
      expect(inputElements[1]).toHaveValue(mockNote.author);

      await fireEvent.submit(formElement);
      expect(addNoteMock).toHaveBeenCalledWith(mockNote);
    });
  });
});
