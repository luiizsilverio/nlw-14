import { ChangeEvent, FormEvent, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { toast } from 'sonner';

export function NewNoteCard() {
  const [showLink, setShowLink] = useState(true);
  const [content, setContent] = useState('');

  function handleEditor() {
    setShowLink(false);
  }

  function handleContentChange(ev: ChangeEvent<HTMLTextAreaElement>) {
    setContent(ev.target.value);

    if (!ev?.target.value) {
      setShowLink(true);
    }
  }

  function handleSaveNote(ev: FormEvent) {
    ev.preventDefault();

    toast.success('Nota criada com sucesso!');
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className={`
        flex flex-col rounded-md bg-slate-700 p-5 gap-3 overflow-hidden relative outline-none 
        hover:ring-2 focus-visible:ring-2 focus-visible:ring-purple-700 text-left
      `}>
        <span className='text-sm font-medium text-slate-200'>
          Adicionar nota
        </span>
        <p className='text-sm leading-6 text-slate-400'>
          Grave uma nota em áudio que será convertida para texto automaticamente.
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='inset-0 fixed bg-slate-950/70' />
        <Dialog.Content className={`
          fixed left-1/2 top-1/2 max-w-[640px] w-full h-[60vh] rounded-md flex flex-col 
          outline-none -translate-x-1/2 -translate-y-1/2 bg-slate-700
        `}>
          <Dialog.Close className='absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100'>
            <X className='size-5' />
          </Dialog.Close>

          <form onSubmit={handleSaveNote} className='flex flex-1 flex-col'>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className='text-sm font-medium text-slate-300'>
                Adicionar Nota
              </span>

              {showLink ? (
                <p className='text-sm leading-6 text-slate-400'>
                  Comece
                  <button className='mx-1 font-medium text-lime-600 hover:underline'>
                    gravando uma nota
                  </button> 
                  em áudio ou, se preferir,
                  <button onClick={handleEditor} className='mx-1 font-medium text-lime-600 hover:underline'>
                    utilize apenas texto.
                  </button>
                </p>
              ) : (
                <textarea 
                  autoFocus 
                  className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none'
                  onChange={handleContentChange}
                />
              )}
              </div>

            <button type="submit" 
              className={`
                w-full bg-lime-400 py-4 text-center text-md text-lime-950 outline-none rounded-b-md
                font-medium hover:bg-lime-500
              `}>
            Salvar nota
            </button>
          </form>          

        </Dialog.Content>   
      </Dialog.Portal>
    </Dialog.Root>
  )
}