'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot' | 'human';
  timestamp: Date;
}

interface ConversationContext {
  stage: 'idle' | 'package_selection' | 'size_question' | 'budget_question' | 'needs_question' | 'recommendation';
  answers: {
    size?: 'small' | 'medium' | 'large' | 'industrial';
    budget?: 'low' | 'medium' | 'high';
    needs?: string[];
  };
}

const SIMPLE_QUESTIONS: Record<string, string> = {
  'hei': 'Hei! Hvordan kan jeg hjelpe deg i dag?',
  'hallo': 'Hei! Hvordan kan jeg hjelpe deg i dag?',
  'pris': 'Vi har to pakker:\n\n1. Plug & Play — Startpakke: 25 000 kr engangs + 2 990 kr/mnd\n2. Sjøklar — Industri-pakke: 55 000–80 000 kr + 7 990 kr/mnd\n\nVil du vite mer om noen av pakkene?',
  'priser': 'Vi har to pakker:\n\n1. Plug & Play — Startpakke: 25 000 kr engangs + 2 990 kr/mnd\n2. Sjøklar — Industri-pakke: 55 000–80 000 kr + 7 990 kr/mnd\n\nVil du vite mer om noen av pakkene?',
  'hva koster': 'Vi har to pakker:\n\n1. Plug & Play — Startpakke: 25 000 kr engangs + 2 990 kr/mnd\n2. Sjøklar — Industri-pakke: 55 000–80 000 kr + 7 990 kr/mnd\n\nVil du vite mer om noen av pakkene?',
  'produkter': 'Vi tilbyr to hovedprodukter:\n\n1. **Plug & Play — Startpakke**\n   - Rask installasjon (1–4 timer)\n   - Perfekt for små og mellomstore anlegg\n\n2. **Sjøklar — Industri-pakke**\n   - Avansert løsning (1–2 dager installasjon)\n   - For større industrielle anlegg\n\nVil du vite mer om noen av dem?',
  'hva gjør dere': 'AquaEnergy AI tilbyr Plug & Play sensorpakker med AI-styrt energibesparelse for oppdrettsanlegg. Vi hjelper deg med å:\n\n• Redusere strømforbruk med 10–30%\n• Overvåke energi, flow, oksygen og temperatur i sanntid\n• Få prediktivt vedlikehold\n• Optimalisere driften automatisk\n\nVil du vite mer?',
  'energibesparelse': 'Våre kunder opplever typisk 10–30% energibesparelse gjennom:\n\n• AI-optimalisering av pumper og systemer\n• Sanntids overvåking og justering\n• Prediktivt vedlikehold som reduserer driftsstans\n• Automatisk justering basert på forholdene\n\nVil du se hvordan dette fungerer?',
  'hvordan fungerer': 'Systemet fungerer i tre enkle steg:\n\n1. **Sensorer** — Plug & Play sensorer monteres raskt (clamp-on, IP68)\n2. **Data & AI** — Sanntids data sendes til vår AI som analyserer og anbefaler\n3. **Resultat** — Du får 10–30% energibesparelse automatisk\n\nVil du se dashboardet vårt?',
  'installasjon': 'Installasjon er rask og enkel:\n\n• **Plug & Play**: 1–4 timer\n• **Sjøklar**: 1–2 dager\n\nAlle sensorer er Plug & Play og krever minimal inngripen i eksisterende systemer. Vil du booke en installasjon?',
  'kontakt': 'Du kan nå oss på:\n\n📧 E-post: info@aquaenergy.com\n📞 Telefon: 900 24 636 (Remi Lie)\n\nEller fyll ut kontakt-skjemaet på siden. Skal jeg hjelpe deg med noe annet?',
  'demo': 'Du kan se vårt live dashboard her på nettsiden! Klikk på "Se demo-dashboard" i toppen, eller besøk /dashboard.\n\nDer ser du sanntids data fra sensorer og hvordan AI-optimaliseringen fungerer. Vil du vite mer om noe spesifikt?',
  'pilot': 'Vi tilbyr gratis pilot! Dette gir deg:\n\n• Test av systemet i ditt anlegg\n• Se resultater før du bestemmer deg\n• Ingen forpliktelser\n\nVil du booke en gratis pilot? Fyll ut kontakt-skjemaet eller ring 900 24 636.',
};

function findAnswer(question: string): string | null {
  const lowerQuestion = question.toLowerCase().trim();
  
  for (const [key, answer] of Object.entries(SIMPLE_QUESTIONS)) {
    if (lowerQuestion.includes(key)) {
      return answer;
    }
  }
  
  return null;
}

function detectSize(input: string): 'small' | 'medium' | 'large' | 'industrial' | null {
  const lower = input.toLowerCase();
  if (lower.match(/\b(små|liten|lille|1-2|1 til 2|under 5)\b/)) return 'small';
  if (lower.match(/\b(mellomstore|medium|middels|3-5|3 til 5|5-10)\b/)) return 'medium';
  if (lower.match(/\b(stor|store|større|10-20|10 til 20|over 10)\b/)) return 'large';
  if (lower.match(/\b(industri|industriell|storskala|over 20|20\+)\b/)) return 'industrial';
  return null;
}

function detectBudget(input: string): 'low' | 'medium' | 'high' | null {
  const lower = input.toLowerCase();
  if (lower.match(/\b(25|25000|25 000|lav|billig|startpakke)\b/)) return 'low';
  if (lower.match(/\b(55|55000|55 000|80|80000|80 000|middels|medium)\b/)) return 'medium';
  if (lower.match(/\b(over 80|høy|premium|avansert)\b/)) return 'high';
  return null;
}

function getRecommendation(context: ConversationContext): string {
  const { size, budget, needs } = context.answers;
  
  // Plug & Play anbefales for små/mellomstore anlegg med lavere budsjett
  if ((size === 'small' || size === 'medium') && (budget === 'low' || budget === 'medium')) {
    return `Basert på det du har fortalt, anbefaler jeg **Plug & Play — Startpakke** for deg! 🎯

**Hvorfor denne pakken?**
• Perfekt for ${size === 'small' ? 'små' : 'mellomstore'} anlegg
• Rask installasjon (1–4 timer)
• Lav investering: 25 000 kr engangs + 2 990 kr/mnd
• Alt du trenger for å starte med energibesparelse

**Hva får du:**
• Eastron SDM630 energimåler
• Clamp-on ultrasonisk flowmåler
• Optisk oksygenmåler (DO)
• PT100 temperaturmåler
• LoRaWAN/4G gateway
• AI-optimalisering og dashboard

Vil du vite mer om denne pakken, eller har du spørsmål?`;
  }
  
  // Sjøklar anbefales for større/industrielle anlegg
  if (size === 'large' || size === 'industrial' || budget === 'high') {
    return `Basert på det du har fortalt, anbefaler jeg **Sjøklar — Industri-pakke** for deg! 🏭

**Hvorfor denne pakken?**
• Designet for ${size === 'industrial' ? 'industrielle' : 'større'} anlegg
• Avanserte sensorer med høy nøyaktighet
• Robust utendørs løsning
• Investering: 55 000–80 000 kr engangs + 7 990 kr/mnd

**Hva får du:**
• Industriell energimåler (MID/Modbus)
• Industrial clamp-on flowmåler
• Optisk DO (industriell kvalitet)
• 2x IP68 PT100 temperaturmåler
• 2x vibrasjonssensorer
• Utendørs gateway
• Avansert AI-optimalisering

Vil du vite mer om denne pakken, eller har du spørsmål?`;
  }
  
  // Standard anbefaling
  return `Basert på det du har fortalt, her er mine anbefalinger:

**For små/mellomstore anlegg:**
**Plug & Play — Startpakke** (25 000 kr + 2 990 kr/mnd)
• Rask installasjon
• Perfekt for å komme i gang

**For større/industrielle anlegg:**
**Sjøklar — Industri-pakke** (55 000–80 000 kr + 7 990 kr/mnd)
• Avanserte sensorer
• Robust løsning

Vil du at jeg skal hjelpe deg velge, eller har du spørsmål om noen av pakkene?`;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hei! 👋 Jeg er AquaEnergy AI-assistenten. Hvordan kan jeg hjelpe deg i dag?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [context, setContext] = useState<ConversationContext>({
    stage: 'idle',
    answers: {},
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const userInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    let botResponse = '';
    let newContext = { ...context };

    // Sjekk om brukeren spør om pakkevalg
    const lowerInput = userInput.toLowerCase();
    const isPackageQuestion = lowerInput.includes('pakke') || 
                             lowerInput.includes('velge') || 
                             lowerInput.includes('bestemme') ||
                             lowerInput.includes('hvilken') ||
                             lowerInput.includes('anbefal') ||
                             lowerInput.includes('hva skal jeg');

    if (isPackageQuestion && context.stage === 'idle') {
      // Start pakkevalg-dialogen
      newContext.stage = 'size_question';
      botResponse = 'Flott at du vil finne riktig pakke! La meg stille deg noen spørsmål for å gi deg en god anbefaling. 🎯\n\n**Første spørsmål:** Hvor stort er oppdrettsanlegget ditt?\n\n• Små anlegg (1–2 bassenger)\n• Mellomstore (3–5 bassenger)\n• Store (10–20 bassenger)\n• Industrielle (20+ bassenger)';
    } else if (context.stage === 'size_question') {
      // Håndter størrelse-svar
      const detectedSize = detectSize(userInput);
      if (detectedSize) {
        newContext.answers.size = detectedSize;
        newContext.stage = 'budget_question';
        botResponse = `Takk! Jeg noterer at du har et ${detectedSize === 'small' ? 'små' : detectedSize === 'medium' ? 'mellomstore' : detectedSize === 'large' ? 'store' : 'industrielle'} anlegg. 📝\n\n**Neste spørsmål:** Hva er ditt budsjett for investeringen?\n\n• Startpakke: 25 000 kr engangs + 2 990 kr/mnd\n• Industri-pakke: 55 000–80 000 kr engangs + 7 990 kr/mnd\n• Eller fortell meg ditt budsjett`;
      } else {
        botResponse = 'Kan du gi meg litt mer informasjon om størrelsen? For eksempel:\n• Antall bassenger\n• Om det er små, mellomstore, store eller industrielle anlegg';
      }
    } else if (context.stage === 'budget_question') {
      // Håndter budsjett-svar
      const detectedBudget = detectBudget(userInput);
      if (detectedBudget || lowerInput.includes('25') || lowerInput.includes('55') || lowerInput.includes('80')) {
        if (detectedBudget) {
          newContext.answers.budget = detectedBudget;
        } else if (lowerInput.includes('25')) {
          newContext.answers.budget = 'low';
        } else {
          newContext.answers.budget = 'medium';
        }
        newContext.stage = 'recommendation';
        botResponse = getRecommendation(newContext);
        newContext.stage = 'idle'; // Reset etter anbefaling
        newContext.answers = {};
      } else {
        botResponse = 'Kan du gi meg litt mer informasjon om budsjettet? For eksempel:\n• "25 000 kr" for startpakken\n• "55 000–80 000 kr" for industri-pakken\n• Eller fortell meg ditt budsjett';
      }
    } else {
      // Standard svar-logikk
      const answer = findAnswer(userInput);
      if (answer) {
        botResponse = answer;
      } else {
        // Escalate to human
        botResponse = 'Dette spørsmålet er litt mer komplekst. La meg koble deg til Remi Lie som kan hjelpe deg bedre. 📧\n\nDu kan nå ham på:\n• E-post: info@aquaenergy.com\n• Telefon: 900 24 636\n\nEller fyll ut kontakt-skjemaet på siden, så tar han kontakt med deg!';
      }
    }

    setContext(newContext);

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: botResponse,
      sender: 'bot',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-all hover:scale-110 flex items-center justify-center z-50"
          aria-label="Åpne chat"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col z-50 border border-gray-200">
          {/* Header */}
          <div className="bg-primary-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <div>
                <h3 className="font-semibold">AquaEnergy AI</h3>
                <p className="text-xs text-primary-100">Vi svarer raskt</p>
              </div>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                setContext({ stage: 'idle', answers: {} });
              }}
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Lukk chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-primary-600 text-white'
                      : message.sender === 'human'
                      ? 'bg-yellow-100 text-yellow-900 border border-yellow-300'
                      : 'bg-white text-gray-900 border border-gray-200'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.text}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString('no-NO', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Skriv melding..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              {context.stage !== 'idle' ? 'Følger opp pakkevalg...' : 'For komplekse spørsmål kobles du til Remi Lie'}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
