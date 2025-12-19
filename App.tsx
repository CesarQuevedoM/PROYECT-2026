import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import IdeaGenerator from './components/IdeaGenerator';
import StrategyAudit from './components/StrategyAudit';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import LegalModal from './components/LegalModal';
import { ViewState, UsageStats } from './types';
import { WHATSAPP_NUMBER } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [usageStats, setUsageStats] = useState<UsageStats>({
    ideasGenerated: 0,
    lastIdeaDate: '',
    auditsGenerated: 0,
    lastAuditDate: ''
  });

  // Legal Modal State
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalContent, setLegalModalContent] = useState<{ title: string, content: React.ReactNode }>({ title: '', content: null });

  // Load stats from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('cesar_saas_stats');
    if (saved) {
      const parsed: UsageStats = JSON.parse(saved);
      const today = new Date().toDateString();
      
      // Reset if new day
      if (parsed.lastIdeaDate !== today) {
        parsed.ideasGenerated = 0;
        parsed.lastIdeaDate = today;
      }
      if (parsed.lastAuditDate !== today) {
        parsed.auditsGenerated = 0;
        parsed.lastAuditDate = today;
      }
      
      setUsageStats(parsed);
      localStorage.setItem('cesar_saas_stats', JSON.stringify(parsed));
    }
  }, []);

  const saveStats = (newStats: UsageStats) => {
    setUsageStats(newStats);
    localStorage.setItem('cesar_saas_stats', JSON.stringify(newStats));
  };

  const handleUpdateIdeaUsage = (count: number) => {
    saveStats({
      ...usageStats,
      ideasGenerated: count,
      lastIdeaDate: new Date().toDateString()
    });
  };

  const handleUpdateAuditUsage = (count: number) => {
    saveStats({
      ...usageStats,
      auditsGenerated: count,
      lastAuditDate: new Date().toDateString()
    });
  };

  const handleLimitReached = () => {
    console.log('limite_diario');
    setCurrentView(ViewState.PRICING);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Legal Content Handlers
  const handleOpenLegal = (type: 'terms' | 'privacy' | 'support') => {
    let title = '';
    let content: React.ReactNode = null;

    switch (type) {
      case 'terms':
        title = 'Términos y Condiciones';
        content = (
          <>
            <p><strong>1. Uso del Servicio:</strong> Esta herramienta utiliza Inteligencia Artificial para generar ideas creativas. Los resultados son sugerencias y no garantizan resultados financieros o virales específicos.</p>
            <p><strong>2. Propiedad Intelectual:</strong> Las ideas generadas son de libre uso para el usuario. La estructura de la plataforma es propiedad de César Quevedo Marketing.</p>
            <p><strong>3. Limitación de Responsabilidad:</strong> No nos hacemos responsables por el uso indebido del contenido generado ni por cambios en los algoritmos de las redes sociales.</p>
            <p><strong>4. Pagos:</strong> El Plan Pro es un pago único por acceso a servicios de consultoría y funcionalidades extendidas. No hay reembolsos una vez entregado el servicio digital.</p>
          </>
        );
        break;
      case 'privacy':
        title = 'Política de Privacidad';
        content = (
          <>
            <p><strong>1. Datos Locales:</strong> No almacenamos tus ideas ni tu historial en servidores externos. El conteo de uso diario se guarda en tu propio navegador (LocalStorage).</p>
            <p><strong>2. Uso de API:</strong> Al generar ideas, enviamos tu texto (nicho y objetivo) a Google Gemini API para procesarlo. Google no utiliza estos datos para entrenar sus modelos públicos según sus políticas empresariales.</p>
            <p><strong>3. Cookies:</strong> Solo utilizamos cookies técnicas para el funcionamiento básico del sitio.</p>
          </>
        );
        break;
      case 'support':
        title = 'Centro de Soporte';
        content = (
          <div className="text-center">
            <p className="mb-4">¿Tienes problemas con la plataforma o necesitas ayuda con tu estrategia?</p>
            <div className="bg-green-50 p-4 rounded-xl border border-green-100 mb-4">
              <h4 className="font-bold text-green-800 mb-2">Horario de Atención</h4>
              <p>Lunes a Viernes: 9:00 AM - 6:00 PM (Hora Perú)</p>
            </div>
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola%20César,%20tengo%20un%20problema%20con%20la%20plataforma.`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#25D366] text-white font-bold rounded-lg hover:bg-[#128C7E] transition-colors w-full"
            >
              Contactar por WhatsApp
            </a>
          </div>
        );
        break;
    }
    setLegalModalContent({ title, content });
    setLegalModalOpen(true);
  };

  const renderContent = () => {
    switch (currentView) {
      case ViewState.HOME:
        return (
          <>
            <Hero onCtaClick={() => setCurrentView(ViewState.GENERATOR)} />
            <Testimonials />
            <Pricing />
          </>
        );
      case ViewState.GENERATOR:
      case ViewState.STRATEGY: // Fallback just in case
        return (
          <div className="bg-gradient-to-b from-white to-gray-50 pb-20">
            {/* Tool 1: Idea Generator */}
            <IdeaGenerator 
              usage={{ count: usageStats.ideasGenerated, date: usageStats.lastIdeaDate }}
              updateUsage={handleUpdateIdeaUsage}
              onLimitReached={handleLimitReached}
            />
            
            {/* Visual Separator */}
            <div className="max-w-4xl mx-auto px-4 my-16">
              <div className="flex items-center justify-center space-x-4">
                 <div className="h-px bg-gray-200 w-full rounded-full"></div>
                 <span className="text-gray-400 font-bold text-sm whitespace-nowrap px-4 bg-gray-50 rounded-full py-1">SIGUIENTE PASO</span>
                 <div className="h-px bg-gray-200 w-full rounded-full"></div>
              </div>
            </div>

            {/* Tool 2: Strategy Audit */}
            <StrategyAudit 
              usage={{ count: usageStats.auditsGenerated, date: usageStats.lastAuditDate }}
              updateUsage={handleUpdateAuditUsage}
              onLimitReached={handleLimitReached}
            />
          </div>
        );
      case ViewState.PRICING:
        return <Pricing />;
      default:
        return <Hero onCtaClick={() => setCurrentView(ViewState.GENERATOR)} />;
    }
  };

  const whatsappMessage = encodeURIComponent("Hola César, vengo de tu web y quiero mejorar mis ventas en redes.");

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white selection:bg-brand-primary selection:text-white">
      <Header currentView={currentView} onNavigate={setCurrentView} />
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      <Footer onOpenLegal={handleOpenLegal} />
      <ChatBot />

      <LegalModal 
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        title={legalModalContent.title}
        content={legalModalContent.content}
      />

      {/* Sticky WhatsApp CTA */}
      <a 
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#128C7E] transition-all z-50 flex items-center gap-2 group border-4 border-white/20"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.698c.93.509 1.842.769 2.806.769 3.181 0 5.767-2.587 5.767-5.766.001-3.182-2.585-5.769-5.767-5.769zm9.308 5.768c0 5.141-4.181 9.323-9.324 9.323-1.469 0-2.836-.324-4.053-.889l-5.962 1.565 1.594-5.787c-.67-1.353-1.047-2.871-1.047-4.47 0-5.141 4.181-9.323 9.324-9.323 5.144 0 9.325 4.182 9.325 9.324l-.001.257z"/>
        </svg>
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-bold whitespace-nowrap">
          Soporte 24/7
        </span>
      </a>
    </div>
  );
};

export default App;