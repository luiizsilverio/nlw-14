import logo from './assets/logo-nlw.svg';
import { NewNoteCard } from './components/new-note-card';
import {NoteCard} from './components/note-card';

function App() {  
  return (
    <div className='mx-auto max-w-5xl my-12 space-y-6'>
      <img src={logo} alt="NLW Expert Notes" />
      <form className='w-full'>
        <input 
          type="text" 
          placeholder='Busque em suas notas...' 
          className={`
            w-full bg-transparent text-3xl font-semibold tracking-tight
            placeholder-slate-500 outline-none
          `}
        />
      </form>

      <hr className="h-px border-b-px border-slate-700" />
      {/* <div className="h-px bg-slate-700" /> */}

      <div className="grid grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard />

        <NoteCard 
          note={{
            date: new Date(),
            content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut atque aperiam, deserunt officiis a fugiat quos eius facilis unde beatae. Eos porro maxime numquam libero, voluptates cupiditate eius reiciendis nam."
          }}
        />
        <NoteCard 
          note={{
            date: new Date(2024, 1, 1),
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod illo ipsa cupiditate quo recusandae provident suscipit placeat? Aliquam illum quae rerum, sed, natus tempora sint cumque explicabo incidunt sapiente adipisci!"
          }}
        />
        <NoteCard 
          note={{
            date: new Date(2023, 11, 25),
            content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et soluta iste beatae, reprehenderit excepturi, fugit veritatis quibusdam omnis odit perferendis, repellat ullam. Recusandae officia nisi natus ipsum tempora eos non!"
          }}
        />
        <NoteCard 
          note={{
            date: new Date(2023, 10, 20),
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit aspernatur veritatis maxime dolores hic architecto repellendus accusamus est perferendis, molestias blanditiis odit mollitia placeat eligendi ad repudiandae fugiat quae beatae?"
          }}
        />
      </div>
    </div>
  )
}

export default App
