import React from 'react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      text: "Antes me estresaba cada mañana pensando qué grabar. Ahora tengo una estructura clara y consistente. Mis seguidoras notaron el cambio de calidad de inmediato.",
      author: "Sofía R.",
      role: "Marca de Ropa Independiente"
    },
    {
      text: "Más que viralidad, buscaba ventas. La auditoría me ayudó a ajustar mis llamados a la acción y pasé de tener solo 'likes' a tener conversaciones reales por WhatsApp.",
      author: "Dr. Andrés V.",
      role: "Odontología Estética"
    },
    {
      text: "Lo valioso es el contexto. No son traducciones de tendencias gringas, son estrategias pensadas para cómo consume el usuario aquí en Perú. Muy aterrizado.",
      author: "Claudia M.",
      role: "Cafetería de Especialidad"
    }
  ];

  return (
    <div className="bg-white py-16 border-t border-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-center font-display text-2xl font-bold mb-10">Lo que dicen los emprendedores</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-shadow duration-300">
              <div className="text-brand-primary text-4xl font-serif mb-4 leading-none opacity-30">"</div>
              <p className="text-gray-700 mb-6 text-sm italic leading-relaxed">{t.text}</p>
              <div className="border-t border-gray-200 pt-4">
                <div className="font-bold text-gray-900">{t.author}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;