# TimeTravel Agency - Webapp Interactive

Webapp moderne pour une agence de voyage temporel fictive, avec interface immersive, destinations interactives et assistant conversationnel IA.

## Liens du projet

- Frontend (production): `A_COMPLETER_URL_VERCEL`
- API (Render): `https://timetravel-ilkw.onrender.com`
- API healthcheck: `https://timetravel-ilkw.onrender.com/api/health`
- Repository GitHub: `https://github.com/Nicooo67/TimeTravel.git`

## Membres de l equipe

GATER Marius

## Stack technique

- Frontend: React + Vite + Tailwind CSS
- Backend API chat: Node.js + Express
- IA conversationnelle: Groq (par defaut) ou Mistral (option)
- Deploiement recommande: Vercel (frontend) + Render/Railway (API)

## Architecture

- Interface client React (single-page) avec sections: Hero -> Destinations -> Chat -> Reservation
- API Express dediee au chatbot (`/api/chat`, `/api/health`)
- Orchestrateur IA cote serveur avec prompt systeme metier
- Fallback local intelligent si aucune cle IA n est configuree

## Features implementees

- Landing page immersive avec hero video et CTA
- Galerie de 3 destinations temporelles:
  - Paris 1889
  - Cretace -65M
  - Florence 1504
- Cartes interactives avec selection et details enrichis
- Chatbot IA en widget flottant (bas droite), style coherent theme sombre
- Formulaire de reservation avec validation de base
- UI responsive mobile-first
- Lazy loading des images de destinations

## IA utilisees (transparence)

- Generation/assistance code: Cursor
- Agent conversationnel: API LLM (Groq ou Mistral)
- Visuels destinations: placeholders Unsplash (a remplacer par les assets du Projet 1)
- Prompt engineering: consignes de ton, coherence historique et recommandations personnalisees

## Installation locale

### 1) Prerequis

- Node.js 18+ (recommande: Node 20)
- npm

### 2) Installer les dependances

```bash
npm install
```

### 3) Configurer les variables d environnement

Copier `.env.example` vers `.env` puis renseigner vos cles:

```bash
cp .env.example .env
```

### 4) Lancer l application

Terminal A (frontend):

```bash
npm run dev
```

Terminal B (API chatbot):

```bash
npm run dev:server
```

Frontend: `http://localhost:5173`  
API: `http://localhost:8787/api/health`

### Scripts npm

```bash
npm run dev         # frontend Vite
npm run dev:server  # backend chatbot Express
npm run build       # build production frontend
npm run lint        # verification ESLint
```

## Configuration production

- Le frontend appelle `VITE_API_BASE_URL + /api/chat`.
- En local, laissez `VITE_API_BASE_URL` vide (proxy Vite).
- En production, definissez `VITE_API_BASE_URL` vers votre backend deploye.

Exemple:

```env
VITE_API_BASE_URL=https://votre-api.onrender.com
```

## Deploiement rapide

### Option conseillee: Vercel (frontend) + Render (API)

1. Deploy API sur Render:
   - Creer un nouveau Web Service depuis ce repo.
   - Render detecte `render.yaml` automatiquement.
   - Ajouter au minimum `GROQ_API_KEY` (ou `MISTRAL_API_KEY`) dans les variables.
   - Verifier `https://votre-api.onrender.com/api/health`.

2. Deploy frontend sur Vercel:
   - Importer le meme repo.
   - Build command: `npm run build`
   - Output dir: `dist`
   - Ajouter la variable Vercel:
     - `VITE_API_BASE_URL=https://votre-api.onrender.com`

3. Re-deployer le frontend puis tester:
   - navigation
   - selection destination
   - chatbot
   - formulaire

## Checklist livraison Moodle

- URL publique de la webapp
- Repo GitHub (ou export du code)
- `README.md` complet
- Noms et prenoms des 4 membres sur tous les livrables
- Depot individuel par chaque membre

## Prompt systeme du chatbot

Le chatbot est configure pour:

- Conseiller les destinations selon les preferences utilisateur
- Repondre aux questions de prix (coherentes premium)
- Repondre aux FAQ agence
- Garder un ton professionnel, chaleureux et passionne d histoire

## Credits

- APIs LLM: Groq / Mistral
- Images placeholders: Unsplash
- Video hero: Coverr
- Frameworks: React, Vite, Tailwind CSS, Express

## Licence

Projet pedagogique - TimeTravel Agency (M1/M2 Digital & IA)
