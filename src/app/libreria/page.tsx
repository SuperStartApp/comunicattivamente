import React from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

interface Book {
  id: string;
  title: string;
  description: string;
  link: string;
  cover_url: string;
  is_featured: boolean;
}

export const dynamic = 'force-dynamic';

export default async function LibreriaPage() {
  const { data: books, error } = await supabase
    .from('comunica_books')
    .select('*')
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false });

  return (
    <main className="min-h-screen bg-zinc-950 text-white px-6 py-24">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER LIBRERIA */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-red-600 font-bold uppercase tracking-[0.3em] text-sm mb-4">L'Arsenale Completo</h2>
            <h3 className="text-4xl md:text-6xl font-extrabold tracking-tighter">
              Tutte le armi per <br /> <span className="text-white">scendere dalla ruota.</span>
            </h3>
          </div>
          
          {/* TASTO RITORNO ALLA HOME */}
          <Link 
            href="/" 
            className="px-6 py-3 border border-white/20 text-white text-xs uppercase tracking-widest hover:border-red-600 hover:text-red-600 transition-all"
          >
            ← Torna alla Home
          </Link>
        </div>

        {/* GRIGLIA LIBRI (TUTTI) */}
        {books && books.length > 0 ? (
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
        ) : (
          <p className="text-center text-gray-500 italic">La libreria è attualmente vuota.</p>
        )}
      </div>
    </main>
  );
}