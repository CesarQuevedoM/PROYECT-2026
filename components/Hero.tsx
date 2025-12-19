import React from 'react';
import Button from './Button';
import { ViewState } from '../types';
import { WHATSAPP_NUMBER } from '../constants';

interface HeroProps {
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  const whatsappMessage = encodeURIComponent("Hola Cesar, quiero una consultoría personalizada para mi negocio.");

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-24 lg:pb-32">
      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-accent/10 text-brand-secondary text-xs font-bold mb-6 border border-brand-accent/20">
          <span className="w-2 h-2 rounded-full bg-brand-primary mr-2 animate-pulse"></span>
          IA ACTUALIZADA CON TENDENCIAS LATAM
        </div>
        
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
          Tus ventas en <span className="text-brand-primary relative">
            TikTok
            <svg className="absolute w-full h-3 -bottom-1 left-0 text-brand-accent opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
            </svg>
          </span> despegan hoy
        </h1>
        
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Genera ideas de contenido viral, analiza tu competencia y audita tu perfil en segundos. 
          Diseñado para emprendedores de Perú y Latinoamérica que quieren vender más.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button onClick={onCtaClick} className="w-full sm:w-auto text-lg px-8 py-4">
            Generar Ideas Gratis
          </Button>
          <a 
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto text-center font-bold text-gray-600 hover:text-brand-primary underline decoration-2 underline-offset-4 transition-colors"
          >
            Hablar con César
          </a>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Mock Logos */}
             <div className="h-12 flex items-center justify-center font-bold text-xl text-gray-400">Restaurantes</div>
             <div className="h-12 flex items-center justify-center font-bold text-xl text-gray-400">Moda</div>
             <div className="h-12 flex items-center justify-center font-bold text-xl text-gray-400">Servicios</div>
             <div className="h-12 flex items-center justify-center font-bold text-xl text-gray-400">E-commerce</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;