import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8787

app.use(cors())
app.use(express.json({ limit: '1mb' }))

function getSystemPrompt(destinationContext, selectedDestination) {
  return `Tu es l assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe.
Tu conseilles les clients sur destinations, prix, FAQ et itineraires.
Ton ton: professionnel, chaleureux, enthousiaste et credible.

Destinations officielles:
${destinationContext}

Destination actuellement selectionnee par l utilisateur: ${selectedDestination}.

Regles:
- Reste coherent avec ces destinations.
- Si on te demande les prix, propose des tarifs realistes premium.
- Si une information manque, propose une recommandation claire au lieu d inventer des details dangereux.
- Reponses courtes, claires, actionnables (4-8 phrases max).`
}

async function callGroq(systemPrompt, history, message) {
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    throw new Error('GROQ_API_KEY manquante')
  }

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL || 'llama-3.1-8b-instant',
      temperature: 0.7,
      messages: [
        { role: 'system', content: systemPrompt },
        ...history.map((messageItem) => ({ role: messageItem.role, content: messageItem.content })),
        { role: 'user', content: message },
      ],
    }),
  })

  if (!response.ok) {
    const details = await response.text()
    throw new Error(`Groq API error: ${details}`)
  }

  const payload = await response.json()
  return payload?.choices?.[0]?.message?.content
}

async function callMistral(systemPrompt, history, message) {
  const apiKey = process.env.MISTRAL_API_KEY
  if (!apiKey) {
    throw new Error('MISTRAL_API_KEY manquante')
  }

  const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.MISTRAL_MODEL || 'mistral-small-latest',
      temperature: 0.7,
      messages: [
        { role: 'system', content: systemPrompt },
        ...history.map((messageItem) => ({ role: messageItem.role, content: messageItem.content })),
        { role: 'user', content: message },
      ],
    }),
  })

  if (!response.ok) {
    const details = await response.text()
    throw new Error(`Mistral API error: ${details}`)
  }

  const payload = await response.json()
  return payload?.choices?.[0]?.message?.content
}

function getLocalAssistantResponse(message, selectedDestination = '') {
  const text = message.toLowerCase()
  const selected = selectedDestination.toLowerCase()

  if (text.includes('prix') || text.includes('tarif') || text.includes('cout')) {
    return 'Nos tarifs debutent a 3 900 EUR pour Paris 1889, 4 400 EUR pour Florence 1504 et 5 600 EUR pour le Cretace. Je peux vous recommander l option la plus adaptee a votre budget et vos centres d interet.'
  }

  if (text.includes('conseil') || text.includes('recommande') || text.includes('choisir')) {
    return 'Si vous aimez l art et l histoire, Florence 1504 est ideale. Pour une ambiance elegante et urbaine, Paris 1889 est un excellent choix. Pour une experience aventure nature, le Cretace est la destination la plus immersive.'
  }

  if (text.includes('faq') || text.includes('securite') || text.includes('risque')) {
    return 'Toutes nos expeditions sont encadrees par des guides certifies avec protocole de securite temporelle. Avant depart, vous recevez un briefing complet et un kit de protection adapte a l epoque choisie.'
  }

  if (text.includes('paris') || selected.includes('paris')) {
    return 'Paris 1889 vous plonge au coeur de l Exposition Universelle, avec la Tour Eiffel toute nouvelle et une atmosphere Belle Epoque exceptionnelle.'
  }

  if (text.includes('florence') || selected.includes('florence')) {
    return 'Florence 1504 est parfaite pour les passionnes d art et d architecture, avec des parcours autour des maitres de la Renaissance.'
  }

  if (text.includes('cretace') || text.includes('dino') || selected.includes('cretace')) {
    return 'Le Cretace propose une experience aventure premium en milieu prehistorique, avec observation encadree de la faune et protocoles de securite renforces.'
  }

  return 'Je peux vous aider a choisir entre Paris 1889, Florence 1504 et le Cretace, comparer les tarifs, et preparer votre reservation. Dites-moi votre style de voyage ideal.'
}

app.get('/api/health', (_request, response) => {
  response.json({ ok: true })
})

app.post('/api/chat', async (request, response) => {
  const { message, history = [], destinationContext = '', selectedDestination = 'Non specifiee' } = request.body ?? {}

  if (!message || typeof message !== 'string') {
    response.status(400).json({ error: 'Message requis' })
    return
  }

  const safeHistory = Array.isArray(history) ? history.slice(-8) : []
  const systemPrompt = getSystemPrompt(destinationContext, selectedDestination)

  try {
    const provider = process.env.LLM_PROVIDER || 'groq'
    const hasGroq = Boolean(process.env.GROQ_API_KEY)
    const hasMistral = Boolean(process.env.MISTRAL_API_KEY)

    if ((provider === 'groq' && !hasGroq) || (provider === 'mistral' && !hasMistral)) {
      response.json({ answer: getLocalAssistantResponse(message, selectedDestination) })
      return
    }

    const answer =
      provider === 'mistral'
        ? await callMistral(systemPrompt, safeHistory, message)
        : await callGroq(systemPrompt, safeHistory, message)

    response.json({
      answer:
        answer ||
        'Je vous recommande de commencer par Paris 1889 pour une premiere experience elegante et culturelle.',
    })
  } catch (error) {
    response.status(500).json({
      error: 'Erreur service IA',
      answer: getLocalAssistantResponse(message, selectedDestination),
      details: error.message,
    })
  }
})

app.listen(PORT, () => {
  console.log(`TimeTravel chat API running on http://localhost:${PORT}`)
})
