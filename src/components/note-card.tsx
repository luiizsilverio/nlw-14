import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
interface CardProps {
  note: {
    date: Date;
    content: string;
  }
}

export function NoteCard({ note }: CardProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className={`
        flex flex-col rounded-md bg-slate-800 p-5 gap-3 overflow-hidden relative outline-none 
        hover:ring-2 focus-visible:ring-2 focus-visible:ring-purple-700 text-left
      `}>
        <span className='text-sm font-medium text-slate-300'>
          {formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true })}
        </span>
        <p className='text-sm leading-6 text-slate-400'>
          {note.content}        
        </p>
        <div className={`
          absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none
          bg-gradient-to-t from-slate-950/70 to-black/0
        `} />
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

          <div className="flex flex-1 flex-col gap-3 p-5">
            <span className='text-sm font-medium text-slate-300'>
              {note.date.toISOString()}
            </span>
            <p className='text-sm leading-6 text-slate-400'>
              {note.content}        
            </p>
          </div>

          <button type="button" 
            className={`
              w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none rounded-b-md
              font-medium group
            `}>
            Deseja <span className='text-red-400 group-hover:underline'>apagar essa nota</span>?
          </button>
        </Dialog.Content>   
      </Dialog.Portal>
    </Dialog.Root>
  )
}