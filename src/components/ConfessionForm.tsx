'use client'; // Fondamentale: questo file è interattivo!

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

    const { error } = await supabase
      .from('comunica_leads')
      .insert([{ name, email, phone, notes }]);

    if (error) {
      setMessage({ type: 'error', text: 'Si è verificato un errore. Riprova o scrivici su WhatsApp.' });
    } else {
      setMessage({ type: 'success', text: 'Confessione inviata. L\'Esorcista ti contatterà a breve.' });
      (e.target as HTMLFormElement).reset();
    }
    setLoading(false);
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-zinc-900 p-8 md:p-12 rounded-2xl border border-white/10 shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Nome Completo</label>
            <input 
              name="name" required 
              className="bg-black border border-white/20 p-3 rounded focus:border-red-600 outline-none transition-all" 
              placeholder="Mario Rossi"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Email</label>
            <input 
              name="email" type="email" required 
              className="bg-black border border-white/20 p-3 rounded focus:border-red-600 outline-none transition-all" 
              placeholder="mario@azienda.it"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Telefono / WhatsApp</label>
          <input 
            name="phone" 
            className="bg-black border border-white/20 p-3 rounded focus:border-red-600 outline-none transition-all" 
            placeholder="+39 ..."
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest text-gray-400 font-bold">Qual è il tuo caos? (Note)</label>
          <textarea 
            name="notes" rows={4} 
            className="bg-black border border-white/20 p-3 rounded focus:border-red-600 outline-none transition-all" 
            placeholder="Raccontaci brevemente cosa non funziona..."
          ></textarea>
        </div>

        <button 
          disabled={loading}
          className="w-full py-5 bg-red-600 text-white font-black uppercase tracking-widest hover:bg-red-700 transition-all disabled:bg-gray-600"
        >
          {loading ? 'Invio in corso...' : 'Invia Confessione'}
        </button>

        {message && (
          <div className={`p-4 rounded text-center font-bold ${message.type === 'success' ? 'bg-green-900/30 text-green-500' : 'bg-red-900/30 text-red-500'}`}>
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
}