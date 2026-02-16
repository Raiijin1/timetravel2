import { useMemo, useState } from 'react'
import HeroSection from './components/HeroSection'
import DestinationCards from './components/DestinationCards'
import ChatWidget from './components/ChatWidget'
import BookingForm from './components/BookingForm'
import { destinations } from './data/destinations'

function App() {
  const [selectedDestinationId, setSelectedDestinationId] = useState(destinations[0].id)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const selectedDestination = useMemo(
    () => destinations.find((destination) => destination.id === selectedDestinationId) ?? destinations[0],
    [selectedDestinationId],
  )

  return (
    <div className="min-h-screen bg-[#090c13] text-[#e8ecf8]">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#090c13]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#hero" className="text-lg font-semibold tracking-wide text-amber-300">
            TimeTravel Agency
          </a>
          <nav className="hidden gap-5 text-sm md:flex">
            <a className="transition hover:text-amber-200" href="#destinations">
              Destinations
            </a>
            <a className="transition hover:text-amber-200" href="#chatbot">
              Assistant IA
            </a>
            <a className="transition hover:text-amber-200" href="#reservation">
              Reservation
            </a>
          </nav>
          <button
            type="button"
            className="rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-amber-300"
            onClick={() => setIsBookingOpen(true)}
          >
            Planifier
          </button>
        </div>
      </header>

      <main>
        <HeroSection onPrimaryCta={() => setIsBookingOpen(true)} />
        <DestinationCards
          destinations={destinations}
          selectedDestinationId={selectedDestinationId}
          onSelectDestination={setSelectedDestinationId}
        />

        <section id="details" className="mx-auto max-w-6xl px-4 py-14">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl md:p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-200/80">Focus destination</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">{selectedDestination.name}</h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-200">
              {selectedDestination.longDescription}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {selectedDestination.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="rounded-full border border-amber-200/25 bg-amber-300/10 px-3 py-1 text-xs text-amber-100"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="chatbot" className="mx-auto max-w-6xl px-4 py-8">
          <div className="rounded-2xl border border-emerald-100/20 bg-emerald-900/10 p-5 text-sm text-emerald-100">
            Assistant disponible 24/7: questions sur les epoques, tarifs, conseils et FAQ.
          </div>
        </section>

        <section id="reservation" className="mx-auto max-w-6xl px-4 pb-20 pt-8">
          <BookingForm destinations={destinations} onOpenChat={() => setIsBookingOpen(false)} />
        </section>
      </main>

      <footer className="border-t border-white/10 py-8 text-center text-sm text-slate-400">
        <p>TimeTravel Agency - Experiences temporelles premium</p>
      </footer>

      <ChatWidget destinations={destinations} selectedDestination={selectedDestination} />

      {isBookingOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/65 p-4">
          <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#0f1522] p-5 shadow-2xl">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold text-white">Reservation rapide</h3>
                <p className="text-sm text-slate-300">Pre-remplie pour {selectedDestination.name}</p>
              </div>
              <button
                type="button"
                className="rounded-lg border border-white/15 px-3 py-1 text-sm text-slate-300 hover:border-white/30 hover:text-white"
                onClick={() => setIsBookingOpen(false)}
              >
                Fermer
              </button>
            </div>
            <BookingForm
              destinations={destinations}
              defaultDestinationId={selectedDestination.id}
              compact
              onSuccess={() => setIsBookingOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
