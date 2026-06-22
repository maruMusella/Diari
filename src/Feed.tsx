import { useState } from 'react'

interface Entry {
  id: string
  date: Date
  text: string
  mood?: { label: string; color: string }
  photos: string[]
  location?: string
  wordCount: number
  gradient: string
}

const cardGradients = [
  'linear-gradient(145deg, rgba(212,80,122,0.5) 0%, rgba(232,131,107,0.35) 50%, rgba(193,74,58,0.4) 100%)',
  'linear-gradient(145deg, rgba(77,168,218,0.4) 0%, rgba(43,143,212,0.3) 50%, rgba(27,108,168,0.35) 100%)',
  'linear-gradient(145deg, rgba(232,131,107,0.45) 0%, rgba(212,80,122,0.35) 50%, rgba(255,176,124,0.3) 100%)',
  'linear-gradient(145deg, rgba(13,59,102,0.5) 0%, rgba(43,143,212,0.3) 50%, rgba(168,216,234,0.2) 100%)',
  'linear-gradient(145deg, rgba(193,18,31,0.35) 0%, rgba(212,80,122,0.3) 50%, rgba(232,131,107,0.25) 100%)',
  'linear-gradient(145deg, rgba(168,216,234,0.3) 0%, rgba(77,168,218,0.25) 50%, rgba(43,143,212,0.3) 100%)',
]

const sampleEntries: Entry[] = [
  {
    id: '6',
    date: new Date(2026, 5, 20, 10, 15),
    text: 'Mañana de domingo con café y lluvia. El mundo se detuvo un rato.',
    mood: { label: 'En calma', color: '#4DA8DA' },
    photos: [],
    location: 'Casa',
    wordCount: 14,
    gradient: cardGradients[1],
  },
  {
    id: '5',
    date: new Date(2026, 5, 19, 18, 30),
    text: 'Pensé mucho en lo que me dijo mamá. A veces las verdades duelen pero curan.',
    mood: { label: 'Pensativa', color: '#7A8BA8' },
    photos: [],
    wordCount: 16,
    gradient: cardGradients[3],
  },
  {
    id: '4',
    date: new Date(2026, 5, 17, 21, 0),
    text: 'Noche de playlist nueva y velas. Me estoy permitiendo disfrutar la soledad.',
    mood: { label: 'Agradecida', color: '#D4507A' },
    photos: [],
    wordCount: 13,
    gradient: cardGradients[0],
  },
  {
    id: '3',
    date: new Date(2026, 5, 15, 16, 42),
    text: 'Caminé por el parque y vi cómo las hojas cambiaban de color. Me sentí viva.',
    mood: { label: 'Feliz', color: '#E8836B' },
    photos: [],
    location: 'Palermo, Buenos Aires',
    wordCount: 15,
    gradient: cardGradients[2],
  },
  {
    id: '2',
    date: new Date(2026, 5, 14, 22, 15),
    text: 'No puedo dormir. Hay algo que me inquieta pero no logro identificar qué es.',
    mood: { label: 'Inquieta', color: '#2B8FD4' },
    photos: [],
    wordCount: 15,
    gradient: cardGradients[4],
  },
  {
    id: '1',
    date: new Date(2026, 5, 13, 9, 30),
    text: 'Primera entrada en mi diario. Este va a ser mi espacio seguro, mi rincón.',
    mood: { label: 'Emocionada', color: '#E8836B' },
    photos: [],
    wordCount: 14,
    gradient: cardGradients[5],
  },
]

const prompts = [
  '¿Qué te hizo sonreír hoy?',
  '¿Qué aprendiste esta semana?',
  '¿Por qué estás agradecida hoy?',
  'Describí un momento que quieras recordar.',
  '¿Qué necesitás soltar?',
]

const filters = ['Todo', 'Reflexión', 'Gratitud', 'Viajes', 'Creatividad']

interface FeedProps {
  onNewEntry: () => void
}

export default function Feed({ onNewEntry }: FeedProps) {
  const [entries] = useState<Entry[]>(sampleEntries)
  const [activeFilter, setActiveFilter] = useState('Todo')

  const now = new Date()
  const greeting = now.getHours() < 12 ? 'Buenos días' : now.getHours() < 18 ? 'Buenas tardes' : 'Buenas noches'
  const todayPrompt = prompts[now.getDate() % prompts.length]

  const streak = 3

  return (
    <div className="w-full pb-28" style={{ background: '#050508' }}>
      {/* Ambient nebula blurs */}
      <div className="fixed w-[500px] h-[500px] rounded-full opacity-[0.08] pointer-events-none" style={{ top: '-50px', right: '-200px', background: 'radial-gradient(circle, #D4507A 0%, #8B2252 40%, transparent 70%)', filter: 'blur(100px)' }} />
      <div className="fixed w-[400px] h-[400px] rounded-full opacity-[0.05] pointer-events-none" style={{ top: '300px', left: '-200px', background: 'radial-gradient(circle, #E8836B 0%, #C14A3A 40%, transparent 70%)', filter: 'blur(90px)' }} />

      {/* Header */}
      <div className="px-6 pt-14 pb-1 flex items-center justify-between relative z-10">
        <h1
          className="text-[1.4rem] text-white/90"
          style={{ fontFamily: "'Libre Baskerville', serif" }}
        >
          diari
        </h1>
        <div className="flex items-center gap-2">
          {streak > 1 && (
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
              style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <span className="font-medium">{streak} días seguidos</span>
            </div>
          )}
          <button
            className="liquid-glass w-9 h-9 rounded-full flex items-center justify-center"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2.5 5H15.5M2.5 9H15.5M2.5 13H15.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" opacity="0.35" />
            </svg>
          </button>
        </div>
      </div>

      {/* Greeting */}
      <div className="px-6 pt-4 pb-1 relative z-10">
        <p className="text-[0.8rem] uppercase tracking-widest text-white/20 font-medium">{greeting}</p>
      </div>

      {/* Hero prompt card */}
      <div className="px-6 pt-3 pb-5 relative z-10">
        <div
          className="relative overflow-hidden rounded-3xl p-6"
          style={{
            background: 'linear-gradient(135deg, rgba(212,80,122,0.25) 0%, rgba(232,131,107,0.15) 40%, rgba(139,34,82,0.2) 100%)',
            minHeight: 180,
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          {/* Decorative blurs */}
          <div
            className="absolute -top-8 -right-8 w-48 h-48 rounded-full opacity-40"
            style={{ background: 'radial-gradient(circle, rgba(232,131,107,0.4) 0%, transparent 70%)', filter: 'blur(30px)' }}
          />
          <div
            className="absolute bottom-0 -left-6 w-36 h-36 rounded-full opacity-30"
            style={{ background: 'radial-gradient(circle, rgba(212,80,122,0.3) 0%, transparent 70%)', filter: 'blur(25px)' }}
          />

          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-white/30 font-medium mb-3">
            Prompt del día
          </p>
          <p
            className="text-[1.5rem] leading-[1.2] text-white/85 mb-6 max-w-[260px]"
            style={{ fontFamily: "'Libre Baskerville', serif" }}
          >
            {todayPrompt}
          </p>
          <button
            onClick={onNewEntry}
            className="liquid-glass flex items-center gap-2 px-5 py-3 rounded-full text-[0.85rem] font-medium text-white/80 transition-all active:scale-95"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            Escribir ahora
          </button>
        </div>
      </div>

      {/* Filter pills */}
      <div className="px-6 pb-4 relative z-10">
        <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="shrink-0 px-4 py-2 rounded-full text-[0.78rem] font-medium transition-all active:scale-95"
              style={{
                background: activeFilter === f ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.04)',
                color: activeFilter === f ? '#050508' : 'rgba(255,255,255,0.3)',
                border: activeFilter === f ? 'none' : '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Entries grid */}
      <div className="px-4 relative z-10">
        <div className="grid grid-cols-2 gap-3">
          {entries.map((entry) => (
            <button
              key={entry.id}
              className="relative aspect-square text-left rounded-[20px] overflow-hidden transition-all duration-200 active:scale-[0.96]"
              style={{
                background: entry.gradient,
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), 0 4px 20px rgba(0,0,0,0.3)',
              }}
            >
              {/* Blur blobs */}
              <div
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-40"
                style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)', filter: 'blur(20px)' }}
              />
              <div
                className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full opacity-30"
                style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)', filter: 'blur(16px)' }}
              />

              {/* Glass overlay */}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(5,5,8,0.3) 60%, rgba(5,5,8,0.6) 100%)' }}
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-between h-full p-4">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    {entry.mood && (
                      <span className="w-2 h-2 rounded-full" style={{ background: entry.mood.color, boxShadow: `0 0 6px ${entry.mood.color}` }} />
                    )}
                    <span className="text-[0.65rem] font-medium text-white/50">{entry.mood?.label}</span>
                  </div>
                  <span className="text-[0.6rem] text-white/30">
                    {entry.date.toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })}
                  </span>
                </div>

                <p className="text-[0.8rem] leading-[1.35] text-white/75 line-clamp-3">
                  {entry.text}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tab bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-20 flex items-center justify-around px-6 pt-2.5 pb-8"
        style={{
          background: 'rgba(5, 5, 8, 0.85)',
          backdropFilter: 'blur(24px)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
        }}
      >
        <button className="flex flex-col items-center gap-0.5 px-3">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M3 9L11 3L19 9V19C19 19.55 18.55 20 18 20H4C3.45 20 3 19.55 3 19V9Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
          </svg>
          <span className="text-[0.6rem] font-medium text-white/60">Inicio</span>
        </button>
        <button className="flex flex-col items-center gap-0.5 px-3">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="11" r="8" stroke="white" strokeWidth="1.5" opacity="0.2" />
            <path d="M11 7V11L14 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
          </svg>
          <span className="text-[0.6rem] text-white/20">Timeline</span>
        </button>
        <button
          onClick={onNewEntry}
          className="liquid-glass flex items-center justify-center w-12 h-12 rounded-full -mt-6 transition-all active:scale-95"
          style={{
            background: 'rgba(255,255,255,0.9)',
            boxShadow: '0 4px 20px rgba(255,255,255,0.1), 0 0 40px rgba(212,80,122,0.1)',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4V16M4 10H16" stroke="#050508" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <button className="flex flex-col items-center gap-0.5 px-3">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="10" cy="10" r="7" stroke="white" strokeWidth="1.5" opacity="0.2" />
            <path d="M19 19L15.5 15.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
          </svg>
          <span className="text-[0.6rem] text-white/20">Buscar</span>
        </button>
        <button className="flex flex-col items-center gap-0.5 px-3">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M11 3L13.1 8.5L19 9.2L14.8 13L16 19L11 16L6 19L7.2 13L3 9.2L8.9 8.5L11 3Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" opacity="0.2" />
          </svg>
          <span className="text-[0.6rem] text-white/20">Recuerdos</span>
        </button>
      </div>
    </div>
  )
}
