import React from 'react';

interface FooterProps {
  onOpenLegal: (type: 'terms' | 'privacy' | 'support') => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4 text-center">
        <div className="font-display font-bold text-2xl mb-4">CÉSAR QUEVEDO<span className="text-brand-primary"> MARKETING</span></div>
        <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto">
          Ayudando a emprendedores latinos a dominar TikTok e Instagram con estrategias reales, sin humo.
        </p>
        <div className="flex justify-center space-x-6 mb-8 text-sm font-semibold text-gray-300">
          <button 
            onClick={() => onOpenLegal('terms')} 
            className="hover:text-brand-primary transition-colors focus:outline-none"
          >
            Términos y Condiciones
          </button>
          <button 
            onClick={() => onOpenLegal('privacy')} 
            className="hover:text-brand-primary transition-colors focus:outline-none"
          >
            Privacidad
          </button>
          <button 
            onClick={() => onOpenLegal('support')} 
            className="hover:text-brand-primary transition-colors focus:outline-none"
          >
            Soporte
          </button>
        </div>
        <div className="text-xs text-gray-600">
          © {new Date().getFullYear()} César Quevedo Marketing Agency. Todos los derechos reservados. Lima, Perú.
        </div>
      </div>
    </footer>
  );
};

export default Footer;