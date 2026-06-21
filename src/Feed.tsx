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

const moodGradients: Record<string, string> = {
  grateful: 'linear-gradient(135deg, #D4507A 0%, #E8836B 50%, #C14A3A 100%)',
  thoughtful: 'linear-gradient(135deg, #3A4A6B 0%, #5A6B8A 50%, #7A8BA8 100%)',
  excited: 'linear-gradient(135deg, #E8836B 0%, #D4507A 50%, #C14A3A 100%)',
  calm: 'linear-gradient(135deg, #4A5A7B 0%, #5A6B8A 50%, #7A8BA8 100%)',
  happy: 'linear-gradient(135deg, #E8836B 0%, #D4A07B 50%, #C4956A 100%)',
  sad: 'linear-gradient(135deg, #2A3A5B 0%, #3A4A6B 50%, #5A6B8A 100%)',
  default: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)',
}

const sampleEntries: Entry[] = [
  {
    id: '3',
    date: new Date(2026, 5, 15, 16, 42),
    text: 'Hoy fue un día hermoso. Caminé por el parque y vi cómo las hojas empezaban a cambiar de color. Me sentí viva.',
    mood: { label: 'Agradecida', color: '#D4507A' },
    photos: [],
    location: 'Palermo, Buenos Aires',
    wordCount: 22,
    gradient: moodGradients.grateful,
  },
  {
    id: '2',
    date: new Date(2026, 5, 14, 22, 15),
    text: 'No puedo dormir. Hay algo que me inquieta pero no logro identificar qué es. Tal vez mañana, con la luz del día, se aclare.',
    mood: { label: 'Pensativa', color: '#7A8BA8' },
    photos: [],
    wordCount: 26,
    gradient: moodGradients.thoughtful,
  },
  {
    id: '1',
    date: new Date(2026, 5, 13, 9, 30),
    text: 'Primera entrada en mi diario. Decidí que este va a ser mi espacio seguro, mi rincón. Voy a escribir sin filtros.',
    mood: { label: 'Emocionada', color: '#E8836B' },
    photos: [],
    wordCount: 21,
    gradient: moodGradients.excited,
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

  const formatDate = (date: Date) => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    if (date.toDateString() === today.toDateString()) return 'Hoy'
    if (date.toDateString() === yesterday.toDateString()) return 'Ayer'
    return date.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'short' })
  }

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })

  const groupByDate = (items: Entry[]) => {
    const groups: { label: string; entries: Entry[] }[] = []
    let currentLabel = ''
    for (const entry of items) {
      const label = formatDate(entry.date)
      if (label !== currentLabel) {
        groups.push({ label, entries: [entry] })
        currentLabel = label
      } else {
        groups[groups.length - 1].entries.push(entry)
      }
    }
    return groups
  }

  const grouped = groupByDate(entries)
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

      {/* Entries feed */}
      <div className="px-6 relative z-10">
        {grouped.map((group) => (
          <div key={group.label} className="mb-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[0.7rem] font-medium text-white/20 uppercase tracking-widest">{group.label}</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.04)' }} />
            </div>
            <div className="flex flex-col gap-3">
              {group.entries.map((entry) => (
                <button
                  key={entry.id}
                  className="w-full text-left rounded-3xl overflow-hidden transition-all duration-200 active:scale-[0.98]"
                  style={{
                    border: '1px solid rgba(255,255,255,0.06)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
                  }}
                >
                  {/* Gradient top section */}
                  <div
                    className="relative px-5 pt-4 pb-3"
                    style={{ background: entry.gradient }}
                  >
                    {/* Blur blob */}
                    <div
                      className="absolute top-0 right-0 w-28 h-28 rounded-full opacity-25"
                      style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)', filter: 'blur(15px)' }}
                    />
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-2">
                        {entry.mood && (
                          <span className="w-2.5 h-2.5 rounded-full" style={{ background: entry.mood.color }} />
                        )}
                        <span className="text-[0.75rem] font-medium text-white/60">{entry.mood?.label}</span>
                      </div>
                      <span className="text-[0.7rem] text-white/35">{formatTime(entry.date)}</span>
                    </div>
                  </div>

                  {/* Dark content section */}
                  <div
                    className="px-5 pt-3 pb-4"
                    style={{ background: 'rgba(5,5,8,0.75)', backdropFilter: 'blur(8px)' }}
                  >
                    <p className="text-[0.88rem] leading-relaxed text-white/50 line-clamp-2">
                      {entry.text}
                    </p>
                    {entry.location && (
                      <div className="flex items-center gap-1 mt-2.5 text-[0.65rem] text-white/20">
                        <svg width="8" height="10" viewBox="0 0 8 10" fill="none">
                          <path d="M4 0C1.8 0 0 1.7 0 3.8C0 6.7 4 10 4 10S8 6.7 8 3.8C8 1.7 6.2 0 4 0Z" fill="currentColor" opacity="0.4" />
                        </svg>
                        {entry.location}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
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
