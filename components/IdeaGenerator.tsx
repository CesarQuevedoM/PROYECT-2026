import React, { useState } from 'react';
import Button from './Button';
import { generateContentIdeas } from '../services/geminiService';
import { ContentIdea } from '../types';
import { FREE_IDEAS_LIMIT } from '../constants';

interface IdeaGeneratorProps {
  usage: { count: number, date: string };
  updateUsage: (count: number) => void;
  onLimitReached: () => void;
}

const IdeaGenerator: React.FC<IdeaGeneratorProps> = ({ usage, updateUsage, onLimitReached }) => {
  const [niche, setNiche] = useState('');
  const [brandName, setBrandName] = useState(''); // New state for Brand Name
  const [productGoal, setProductGoal] = useState(''); 
  const [strategy, setStrategy] = useState('Estrategia de Ventas'); 
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ContentIdea[]>([]);
  const [error, setError] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (usage.count >= FREE_IDEAS_LIMIT) {
      onLimitReached();
      return;
    }

    if (!niche.trim() || !brandName.trim() || !productGoal.trim()) {
      setError('Por favor completa todos los campos.');
      return;
    }

    setLoading(true);
    try {
      const ideas = await generateContentIdeas(niche, brandName, productGoal, strategy);
      setResults(ideas);
      updateUsage(usage.count + 1);
    } catch (err) {
      setError('Ocurrió un error. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
      <div className="text-center mb-10">
        <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-wide mb-4 border border-blue-100">
          POWERED BY GOOGLE SEARCH™
        </span>
        <h2 className="font-display text-4xl font-bold mb-4 tracking-tight">Generador Estratégico</h2>
        <p className="text-gray-600 max-w-lg mx-auto">
          Define qué quieres vender y elige una estrategia global (Asia, USA, Europa) para adaptar formatos ganadores.
          <span className="block mt-3 text-sm font-bold text-brand-primary">
            {FREE_IDEAS_LIMIT - usage.count} estrategias restantes hoy.
          </span>
        </p>
      </div>

      <form onSubmit={handleGenerate} className="bg-white p-6 rounded-3xl shadow-2xl shadow-brand-primary/5 border border-gray-100 mb-12 max-w-3xl mx-auto transform transition-all">
        <div className="space-y-6 mb-6">
          
          {/* Input 1: Nicho */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">1. ¿Cuál es tu nicho?</label>
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="Ej: Odontología, Ropa de bebé, Consultoría de marketing..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
              disabled={loading}
            />
          </div>

          {/* Input 2: Nombre de Marca (NUEVO) */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">2. ¿Nombre de la cuenta, persona o marca?</label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="Ej: Zara, @dr.sonrisa, Boutique Luna..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
              disabled={loading}
            />
          </div>

          {/* Input 3: Qué quieres vender/lograr */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">3. ¿Qué quieres vender, dar a conocer o lograr?</label>
            <input
              type="text"
              value={productGoal}
              onChange={(e) => setProductGoal(e.target.value)}
              placeholder="Ej: Vender mi curso de inglés, Promocionar oferta de 2x1 en hamburguesas..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all"
              disabled={loading}
            />
          </div>

          {/* Input 4: Estrategia de Mercado */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">4. Elige tu Estrategia de Crecimiento:</label>
            <div className="relative">
              <select
                value={strategy}
                onChange={(e) => setStrategy(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all bg-white appearance-none"
                disabled={loading}
              >
                <optgroup label="Objetivos Directos">
                  <option value="Ventas Directas">💰 Enfoque Full Ventas (Conversión)</option>
                  <option value="Aumentar Visitas">🚀 Aumentar Visitas (Viralidad/Alcance)</option>
                </optgroup>
                <optgroup label="Marketing Orgánico & Copiar Mercados">
                  <option value="Copiar Mercado Asiático">🇨🇳 Copiar Formato Asiático (Douyin/Rápido)</option>
                  <option value="Copiar Mercado Norteamericano">🇺🇸 Copiar Formato Norteamericano (Autoridad)</option>
                  <option value="Copiar Mercado Europeo">🇪🇺 Copiar Formato Europeo (Estético/Lifestyle)</option>
                  <option value="Copiar Mercado Latino">🌎 Formato Latino (Humor/Tendencia Local)</option>
                </optgroup>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
              </div>
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={loading || !niche.trim() || !brandName.trim() || !productGoal.trim()} 
          fullWidth
          className="py-4 text-lg shadow-lg hover:shadow-xl"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"/>
              Analizando Estrategia...
            </span>
          ) : 'Generar Ideas Estratégicas'}
        </Button>
      </form>

      {error && <p className="text-center text-red-500 mb-8 font-medium">{error}</p>}

      <div className="space-y-8">
        {results.map((idea) => (
          <div key={idea.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-500 group animate-fade-in-up">
            <div className="bg-gradient-to-r from-gray-900 to-black p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                   <span className="bg-brand-primary text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Estrategia</span>
                   <h3 className="text-white font-bold text-xl">{idea.concept}</h3>
                </div>
                <p className="text-gray-400 text-sm">
                  💡 {idea.whyItWorks}
                </p>
              </div>
            </div>
            
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {idea.variants.map((variant, idx) => (
                  <div key={idx} className="relative p-6 rounded-xl bg-gray-50 border border-gray-100 group-hover:border-brand-primary/20 transition-colors">
                    <div className="absolute -top-3 left-6 bg-white border border-gray-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest text-gray-500 shadow-sm">
                      Opción {idx === 0 ? 'A (Principal)' : 'B (Alternativa)'}
                    </div>
                    <h4 className="font-bold text-gray-900 text-lg mb-3 mt-2">{variant.title}</h4>
                    <div className="mb-4">
                      <span className="text-xs font-bold text-brand-primary uppercase">Gancho (Primeros 3s)</span>
                      <p className="text-gray-800 font-medium italic">"{variant.hook}"</p>
                    </div>
                    <div>
                       <span className="text-xs font-bold text-gray-400 uppercase">Guion Visual</span>
                       <p className="text-sm text-gray-600 leading-relaxed">{variant.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Grounding Sources */}
              {idea.sources && idea.sources.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <p className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                    Referencias detectadas
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {idea.sources.map((source, i) => (
                      <a 
                        key={i} 
                        href={source.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-lg transition-colors truncate max-w-[200px]"
                      >
                        {source.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IdeaGenerator;