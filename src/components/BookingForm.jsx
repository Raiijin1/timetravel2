import { useState } from 'react'

function BookingForm({ destinations, defaultDestinationId, compact = false, onSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    destinationId: defaultDestinationId ?? destinations[0].id,
    departureDate: '',
    travelers: 1,
  })
  const [message, setMessage] = useState('')

  const onChange = (field) => (event) => {
    setFormData((previous) => ({ ...previous, [field]: event.target.value }))
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if (!formData.fullName || !formData.email || !formData.departureDate) {
      setMessage('Merci de completer les champs obligatoires.')
      return
    }

    const selected = destinations.find((destination) => destination.id === formData.destinationId)
    setMessage(
      `Merci ${formData.fullName}, votre demande pour ${selected?.name ?? 'la destination'} a ete enregistree.`,
    )
    onSuccess?.()
  }

  return (
    <form onSubmit={onSubmit} className={`rounded-2xl border border-white/10 bg-white/5 ${compact ? 'p-4' : 'p-6'}`}>
      {!compact && (
        <>
          <p className="text-xs uppercase tracking-[0.25em] text-amber-200/80">Reservation</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">Planifiez votre expedition temporelle</h3>
        </>
      )}

      <div className={`mt-5 grid gap-4 ${compact ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
        <label className="text-sm text-slate-200">
          Nom complet*
          <input
            type="text"
            value={formData.fullName}
            onChange={onChange('fullName')}
            className="mt-1 w-full rounded-lg border border-white/15 bg-black/20 px-3 py-2 text-sm text-white outline-none ring-amber-300/40 focus:ring-2"
          />
        </label>

        <label className="text-sm text-slate-200">
          Email*
          <input
            type="email"
            value={formData.email}
            onChange={onChange('email')}
            className="mt-1 w-full rounded-lg border border-white/15 bg-black/20 px-3 py-2 text-sm text-white outline-none ring-amber-300/40 focus:ring-2"
          />
        </label>

        <label className="text-sm text-slate-200">
          Destination
          <select
            value={formData.destinationId}
            onChange={onChange('destinationId')}
            className="mt-1 w-full rounded-lg border border-white/15 bg-black/20 px-3 py-2 text-sm text-white outline-none ring-amber-300/40 focus:ring-2"
          >
            {destinations.map((destination) => (
              <option key={destination.id} value={destination.id}>
                {destination.name}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm text-slate-200">
          Date de depart*
          <input
            type="date"
            value={formData.departureDate}
            onChange={onChange('departureDate')}
            className="mt-1 w-full rounded-lg border border-white/15 bg-black/20 px-3 py-2 text-sm text-white outline-none ring-amber-300/40 focus:ring-2"
          />
        </label>

        <label className="text-sm text-slate-200">
          Voyageurs
          <input
            type="number"
            min="1"
            max="6"
            value={formData.travelers}
            onChange={onChange('travelers')}
            className="mt-1 w-full rounded-lg border border-white/15 bg-black/20 px-3 py-2 text-sm text-white outline-none ring-amber-300/40 focus:ring-2"
          />
        </label>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          className="rounded-lg bg-amber-400 px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-amber-300"
        >
          Envoyer ma demande
        </button>
        {message && <p className="text-sm text-emerald-200">{message}</p>}
      </div>
    </form>
  )
}

export default BookingForm
