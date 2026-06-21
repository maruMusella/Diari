import { useState, useRef, useEffect } from 'react'

const moods = [
  { id: 'happy', label: 'Feliz', color: '#E8836B' },
  { id: 'calm', label: 'En calma', color: '#7A8BA8' },
  { id: 'grateful', label: 'Agradecida', color: '#D4507A' },
  { id: 'thoughtful', label: 'Pensativa', color: '#8B8BA8' },
  { id: 'sad', label: 'Triste', color: '#5A6B85' },
  { id: 'anxious', label: 'Ansiosa', color: '#C14A3A' },
  { id: 'excited', label: 'Emocionada', color: '#E8836B' },
  { id: 'tired', label: 'Cansada', color: '#5A5A6E' },
]

interface EntryEditorProps {
  onClose: () => void
  initialPrompt?: string
}

export default function EntryEditor({ onClose, initialPrompt }: EntryEditorProps) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [showMoodPicker, setShowMoodPicker] = useState(false)
  const [photos, setPhotos] = useState<string[]>([])
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const [saved, setSaved] = useState(false)
  const editorRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const now = new Date()
  const dateStr = now.toLocaleDateString('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
  const timeStr = now.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus()
    }
  }, [])

  const handleInput = () => {
    if (editorRef.current) {
      const text = editorRef.current.innerText || ''
      setWordCount(text.trim() ? text.trim().split(/\s+/).length : 0)
    }
  }

  const execFormat = (command: string) => {
    document.execCommand(command, false)
    editorRef.current?.focus()
    if (command === 'bold') setIsBold(!isBold)
    if (command === 'italic') setIsItalic(!isItalic)
  }

  const handlePhotoAdd = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const newPhotos: string[] = []
    Array.from(files).slice(0, 10 - photos.length).forEach(file => {
      const url = URL.createObjectURL(file)
      newPhotos.push(url)
    })
    setPhotos(prev => [...prev, ...newPhotos])
    e.target.value = ''
  }

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => {
      onClose()
    }, 1200)
  }

  const currentMood = moods.find(m => m.id === selectedMood)

  return (
    <div className="min-h-screen w-full flex flex-col" style={{ background: '#050508' }}>
      {/* Ambient glow */}
      <div className="fixed w-[500px] h-[500px] rounded-full opacity-[0.06] pointer-events-none" style={{ top: '-200px', right: '-150px', background: 'radial-gradient(circle, #D4507A 0%, transparent 70%)', filter: 'blur(100px)' }} />

      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-14 pb-3 relative z-10">
        <button
          onClick={onClose}
          className="flex items-center gap-1 text-white/35 text-sm transition-colors hover:text-white/60"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Cerrar
        </button>
        <button
          onClick={handleSave}
          className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 active:scale-95"
          style={{
            background: wordCount > 0 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.05)',
            color: wordCount > 0 ? '#050508' : 'rgba(255,255,255,0.2)',
            boxShadow: wordCount > 0 ? '0 2px 12px rgba(255,255,255,0.1)' : 'none',
            border: wordCount > 0 ? 'none' : '1px solid rgba(255,255,255,0.06)',
          }}
        >
          Guardar
        </button>
      </div>

      {/* Date & mood row */}
      <div className="px-6 pb-4 flex items-center gap-3 relative z-10">
        <div className="flex-1">
          <div className="text-[0.8rem] text-white/35 capitalize">{dateStr}</div>
          <div className="text-[0.7rem] text-white/20">{timeStr}</div>
        </div>
        <button
          onClick={() => setShowMoodPicker(!showMoodPicker)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all active:scale-95"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
        >
          {currentMood ? (
            <>
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: currentMood.color }} />
              <span className="text-xs text-white/50">{currentMood.label}</span>
            </>
          ) : (
            <span className="text-xs text-white/25">¿Cómo estás?</span>
          )}
        </button>
      </div>

      {/* Mood picker */}
      {showMoodPicker && (
        <div className="px-6 pb-4 animate-fade-rise relative z-10">
          <div
            className="grid grid-cols-4 gap-2 p-3 rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(16px)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
            }}
          >
            {moods.map(({ id, label, color }) => (
              <button
                key={id}
                onClick={() => { setSelectedMood(id); setShowMoodPicker(false) }}
                className="flex flex-col items-center gap-1.5 py-2.5 rounded-xl transition-all active:scale-95"
                style={{
                  background: selectedMood === id ? 'rgba(255,255,255,0.08)' : 'transparent',
                }}
              >
                <span className="w-4 h-4 rounded-full" style={{ background: color }} />
                <span className="text-[0.6rem] text-white/30">{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Prompt hint */}
      {wordCount === 0 && initialPrompt && (
        <div className="px-6 pb-2 relative z-10">
          <p
            className="text-[1.1rem] text-white/12 italic"
            style={{ fontFamily: "'Libre Baskerville', serif" }}
          >
            {initialPrompt}
          </p>
        </div>
      )}

      {/* Photos */}
      {photos.length > 0 && (
        <div className="px-6 pb-3 relative z-10">
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {photos.map((url, i) => (
              <div key={i} className="relative shrink-0 w-20 h-20 rounded-xl overflow-hidden">
                <img src={url} alt="" className="w-full h-full object-cover" />
                <button
                  onClick={() => removePhoto(i)}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center"
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1 1L7 7M7 1L1 7" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Editor area */}
      <div className="flex-1 px-6 pb-4 relative z-10">
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          className="min-h-[40vh] text-[1rem] leading-relaxed text-white/75 outline-none"
          style={{ fontFamily: "'Inter', sans-serif", caretColor: 'rgba(255,255,255,0.6)' }}
          data-placeholder="Empezá a escribir..."
        />
      </div>

      {/* Bottom toolbar */}
      <div
        className="sticky bottom-0 left-0 right-0 px-5 py-3 flex items-center gap-1 relative z-10"
        style={{
          background: 'rgba(5,5,8,0.9)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <button
          onClick={() => execFormat('bold')}
          className="w-9 h-9 rounded-lg flex items-center justify-center transition-all active:scale-90"
          style={{ background: isBold ? 'rgba(255,255,255,0.1)' : 'transparent' }}
        >
          <span className="text-sm font-bold text-white/40">B</span>
        </button>
        <button
          onClick={() => execFormat('italic')}
          className="w-9 h-9 rounded-lg flex items-center justify-center transition-all active:scale-90"
          style={{ background: isItalic ? 'rgba(255,255,255,0.1)' : 'transparent' }}
        >
          <span className="text-sm italic text-white/40" style={{ fontFamily: "'Libre Baskerville', serif" }}>I</span>
        </button>
        <button
          onClick={() => execFormat('insertUnorderedList')}
          className="w-9 h-9 rounded-lg flex items-center justify-center transition-all active:scale-90"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="3" cy="4" r="1.2" fill="white" opacity="0.25" />
            <circle cx="3" cy="8" r="1.2" fill="white" opacity="0.25" />
            <circle cx="3" cy="12" r="1.2" fill="white" opacity="0.25" />
            <line x1="6.5" y1="4" x2="14" y2="4" stroke="white" opacity="0.25" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="6.5" y1="8" x2="14" y2="8" stroke="white" opacity="0.25" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="6.5" y1="12" x2="14" y2="12" stroke="white" opacity="0.25" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="h-5 w-px mx-1" style={{ background: 'rgba(255,255,255,0.06)' }} />

        <button
          onClick={handlePhotoAdd}
          className="w-9 h-9 rounded-lg flex items-center justify-center transition-all active:scale-90"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="2" y="3" width="14" height="12" rx="2" stroke="white" opacity="0.25" strokeWidth="1.2" />
            <circle cx="6.5" cy="7" r="1.5" stroke="white" opacity="0.25" strokeWidth="1" />
            <path d="M2 13L6 9.5L9 12L12 9L16 13" stroke="white" opacity="0.25" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />

        <button
          onClick={() => setShowMoodPicker(!showMoodPicker)}
          className="w-9 h-9 rounded-lg flex items-center justify-center transition-all active:scale-90"
        >
          <span className="w-3 h-3 rounded-full" style={{ background: currentMood ? currentMood.color : 'rgba(255,255,255,0.2)' }} />
        </button>

        <div className="flex-1" />

        <span className="text-[0.65rem] text-white/15 tabular-nums">
          {wordCount > 0 && `${wordCount} palabras`}
        </span>
      </div>

      {/* Saved feedback */}
      {saved && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(5,5,8,0.92)', backdropFilter: 'blur(12px)' }}>
          <div className="animate-fade-rise flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M6 14L11.5 19.5L22 8" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-sm text-white/50">Entrada guardada</p>
          </div>
        </div>
      )}
    </div>
  )
}
