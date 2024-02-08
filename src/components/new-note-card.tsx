import { ChangeEvent, FormEvent, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  onCreate(content: string): void
}

let speechRecognition: SpeechRecognition | null = null;

export function NewNoteCard({ onCreate }: Props) {
  const [showLink, setShowLink] = useState(true);
  const [content, setContent] = useState('');
  const [isRecording, setIsRecording] = useState(false);

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

    if (content === "") return;

    onCreate(content);
    setContent("");
    setShowLink(true);
    toast.success('Nota criada com sucesso!');
  }

  function handleStopRecording() {
    setIsRecording(false);

    if (speechRecognition) {
      speechRecognition.stop();
    }
  }

  function handleStartRecording() {
    // verifica se a API de gravação de som está disponível no navegador
    const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;

    if (!isSpeechRecognitionAPIAvailable) {
      toast.warning('Infelizmente, seu navegador não suporte a API de gravação');
      return;
    }

    setIsRecording(true);
    setShowLink(false);

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    speechRecognition = new SpeechRecognitionAPI();
    speechRecognition.lang = 'pt-BR';
    speechRecognition.continuous = true;
    speechRecognition.maxAlternatives = 1;
    speechRecognition.interimResults = true;

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript);
      }, '');

      console.log(transcription)
      setContent(transcription);
    }

    speechRecognition.onerror = (event) => {
      console.error(event);
    }

    speechRecognition.start();
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
          fixed flex flex-col w-full overflow-hidden inset-0 outline-none
          md:inset-auto bg-slate-700 md:rounded-md md:left-1/2 md:top-1/2 
          md:max-w-[640px] md:h-[60vh] md:-translate-y-1/2 md:-translate-x-1/2
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
                  <button 
                    type="button"
                    onClick={handleStartRecording}
                    className='mx-1 font-medium text-lime-600 hover:underline'
                  >
                    gravando uma nota
                  </button> 
                  em áudio ou, se preferir,
                  <button 
                    type="button"
                    onClick={handleEditor} 
                    className='mx-1 font-medium text-lime-600 hover:underline'
                  >
                    utilize apenas texto.
                  </button>
                </p>
              ) : (
                <textarea 
                  autoFocus 
                  className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none'
                  onChange={handleContentChange}
                  value={content}
                />
              )}
            </div>

            {isRecording ? (
              <button type="button"             
                onClick={handleStopRecording}
                className={`
                  w-full flex items-center justify-center py-4 gap-2 outline-none 
                  bg-slate-900 text-center text-md text-slate-300 
                  md:rounded-b-md font-medium hover:text-slate-100
                `}
              >
                <div className='size-3 rounded-full bg-red-500 animate-pulse' />  
                Gravando... (clique p/ interromper)
              </button>
            ) : (
              <button type="submit"             
                className={`
                  w-full bg-lime-400 py-4 text-center text-md outline-none 
                  text-lime-950 md:rounded-b-md font-medium hover:bg-lime-500
                `}>
                Salvar nota
              </button>
            )}

          </form>          

        </Dialog.Content>   
      </Dialog.Portal>
    </Dialog.Root>
  )
}