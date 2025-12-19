import React from 'react';
import Button from './Button';
import { WHATSAPP_NUMBER } from '../constants';

const Pricing: React.FC = () => {
  const handlePurchase = (plan: string) => {
    console.log('click_comprar', { plan });
    const message = `Hola César, me interesa el plan ${plan}. Quiero más información.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="py-16 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold mb-4">Planes Simples, Sin Contratos</h2>
          <p className="text-gray-600">Invierte en herramientas que realmente mueven la aguja de tu negocio.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Free Plan */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-xl mb-2">Emprendedor Inicial</h3>
            <div className="text-4xl font-bold mb-6">S/ 0<span className="text-base font-normal text-gray-500">/siempre</span></div>
            <ul className="space-y-4 mb-8 text-gray-600 text-sm">
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> 3 Ideas virales por día</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> 1 Auditoría básica diaria</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Acceso a Blog de Estrategias</li>
            </ul>
            <Button variant="outline" fullWidth disabled>Tu Plan Actual</Button>
          </div>

          {/* Pro Plan */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-brand-primary relative overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute top-0 right-0 bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              MÁS VENDIDO
            </div>
            <h3 className="font-bold text-xl mb-2">Pack Creador Pro</h3>
            <div className="text-4xl font-bold mb-6">S/ 49<span className="text-base font-normal text-gray-500">/mes</span></div>
            <ul className="space-y-4 mb-8 text-gray-700 text-sm font-medium">
              <li className="flex items-center"><span className="text-brand-primary mr-2">★</span> Ideas ILIMITADAS</li>
              <li className="flex items-center"><span className="text-brand-primary mr-2">★</span> Auditorías ILIMITADAS</li>
              <li className="flex items-center"><span className="text-brand-primary mr-2">★</span> Guiones detallados palabra por palabra</li>
              <li className="flex items-center"><span className="text-brand-primary mr-2">★</span> Soporte directo por WhatsApp</li>
            </ul>
            <Button onClick={() => handlePurchase('PRO')} fullWidth>
              Activar Plan Pro
            </Button>
            <p className="text-xs text-center text-gray-400 mt-4">Pago único vía Yape/Plin. Sin cobros automáticos.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;