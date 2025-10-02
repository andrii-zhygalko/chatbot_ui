# Chatbot UI - Test Case

![Chatbot UI Banner](https://repository-images.githubusercontent.com/1064890902/1f480b5c-471d-42c2-bf33-47a91eeafa72)

Un'interfaccia chatbot costruita con React 19, TypeScript e Vite. Questa applicazione dimostra il rendering dinamico di risposte del bot, inclusi testo, tabelle e grafici.

## Panoramica

Questo è un prototipo di interfaccia chatbot frontend-only che mostra la capacità di ricevere e renderizzare vari tipi di dati strutturati. Il bot utilizza un backend simulato per imitare le risposte AI basate su frasi trigger.

## Stack Tecnologico

- **Framework**: React
- **Linguaggio**: TypeScript
- **Build Tool**: Vite
- **Componenti UI**: shadcn/ui
- **Styling**: Tailwind CSS
- **Grafici**: Recharts
- **Icone**: Lucide React
- **Testing**: Jest

## Avvio Rapido

### Prerequisiti

- Node.js 20+
- npm o yarn

### Installazione

```bash
# Clona il repository
git clone https://github.com/andrii-zhygalko/chatbot_ui.git
cd chatbot_ui

# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev
```

L'applicazione sarà disponibile su `http://localhost:5173/`

Live Page disponibile su `https://chatbot-test.zhygalko.dev`

## Uso dell'app

### Interazione di Base

1. Scrivi un messaggio nel campo di input in basso
2. Premi Invio o clicca sul pulsante di invio
3. Aspetta l'animazione di caricamento mentre il bot "pensa"
4. Vedi la risposta del bot apparire nella conversazione

### Frasi Trigger

Il backend simulato riconosce frasi specifiche per restituire diversi tipi di risposta:

#### Risposta Tabella

**Frase**: `elenca gli ultimi utenti`

Restituisce una tabella che mostra i 5 utenti più recenti registrati.

#### Risposta Grafico

**Frase**: `mostrami le vendite mensili`

Restituisce un grafico a barre che visualizza i dati di vendita mensili per l'intero anno.

#### Risposta Testuale

**Qualsiasi altro messaggio**

Restituisce una risposta testuale amichevole che incoraggia a provare le frasi trigger sopra indicate.

## Struttura del Progetto

```
src/
├── components/
│   ├── ui/                        # Componenti shadcn/ui (button, textarea, table, ecc.)
│   ├── chat/
│   │   ├── ChatWindow.tsx         # Container principale con layout full-page
│   │   ├── ConversationItem.tsx   # Componente renderer delle messaggi
│   │   ├── MessageBubble.tsx      # Componente messaggio utente
│   │   ├── BotMessageBubble.tsx   # Componente risposta testuale bot
│   │   ├── LoadingIndicator.tsx   # Punti di caricamento animati
│   │   └── InputBar.tsx           # Textarea con pulsante invio
│   └── bot-responses/
│       ├── BotTable.tsx           # Renderer tabella con shadcn/ui Table
│       └── BotBarChart.tsx        # Grafico responsive con Recharts
├── hooks/
│   ├── useChat.ts                 # Gestione stato chat con persistenza
│   └── useMediaQuery.ts           # Hook responsive
├── lib/
│   ├── mockApi.ts                 # Backend simulato con rilevamento trigger
│   ├── types.ts                   # Interfacce e tipi TypeScript
│   ├── utils.ts                   # Funzioni helper (generazione ID, timestamp)
│   └── storage.ts                 # Utilità persistenza localStorage
└── tests/
    └── mockApi.test.ts            # Test mock API (trigger detection, risposte)
```

### Flusso dei Dati

1. Utente scrive messaggio - Componente `InputBar`
2. Hook `useChat` gestisce invio messaggio
3. Mock API simula ritardo e restituisce risposta tipizzata
4. Indicatore di caricamento mostra durante "elaborazione"
5. Risposta sostituisce indicatore di caricamento in-place
6. `ConversationItem` renderizza componente appropriato in base al tipo
7. Conversazione si salva in localStorage

### Gestione dello Stato

- **Hook useChat**: Logica chat centralizzata con persistenza
- **localStorage**: Salvataggio/caricamento automatico con validazione e gestione errori
- **Ordinamento cronologico**: Sistema timestamp unificato previene race condition

### Qualità del Codice

```bash
# Esegui ESLint
npm run lint

# Correggi problemi ESLint
npm run lint:fix

# Esegui i test
npm run test
```
