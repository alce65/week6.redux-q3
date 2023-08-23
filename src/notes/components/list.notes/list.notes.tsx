import { useEffect } from 'react';
import { Add } from '../add/add';
import { Card } from '../card/card';
import './list.notes.scss';

import { useNotes } from '../../hooks/use.notes';

export function ListNotes() {
  console.log('Ejecutando Notes');

  const { notes, loadState, error, loadNotes } = useNotes();

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  return (
    <section id="notes" className="notes">
      <h2>Notas</h2>
      <div className="add-container">
        <Add></Add>
      </div>

      {loadState === 'loading' && <p>Loading...</p>}

      {loadState === 'loaded' && (
        <ul className="cards-container">
          {notes.map((item) => (
            <Card key={item.id} note={item}></Card>
          ))}
        </ul>
      )}

      {loadState === 'error' && <p>{error!.message}</p>}
    </section>
  );
}
