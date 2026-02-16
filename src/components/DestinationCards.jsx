function DestinationCards({ destinations, selectedDestinationId, onSelectDestination }) {
  return (
    <section id="destinations" className="mx-auto max-w-6xl px-4 py-14">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-amber-200/80">Nos voyages signatures</p>
        <h2 className="mt-2 text-3xl font-semibold text-white md:text-4xl">Trois epoques, trois emotions</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {destinations.map((destination) => {
          const isSelected = destination.id === selectedDestinationId

          return (
            <article
              key={destination.id}
              className={`group overflow-hidden rounded-2xl border transition duration-300 ${
                isSelected
                  ? 'border-amber-300/60 bg-white/10 shadow-[0_20px_60px_-20px_rgba(251,191,36,0.45)]'
                  : 'border-white/10 bg-white/5 hover:-translate-y-1 hover:border-amber-100/35'
              }`}
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-xs tracking-wide text-amber-100">
                  {destination.period}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-semibold text-white">{destination.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-200">{destination.shortDescription}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm font-semibold text-amber-200">{destination.priceFrom}</span>
                  <button
                    type="button"
                    className="rounded-lg border border-white/20 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:border-amber-200/55 hover:text-amber-100"
                    onClick={() => onSelectDestination(destination.id)}
                  >
                    {isSelected ? 'Selectionnee' : 'Decouvrir'}
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default DestinationCards
