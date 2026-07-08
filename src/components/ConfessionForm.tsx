'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function ConfessionForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const { name, email, phone, notes } = Object.fromEntries(formData);

    // 1. SALVATAGGIO SU SUPABASE (L'Archivio di Sicurezza)
    const { error } = await supabase
      .from('comunica_leads')
      .insert([{ name, email, phone, notes }]);

    if (error) {
      setMessage({ 
        type: 'error', 
        text: 'Si è verificato un errore tecnico. Ma non mollare: scrivimi direttamente su WhatsApp!' 
      });
      setLoading(false);
      return;
    }

    // 2. CREAZIONE DEL PONTE WHATSAPP (Il Salto)
    const myPhoneNumber = "3929334563"; 
    const waMessage = `Ciao Daniele! Sono ${name}. Ho appena inviato la mia "Confessione" sul sito. Il mio caos è: ${notes}. Attendo il tuo contatto!`;
    const encodedMessage = encodeURIComponent(waMessage);
    const waLink = `https://wa.me/${myPhoneNumber}?text=${encodedMessage}`;

    // 3. FEEDBACK DI SUCCESSO
    setMessage({ 
      type: 'success', 
      text: 'Confessione registrata! Ora ti porto direttamente da me su WhatsApp...' 
    });
    
    (e.target as HTMLFormElement).reset();
    setLoading(false);

    // 4. REDIREZIONE AUTOMATICA dopo 2 secondi
    setTimeout(() => {
      window.open(waLink, '_blank');
    }, 2000);
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-zinc-900 p-8 md:p-12 rounded-2xl border border-white/10 shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Nome Completo</label>
            <input 
              name="name" required 
              className="bg-black border border-white/20 p-3 rounded focus:border-red-600 outline-none transition-all text-white" 
              placeholder="Mario Rossi"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Email</label>
            <input 
              name="email" type="email" required 
              className="bg-black border border-white/20 p-3 rounded focus:border-red-600 outline-none transition-all text-white" 
              placeholder="mario@azienda.it"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Telefono / WhatsApp</label>
          <input 
            name="phone" 
            className="bg-black border border-white/20 p-3 rounded focus:border-red-600 outline-none transition-all text-white" 
            placeholder="+39 ..."
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Qual è il tuo caos? (Note)</label>
          <textarea 
            name="notes" rows={4} 
            className="bg-black border border-white/20 p-3 rounded focus:border-red-600 outline-none transition-all text-white" 
            placeholder="Raccontaci brevemente cosa non funziona..."
          ></textarea>
        </div>

        {/* AREA BOTTONI */}
        <div className="flex flex-col gap-4">
          {/* BOTTONE PRIMARIO: L'invio che salva su database e poi sposta su WA */}
          <button 
            disabled={loading}
            className="w-full py-5 bg-red-600 text-white font-black uppercase tracking-widest hover:bg-red-700 transition-all disabled:bg-gray-600 shadow-[0_0_20px_rgba(220,38,38,0.3)]"
          >
            {loading ? 'Invio in corso...' : 'Invia Confessione'}
          </button>

          {/* BOTTONE SECONDARIO: Il salto immediato senza form */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-gray-500 text-[10px] uppercase tracking-widest font-medium">
              Hai troppa fretta?
            </span>
            <a 
              href="https://wa.me/3929334563" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-4 border border-white/20 text-white font-bold uppercase tracking-widest hover:border-red-600 hover:text-red-600 transition-all text-center"
            >
              Oppure scrivimi direttamente su WA
            </a>
          </div>
        </div>

        {message && (
          <div className={`p-4 rounded text-center font-bold ${message.type === 'success' ? 'bg-green-900/30 text-green-500' : 'bg-red-900/30 text-red-500'}`}>
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
}