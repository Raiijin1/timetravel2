import { useMemo, useState } from 'react'

function buildContext(destinations) {
  return destinations
    .map(
      (destination) =>
        `${destination.name} (${destination.period}) - ${destination.shortDescription} - Tarif: ${destination.priceFrom}`,
    )
    .join('\n')
}

function ChatWidget({ destinations, selectedDestination }) {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim() || ''
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        'Bienvenue chez TimeTravel Agency. Je peux vous conseiller une destination, des tarifs et des idees de sejour.',
    },
  ])

  const destinationContext = useMemo(() => buildContext(destinations), [destinations])

  const sendMessage = async () => {
    const message = inputValue.trim()
    if (!message || isLoading) return

    const nextMessages = [...messages, { role: 'user', content: message }]
    setMessages(nextMessages)
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await fetch(`${apiBaseUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          selectedDestination: selectedDestination.name,
          destinationContext,
          history: nextMessages.slice(-8),
        }),
      })

      if (!response.ok) {
        throw new Error('La reponse du serveur IA est invalide.')
      }

      const payload = await response.json()
      const answer = payload?.answer || 'Je rencontre un probleme technique temporaire.'
      setMessages((previous) => [...previous, { role: 'assistant', content: answer }])
    } catch {
      setMessages((previous) => [
        ...previous,
        {
          role: 'assistant',
          content:
            'Le service IA est indisponible pour le moment. Vous pouvez tout de meme choisir une destination et reserver.',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <button
        type="button"
        aria-label="Ouvrir le chatbot"
        className="fixed bottom-6 right-6 z-50 rounded-full bg-amber-400 p-4 text-2xl text-slate-900 shadow-2xl transition hover:scale-105 hover:bg-amber-300"
        onClick={() => setIsOpen((previous) => !previous)}
      >
        💬
      </button>

      {isOpen && (
        <section className="fixed bottom-24 right-4 z-50 flex h-[32rem] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d1422] shadow-2xl">
          <header className="border-b border-white/10 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.25em] text-emerald-200/80">Assistant IA</p>
            <h3 className="mt-1 text-sm font-semibold text-white">Votre guide TimeTravel Agency</h3>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {messages.map((messageItem, index) => (
              <div
                key={`${messageItem.role}-${index}`}
                className={`max-w-[92%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                  messageItem.role === 'user'
                    ? 'ml-auto bg-amber-300 text-slate-900'
                    : 'bg-white/10 text-slate-100'
                }`}
              >
                {messageItem.content}
              </div>
            ))}
            {isLoading && <p className="text-xs text-slate-400">L assistant redige sa recommandation...</p>}
          </div>

          <div className="border-t border-white/10 p-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    sendMessage()
                  }
                }}
                placeholder="Posez-moi vos questions sur les voyages temporels..."
                className="w-full rounded-lg border border-white/15 bg-black/20 px-3 py-2 text-sm text-white outline-none ring-amber-300/40 placeholder:text-slate-400 focus:ring-2"
              />
              <button
                type="button"
                onClick={sendMessage}
                className="rounded-lg bg-amber-400 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-900 hover:bg-amber-300"
              >
                Envoyer
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default ChatWidget
