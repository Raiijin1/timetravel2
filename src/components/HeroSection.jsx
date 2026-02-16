const heroVideo =
  'https://cdn.coverr.co/videos/coverr-earth-from-space-1579/1080p.mp4'

function HeroSection({ onPrimaryCta }) {
  return (
    <section id="hero" className="relative isolate overflow-hidden">
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-30"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#06090f]/80 via-[#06090f]/70 to-[#090c13]" />

      <div className="mx-auto max-w-6xl px-4 pb-20 pt-24 md:pb-28 md:pt-32">
        <p className="animate-fade-in text-xs uppercase tracking-[0.4em] text-amber-200/85">
          Agence de voyage temporel premium
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-white md:text-6xl">
          Explorez les epoques legendaires avec une experience immersive guidee par IA
        </h1>
        <p className="mt-6 max-w-2xl text-base text-slate-200 md:text-lg">
          De la Belle Epoque au Cretace, notre equipe orchestre des itineraires exclusifs et securises
          pour des voyageurs curieux, exigeants et passionnes d histoire.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-900 transition duration-300 hover:-translate-y-0.5 hover:bg-amber-300"
            onClick={onPrimaryCta}
          >
            Reserver mon voyage
          </button>
          <a
            href="#destinations"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-amber-200/60 hover:text-amber-100"
          >
            Voir les destinations
          </a>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
