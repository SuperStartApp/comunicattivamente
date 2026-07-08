import React from 'react';
import { supabase } from '@/lib/supabase';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import ConfessionForm from '@/components/ConfessionForm';

// Forza il sito a leggere i dati freschi da Supabase ogni volta (No Caching)
export const dynamic = 'force-dynamic';

// Componente Icona LinkedIn Manuale (Indistruttibile)
const LinkedinIcon = ({ size = 28, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" rx="2" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface Book {
  id: string;
  title: string;
  description: string;
  link: string;
  cover_url: string;
  is_featured: boolean;
}

export default async function Home() {
  // RECUPERO DATI: Solo i primi 3 libri (i più importanti/recenti)
  const { data: books, error } = await supabase
    .from('comunica_books')
    .select('*')
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(3); // <--- LIMITA A 3 LIBRI PER LA HOME

  if (error) {
    console.error('Errore nel recupero libri:', error.message);
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-red-900/20 to-transparent"></div>
        <div className="max-w-5xl">
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter leading-none mb-8">
            SMETTI DI CORRERE <br />
            <span className="text-red-600">SULLA RUOTA.</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Gestione del Caos per imprenditori che hanno capito che <br className="hidden md:block" />
            <span className="text-white font-medium">il fatturato è vanità, ma il margine è sanità.</span>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* Link ancora al form di confessione */}
            <a href="#confession-form" className="w-full sm:w-auto px-10 py-5 bg-red-600 text-white font-bold text-lg uppercase tracking-widest hover:bg-red-700 transition-all duration-300 shadow-[0_0_30px_rgba(220,38,38,0.4)] text-center">
              Prenota una Confessione
            </a>
            {/* Link ancora alla sezione manifesto (Diagnosi) */}
            <a href="#manifesto" className="w-full sm:w-auto px-10 py-5 border border-white/30 text-white font-bold text-lg uppercase tracking-widest hover:border-white hover:bg-white hover:text-black transition-all duration-300 text-center">
              Leggi il Manifesto
            </a>
          </div>
        </div>
      </section>

      {/* 2. DIAGNOSI SECTION (Sotto l'ID 'manifesto') */}
      <section id="manifesto" className="bg-white text-black py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20 text-center md:text-left">
            <h2 className="text-red-600 font-bold uppercase tracking-[0.3em] text-sm mb-4">La Diagnosi</h2>
            <h3 className="text-4xl md:text-6xl font-extrabold tracking-tighter leading-tight">
              I 6 Rituali della tua <br />
              <span className="text-red-600">prigione dorata.</span>
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            <RitualItem num="01" title="Il 'Faccio Prima Io'" desc="Sei il dipendente più costoso della tua azienda. Ogni volta che fai un lavoro da 15€ con il tuo tempo da 100€, stai bruciando margini." />
            <RitualItem num="02" title="La Riunione Vampiro" desc="Spendere ore per decidere il colore dei post-it è un suicidio finanziario. Le riunioni senza verbale sono solo chiacchiere da bar." />
            <RitualItem num="03" title="L'Inganno del Bilancio" desc="Il commercialista guarda il passato. Tu devi guardare il futuro. Il fatturato non paga gli stipendi, lo fa l'incasso." />
            <RitualItem num="04" title="L'Idolatria del Fatturato" desc="Il fatturato è vanità, il margine è sanità. Meglio un'azienda piccola e ricca che un gigante obeso che muore di fame." />
            <RitualItem num="05" title="Il Demone dell'Oralità" desc="Se tutto è nella tua testa, non hai un'azienda, hai un lavoro a vita. Senza procedure, sei l'unico ingranaggio che non può fermarsi." />
            <RitualItem num="06" title="Il Mito della Complessità" desc="Pensare che servano software costosi per organizzarsi è un errore. Spesso, basta un foglio di carta o un sistema semplice." />
          </div>
        </div>
      </section>

      {/* 3. L'ARSENALE (Solo 3 libri + Link Libreria Completa) */}
      <section className="bg-zinc-950 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-red-600 font-bold uppercase tracking-[0.3em] text-sm mb-4">L'Arsenale</h2>
            <h3 className="text-4xl md:text-6xl font-extrabold tracking-tighter">
              Le tue armi per <br /> <span className="text-white">scendere dalla ruota.</span>
            </h3>
          </div>

          {books && books.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {books.map((book: Book) => (
                  <div key={book.id} className="bg-zinc-900 border border-white/5 rounded-lg overflow-hidden hover:border-red-600 transition-all duration-300 group flex flex-col">
                    <div className="aspect-[3/4] w-full overflow-hidden bg-zinc-800">
                      {book.cover_url ? (
                        <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-600 font-bold">No Cover</div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h4 className="text-xl font-bold mb-3 group-hover:text-red-600 transition-colors">{book.title}</h4>
                      <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">{book.description}</p>
                      <a href={book.link} target="_blank" rel="noopener noreferrer" className="inline-block w-full text-center py-3 border border-red-600 text-red-600 font-bold uppercase text-xs tracking-widest hover:bg-red-600 hover:text-white transition-all">
                        Acquista Ora
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              {/* BOTTONE LIBRERIA COMPLETA */}
              <div className="mt-16 text-center">
                <a 
                  href="/libreria" 
                  className="inline-block px-10 py-4 border border-white/20 text-white font-bold uppercase text-xs tracking-widest hover:border-red-600 hover:text-red-600 transition-all"
                >
                  Esplora la Libreria Completa →
                </a>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500 italic">L'arsenale è in fase di rifornimento. Torna presto.</p>
          )}
        </div>
      </section>

      {/* 4. L'ESORCISMO (L'ID per l'ancora del bottone Hero) */}
      <section id="confession-form" className="bg-black py-24 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-red-600 font-bold uppercase tracking-[0.3em] text-sm mb-4">L'Esorcismo</h2>
          <h3 className="text-4xl md:text-6xl font-extrabold tracking-tighter leading-tight mb-8">
            Smetti di essere il collo di bottiglia. <br />
            <span className="text-white">Diventa l'Ammiraglio.</span>
          </h3>
          <div className="text-left space-y-8 text-lg text-gray-300 mb-16">
            <p>Non sono un motivatore. Non vendo sogni di ricchezza immediata o mindset magici.</p>
            <p>Mi occupo di <span className="text-white font-bold">Gestione del Caos</span>. Entro nelle aziende, apro i cassetti che nessuno ha il coraggio di aprire e leggo i dati che il tuo commercialista ignora.</p>
            <p>Se sei pronto a scendere dalla ruota, lascia i tuoi dati. Ti contatterò io per una prima analisi del tuo caos.</p>
          </div>
          <ConfessionForm />
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="py-16 px-6 bg-black border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-center md:text-left">
            <h4 className="text-white font-bold text-xl mb-2">comunicAttivamente.it</h4>
            <p className="text-gray-500 text-sm">Gestione del Caos & Strategia Aziendale</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex gap-6">
              <a href="https://wa.me/3929334563" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 transition-colors" title="WhatsApp"><MessageCircle size={28} /></a>
              <a href="mailto:daniele@comunicattivamente.it" className="text-gray-400 hover:text-red-500 transition-colors" title="Email"><Mail size={28} /></a>
              <a href="https://www.linkedin.com/in/danielesalvatori/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors" title="LinkedIn"><LinkedinIcon size={28} /></a>
              <a href="tel:+3929334563" className="text-gray-400 hover:text-white transition-colors" title="Telefono"><Phone size={28} /></a>
            </div>
            <p className="text-gray-600 text-xs">© {new Date().getFullYear()} Daniele Salvatori. Tutti i diritti riservati.</p>
          </div>
        </div>
      </footer>

    </main>
  );
}

function RitualItem({ num, title, desc }: { num: string, title: string, desc: string }) {
  return (
    <div className="group">
      <div className="text-red-600 text-4xl font-black mb-4 group-hover:scale-110 transition-transform duration-300">{num}</div>
      <h4 className="text-2xl font-bold mb-3">{title}</h4>
      <p className="text-gray-600 leading-relaxed">{desc}</p>
    </div>
  );
}