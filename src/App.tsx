import { useState, useRef, useEffect, useCallback } from 'react'
import Onboarding from './Onboarding'
import EntryEditor from './EntryEditor'
import Feed from './Feed'
import './App.css'

type Screen = 'hero' | 'onboarding' | 'feed' | 'editor'

function App() {
  const [screen, setScreen] = useState<Screen>('hero')
  const videoRef = useRef<HTMLVideoElement>(null)

  const tryPlay = useCallback(() => {
    const v = videoRef.current
    if (v && v.paused) {
      v.muted = true
      v.play().catch(() => {})
    }
  }, [])

  useEffect(() => {
    tryPlay()
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') tryPlay()
    })
    window.addEventListener('focus', tryPlay)
    document.addEventListener('touchstart', tryPlay, { once: true })
    return () => {
      window.removeEventListener('focus', tryPlay)
    }
  }, [tryPlay])

  if (screen === 'onboarding') {
    return <Onboarding onComplete={() => setScreen('editor')} />
  }

  if (screen === 'editor') {
    return <EntryEditor onClose={() => setScreen('feed')} initialPrompt="¿Qué te hizo sonreír hoy?" />
  }

  if (screen === 'feed') {
    return <Feed onNewEntry={() => setScreen('editor')} />
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col" style={{ background: '#050508' }}>
      {/* Video — absolute, covers top portion */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute top-0 left-0 w-full object-cover animate-soft-zoom origin-center z-0"
        style={{ height: '100vh', objectPosition: 'center 52%', filter: 'saturate(1.2) brightness(0.7)' }}
        onLoadedData={tryPlay}
      >
        <source src={`${import.meta.env.BASE_URL}hero-bg.mp4`} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div
        className="absolute top-0 left-0 right-0 z-[1]"
        style={{
          height: '100vh',
          background: 'linear-gradient(180deg, rgba(5,5,8,0.3) 0%, rgba(5,5,8,0.15) 30%, rgba(5,5,8,0.4) 70%, rgba(5,5,8,1) 100%)',
        }}
      />

      {/* Ambient nebula glows */}
      <div className="absolute z-[2] w-[400px] h-[400px] rounded-full opacity-[0.12] animate-float" style={{ top: '55vh', left: '-120px', background: 'radial-gradient(circle, #D4507A 0%, #8B2252 40%, transparent 70%)', filter: 'blur(80px)' }} />
      <div className="absolute z-[2] w-[350px] h-[350px] rounded-full opacity-[0.08]" style={{ top: '45vh', right: '-100px', background: 'radial-gradient(circle, #E8836B 0%, #C14A3A 40%, transparent 70%)', filter: 'blur(70px)' }} />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center px-6 pt-14 pb-4">
        <h1
          className="text-[1.5rem] tracking-tight text-white/90"
          style={{ fontFamily: "'Libre Baskerville', serif" }}
        >
          diari
        </h1>
      </nav>

      {/* Spacer — pushes content below video */}
      <div className="flex-1 min-h-[42vh]" />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center px-6 pb-12 text-center">
        <div className="max-w-sm mx-auto">
          <h2
            className="animate-fade-rise text-[2.4rem] leading-[1.05] tracking-[-0.8px] font-normal text-white"
            style={{ fontFamily: "'Libre Baskerville', serif" }}
          >
            Donde tus recuerdos encuentran su lugar.
          </h2>

          <p className="animate-fade-rise-delay text-[0.9rem] leading-relaxed mt-5 max-w-[280px] mx-auto text-white/50">
            Tu archivo de vida íntimo. Bello, privado y completamente tuyo.
          </p>

          <button
            onClick={() => setScreen('onboarding')}
            className="animate-fade-rise-delay-2 rounded-full w-full max-w-[280px] py-4 text-[0.95rem] text-black mt-8 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer font-medium"
            style={{
              background: 'rgba(255,255,255,0.92)',
              boxShadow: '0 4px 24px rgba(255,255,255,0.1), 0 0 60px rgba(212,80,122,0.15)',
            }}
          >
            Comenzar mi diario
          </button>

          <div className="animate-fade-rise-delay-3 mt-6 mb-2 flex items-center justify-center gap-3 text-xs text-white/25">
            <span className="h-px w-8" style={{ background: 'rgba(255,255,255,0.1)' }} />
            <span className="tracking-wide uppercase text-[0.65rem]">privado por diseño</span>
            <span className="h-px w-8" style={{ background: 'rgba(255,255,255,0.1)' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
