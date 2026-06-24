import { useState } from 'react'

const intentions = [
  { id: 'reflection', label: 'Reflexión personal', desc: 'Procesar emociones y pensamientos' },
  { id: 'travel', label: 'Viajes y aventuras', desc: 'Documentar lugares y experiencias' },
  { id: 'creativity', label: 'Expresión creativa', desc: 'Escribir libremente, sin reglas' },
  { id: 'gratitude', label: 'Gratitud diaria', desc: 'Registrar lo bueno de cada día' },
  { id: 'memories', label: 'Archivo de recuerdos', desc: 'Preservar momentos importantes' },
]

const themes = [
  { id: 'crimson', name: 'Carmesí', colors: ['#050508', '#E63946', '#F0F2F5'] },
  { id: 'ocean', name: 'Océano', colors: ['#050508', '#2B8FD4', '#A8D8EA'] },
  { id: 'aurora', name: 'Aurora', colors: ['#050508', '#D4507A', '#E8836B'] },
  { id: 'night', name: 'Nocturno', colors: ['#050508', '#7A8BA8', '#F0F2F5'] },
]

interface OnboardingProps {
  onComplete: () => void
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0)
  const [selectedIntentions, setSelectedIntentions] = useState<string[]>([])
  const [privacy, setPrivacy] = useState({ biometrics: true, location: false, notifications: true })
  const [selectedTheme, setSelectedTheme] = useState('crimson')

  const totalSteps = 4

  const toggleIntention = (id: string) => {
    setSelectedIntentions(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const togglePrivacy = (key: keyof typeof privacy) => {
    setPrivacy(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const next = () => {
    if (step < totalSteps - 1) setStep(step + 1)
    else onComplete()
  }

  const back = () => {
    if (step > 0) setStep(step - 1)
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-hidden" style={{ background: '#050508' }}>
      {/* Ambient nebula */}
      {step !== 0 && (
        <>
          <div className="absolute w-[500px] h-[500px] rounded-full opacity-[0.1]" style={{ top: '-150px', right: '-200px', background: 'radial-gradient(circle, #D4507A 0%, #8B2252 40%, transparent 70%)', filter: 'blur(100px)' }} />
          <div className="absolute w-[400px] h-[400px] rounded-full opacity-[0.06]" style={{ bottom: '50px', left: '-150px', background: 'radial-gradient(circle, #E8836B 0%, #C14A3A 40%, transparent 70%)', filter: 'blur(80px)' }} />
        </>
      )}
      {step === 0 && (
        <>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${import.meta.env.BASE_URL}onboarding-bg.png)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.6,
            }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg, rgba(5,5,8,0.7) 0%, rgba(5,5,8,0.2) 25%, rgba(5,5,8,0.15) 45%, rgba(5,5,8,0.5) 75%, rgba(5,5,8,0.95) 100%)' }}
          />
        </>
      )}

      {/* Skip button */}
      <div className="relative z-10 flex justify-end px-6 pt-14 pb-2">
        <button
          onClick={onComplete}
          className="text-sm text-white/30 transition-colors hover:text-white/60"
        >
          Empezar ya
        </button>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 py-4">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className="h-1.5 rounded-full transition-all duration-500"
            style={{
              width: i === step ? 24 : 6,
              backgroundColor: i === step ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.1)',
            }}
          />
        ))}
      </div>

      {/* Content area */}
      <div className="flex-1 flex flex-col px-6 pb-8">
        {/* Step 0: Welcome */}
        {step === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-rise relative z-10">
              <h1
                className="text-[2.2rem] leading-[1.05] tracking-[-1px] text-white mb-4"
                style={{ fontFamily: "'Libre Baskerville', serif" }}
              >
                Bienvenida a diari
              </h1>
              <p className="text-[0.95rem] leading-relaxed text-white/45 max-w-[300px]">
                Tu espacio íntimo para escribir, recordar y redescubrir los momentos que importan.
              </p>
              <div className="mt-10 flex flex-col items-center gap-2.5">
                <div className="flex items-center gap-2.5 text-xs text-white/35">
                  <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.3)' }} />
                  Sin cuentas. Sin contraseñas.
                </div>
                <div className="flex items-center gap-2.5 text-xs text-white/35">
                  <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.3)' }} />
                  Tus datos viven en tu dispositivo.
                </div>
                <div className="flex items-center gap-2.5 text-xs text-white/35">
                  <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.3)' }} />
                  Privado por diseño.
                </div>
              </div>
          </div>
        )}

        {/* Step 1: Intentions */}
        {step === 1 && (
          <div className="flex-1 flex flex-col animate-fade-rise">
            <h2
              className="text-[1.8rem] leading-[1.1] tracking-[-0.5px] text-white mb-2"
              style={{ fontFamily: "'Libre Baskerville', serif" }}
            >
              ¿Qué te trae por acá?
            </h2>
            <p className="text-sm text-white/35 mb-6">
              Elegí una o varias. Esto personaliza tus prompts.
            </p>
            <div className="flex flex-col gap-3">
              {intentions.map(({ id, label, desc }) => {
                const selected = selectedIntentions.includes(id)
                return (
                  <button
                    key={id}
                    onClick={() => toggleIntention(id)}
                    className="relative flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-200 active:scale-[0.98] overflow-hidden"
                    style={{
                      background: selected
                        ? 'rgba(255,255,255,0.08)'
                        : 'rgba(255,255,255,0.03)',
                      boxShadow: selected
                        ? 'inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(255,255,255,0.04)'
                        : 'inset 0 1px 0 rgba(255,255,255,0.06)',
                      border: selected
                        ? '1px solid rgba(255,255,255,0.15)'
                        : '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <div className="flex-1">
                      <div className="text-[0.95rem] font-medium text-white/85">{label}</div>
                      <div className="text-xs text-white/30 mt-0.5">{desc}</div>
                    </div>
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center transition-all"
                      style={{
                        border: selected ? 'none' : '1.5px solid rgba(255,255,255,0.15)',
                        background: selected ? 'rgba(255,255,255,0.9)' : 'transparent',
                      }}
                    >
                      {selected && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="#050508" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Step 2: Privacy */}
        {step === 2 && (
          <div className="flex-1 flex flex-col animate-fade-rise">
            <h2
              className="text-[1.8rem] leading-[1.1] tracking-[-0.5px] text-white mb-2"
              style={{ fontFamily: "'Libre Baskerville', serif" }}
            >
              Tu privacidad, tus reglas
            </h2>
            <p className="text-sm text-white/35 mb-6">
              Configurá cómo proteger tu diario. Podés cambiar esto después.
            </p>
            <div className="flex flex-col gap-4">
              {[
                {
                  key: 'biometrics' as const,
                  title: 'Bloqueo biométrico',
                  desc: 'Protegé el acceso con Face ID o Touch ID',
                  recommended: true,
                },
                {
                  key: 'location' as const,
                  title: 'Ubicación',
                  desc: 'Recordá dónde escribiste cada entrada',
                  recommended: false,
                },
                {
                  key: 'notifications' as const,
                  title: 'Recordatorios',
                  desc: 'Un empujoncito diario para escribir',
                  recommended: true,
                },
              ].map(({ key, title, desc, recommended }) => (
                <div
                  key={key}
                  className="flex items-center gap-4 p-4 rounded-2xl"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[0.9rem] font-medium text-white/85">{title}</span>
                      {recommended && (
                        <span className="text-[0.55rem] uppercase tracking-wider font-medium px-1.5 py-0.5 rounded-full whitespace-nowrap" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}>
                          recomendado
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-white/30 mt-0.5">{desc}</div>
                  </div>
                  <button
                    onClick={() => togglePrivacy(key)}
                    className="relative w-12 h-7 rounded-full transition-all duration-300 shrink-0"
                    style={{
                      background: privacy[key] ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.08)',
                      boxShadow: privacy[key] ? '0 0 12px rgba(255,255,255,0.15)' : 'none',
                    }}
                  >
                    <div
                      className="absolute top-0.5 w-6 h-6 rounded-full shadow-sm transition-all duration-300"
                      style={{
                        left: privacy[key] ? 'calc(100% - 1.625rem)' : '0.125rem',
                        background: privacy[key] ? '#050508' : 'rgba(255,255,255,0.4)',
                      }}
                    />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <p className="text-xs text-white/40 leading-relaxed">
                <span className="font-medium text-white/60">100% local.</span>{' '}
                Tus entradas se guardan únicamente en este dispositivo. Ni nosotros podemos leerlas.
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Theme + First entry */}
        {step === 3 && (
          <div className="flex-1 flex flex-col animate-fade-rise">
            <h2
              className="text-[1.8rem] leading-[1.1] tracking-[-0.5px] text-white mb-2"
              style={{ fontFamily: "'Libre Baskerville', serif" }}
            >
              Elegí tu estética
            </h2>
            <p className="text-sm text-white/35 mb-6">
              Tu diario, tu estilo. Podés cambiarlo cuando quieras.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {themes.map(({ id, name, colors }) => {
                const selected = selectedTheme === id
                return (
                  <button
                    key={id}
                    onClick={() => setSelectedTheme(id)}
                    className="flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-200 active:scale-[0.97]"
                    style={{
                      background: selected ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
                      border: selected ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(255,255,255,0.06)',
                      boxShadow: selected ? 'inset 0 1px 0 rgba(255,255,255,0.15)' : 'inset 0 1px 0 rgba(255,255,255,0.04)',
                    }}
                  >
                    <div className="flex gap-1.5">
                      {colors.map((c, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full"
                          style={{
                            backgroundColor: c,
                            border: '1px solid rgba(255,255,255,0.12)',
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-white/70 font-medium">{name}</span>
                    {selected && (
                      <span className="text-[0.6rem] uppercase tracking-wider text-white/40">
                        seleccionado
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            <div className="flex-1 flex flex-col items-center justify-end text-center">
              <p
                className="text-[1.3rem] leading-snug text-white/30 italic max-w-[260px] mb-2"
                style={{ fontFamily: "'Libre Baskerville', serif" }}
              >
                "¿Qué te hizo sonreír hoy?"
              </p>
              <p className="text-xs text-white/20">
                Tu primer prompt te está esperando
              </p>
            </div>
          </div>
        )}

        {/* Bottom navigation */}
        <div className="flex items-center gap-3 mt-8">
          {step > 0 && (
            <button
              onClick={back}
              className="liquid-glass w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-95"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12 5L7 10L12 15" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
              </svg>
            </button>
          )}
          <button
            onClick={next}
            className="flex-1 rounded-full py-4 text-[0.95rem] text-black font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            style={{
              background: 'rgba(255,255,255,0.92)',
              boxShadow: '0 4px 20px rgba(255,255,255,0.08), 0 0 40px rgba(212,80,122,0.08)',
            }}
          >
            {step === totalSteps - 1 ? 'Escribir mi primera entrada' : 'Continuar'}
          </button>
        </div>
      </div>
    </div>
  )
}
