import { ChangeEvent, useEffect, useState } from 'react';
import logo from './assets/logo-nlw.svg';
import { NewNoteCard } from './components/new-note-card';
import {NoteCard} from './components/note-card';

interface INote {
  id: string;
  date: Date;
  content: string;
}

const oldNotes = [
  {
    id: '1',
    date: new Date(2024, 1, 1),
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod illo ipsa cupiditate quo recusandae provident suscipit placeat? Aliquam illum quae rerum, sed, natus tempora sint cumque explicabo incidunt sapiente adipisci!"
  },
  {
    id: '2',
    date: new Date(2023, 11, 5),
    content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et soluta iste beatae, reprehenderit excepturi, fugit veritatis quibusdam omnis odit perferendis, repellat ullam. Recusandae officia nisi natus ipsum tempora eos non!"
  },
  {
    id: '3',
    date: new Date(2023, 10, 20),
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit aspernatur veritatis maxime dolores hic architecto repellendus accusamus est perferendis, molestias blanditiis odit mollitia placeat eligendi ad repudiandae fugiat quae beatae?"
  },
]

function App() {  
  const [notes, setNotes] = useState<INote[]>(oldNotes);
  const [busca, setBusca] = useState('');

  function onNoteCreate(content: string) {
    const newNote: INote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }

    const lstNotes = [newNote, ...notes];
    setNotes(lstNotes);

    localStorage.setItem('nlw14:notes', JSON.stringify(lstNotes));
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;
    setBusca(query);
  }

  function onDeleteNote(id: string) {
    const newList = notes.filter(note => note.id !== id);

    setNotes(newList);
    localStorage.setItem('nlw14:notes', JSON.stringify(newList));
  }

  useEffect(() => {
    const storedNotes = localStorage.getItem('nlw14:notes');

    if (storedNotes) {
      const lstNotes: INote[] = JSON.parse(storedNotes);
      setNotes(lstNotes);
    }
  }, []);

  const filteredNotes = !!busca 
    ? notes.filter(note => note.content.toLowerCase().includes(busca.toLowerCase())) 
    : notes;
  
  return (
    <div className='mx-auto max-w-5xl my-12 space-y-6 px-5'>
      <img src={logo} alt="NLW Expert Notes" />
      <form className='w-full'>
        <input 
          type="text" 
          placeholder='Busque em suas notas...' 
          onChange={handleSearch}
          className={`
            w-full bg-transparent text-3xl font-semibold tracking-tight
            placeholder-slate-500 outline-none
          `}
        />
      </form>

      <hr className="h-px border-b-px border-slate-700" />
      {/* <div className="h-px bg-slate-700" /> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard onCreate={onNoteCreate} />

        {filteredNotes.map(note => (
          <NoteCard 
            key={note.id}
            note={note}
            onDelete={onDeleteNote}
          />
        ))}
        
      </div>
    </div>
  )
}

export default App
