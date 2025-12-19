import React, { useState } from 'react';
import Button from './Button';
import { generateStrategyAudit } from '../services/geminiService';
import { StrategyAudit as IStrategyAudit } from '../types';
import { FREE_AUDIT_LIMIT } from '../constants';

interface StrategyAuditProps {
  usage: { count: number, date: string };
  updateUsage: (count: number) => void;
  onLimitReached: () => void;
}

const StrategyAudit: React.FC<StrategyAuditProps> = ({ usage, updateUsage, onLimitReached }) => {
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IStrategyAudit | null>(null);

  const handleAudit = async () => {
    if (usage.count >= FREE_AUDIT_LIMIT) {
      onLimitReached();
      return;
    }
    if (!desc.trim()) return;

    setLoading(true);
    try {
      const audit = await generateStrategyAudit(desc);
      setResult(audit);
      updateUsage(usage.count + 1);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in" id="audit-section">
      <div className="text-center mb-10">
        <div className="inline-flex items-center bg-gray-900 text-white px-4 py-1 rounded-full text-xs font-bold mb-4 tracking-wider uppercase">
            <span className="text-yellow-400 mr-2">★</span> Herramienta Premium
        </div>
        <h2 className="font-display text-4xl font-bold mb-4">Auditoría Profunda AI</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Nuestro modelo "Thinking" piensa como un estratega humano para analizar tu competencia y oportunidades ocultas.
        </p>
        <p className="text-sm font-bold text-brand-primary mt-4 bg-brand-primary/5 inline-block px-4 py-2 rounded-lg border border-brand-primary/20">
            🎁 Disponible gratis 1 vez al día para convencerte de comprar el Plan Pro.
        </p>
      </div>

      {!result ? (
        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden transform hover:scale-[1.01] transition-transform duration-300">
          <label className="block text-sm font-bold text-gray-700 mb-4">
             Cuéntanos sobre tu negocio para auditarlo:
          </label>
          <textarea
            className="w-full p-6 border-2 border-gray-100 rounded-xl mb-6 h-40 focus:border-brand-primary focus:ring-0 outline-none resize-none text-lg transition-colors bg-gray-50 focus:bg-white"
            placeholder="Ej: Tengo una tienda de zapatillas en Instagram con 5k seguidores. Mi mayor problema es que tengo likes pero nadie me escribe al WhatsApp para comprar..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <Button onClick={handleAudit} disabled={loading || !desc.trim()} fullWidth className="py-4 text-lg">
            {loading ? (
               <span className="flex items-center justify-center gap-3">
                 <span className="relative flex h-3 w-3">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                 </span>
                 Analizando Estrategia Profunda...
               </span>
            ) : 'Iniciar Análisis Estratégico (Gratis hoy)'}
          </Button>
          
          {loading && (
            <p className="text-center text-xs text-gray-400 mt-4 animate-pulse">
              Esto toma unos segundos porque la IA está "pensando" la mejor estrategia...
            </p>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-up border border-gray-100">
          <div className="bg-brand-secondary text-white p-8 flex items-center justify-between relative overflow-hidden">
             <div className="relative z-10">
               <h3 className="font-bold text-2xl mb-1">Resultado de Auditoría</h3>
               <p className="text-gray-400 text-sm">Basado en datos de mercado LATAM</p>
             </div>
             <div className="relative z-10 flex flex-col items-center">
                <span className="text-5xl font-display font-bold">{result.score}</span>
                <span className="text-xs uppercase tracking-widest opacity-70">Puntaje</span>
             </div>
             {/* Background decorative elements */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
          </div>
          
          <div className="p-8 md:p-10">
            {result.analysis && (
                <div className="mb-10 bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                    <h4 className="text-sm font-bold text-blue-800 uppercase tracking-wide mb-3">🧠 Análisis del Modelo</h4>
                    <p className="text-gray-700 leading-relaxed">{result.analysis}</p>
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-10 mb-10">
              <div>
                <h4 className="font-bold text-gray-900 mb-4 flex items-center text-lg">
                  <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 text-sm">✓</span> 
                  Fortalezas
                </h4>
                <ul className="space-y-3">
                  {result.strengths.map((s, i) => (
                    <li key={i} className="flex text-gray-600 bg-gray-50 px-4 py-2 rounded-lg text-sm border border-gray-100">{s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-4 flex items-center text-lg">
                  <span className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center mr-3 text-sm">!</span> 
                  A Mejorar
                </h4>
                <ul className="space-y-3">
                  {result.weaknesses.map((w, i) => (
                    <li key={i} className="flex text-gray-600 bg-gray-50 px-4 py-2 rounded-lg text-sm border border-gray-100">{w}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-brand-primary to-pink-600 rounded-2xl p-6 text-white shadow-lg shadow-brand-primary/20">
              <h4 className="font-bold text-white/90 mb-2 text-sm uppercase tracking-wider">🚀 Victoria Rápida (Hacer hoy)</h4>
              <p className="text-xl font-bold">{result.quickWin}</p>
            </div>

            <div className="mt-10 text-center">
              <Button onClick={() => setResult(null)} variant="outline" className="border-gray-200 text-gray-500 hover:text-black hover:border-black">
                Nueva Auditoría
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StrategyAudit;