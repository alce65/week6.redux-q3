import { appStore } from '../../store/store';
import { ApiNotesRepository } from '../services/api.notes.repository';
import { loadThunk } from './notes.thunk';

describe('Given loadThunk', () => {
  test('it should be dispatched', () => {
    const mockRepo = {
      getAll: jest.fn(),
    } as unknown as ApiNotesRepository;
    appStore.dispatch(loadThunk(mockRepo));
    expect(mockRepo.getAll).toHaveBeenCalled();
  });
});
