import { ContentIdea } from './types';

export const WHATSAPP_NUMBER = "51942123780";
export const FREE_IDEAS_LIMIT = 3;
export const FREE_AUDIT_LIMIT = 1;

export const FALLBACK_IDEAS: ContentIdea[] = [
  {
    id: 'fallback-1',
    concept: 'Estrategia de "Copia Creativa" (Formato Asiático)',
    whyItWorks: 'Este formato visual rápido retiene la atención y funciona para Ventas sin ser agresivo.',
    variants: [
      {
        title: 'Transición de Producto',
        hook: '¿Crees que esto es magia?',
        description: 'Muestra el producto en uso con cortes al ritmo de la música (estilo Douyin), enfocando en el resultado final.'
      },
      {
        title: 'ASMR de Servicio',
        hook: 'El sonido de la calidad...',
        description: 'Si vendes servicios, graba el proceso sin hablar, solo sonidos satisfactorios del trabajo bien hecho.'
      }
    ]
  },
  {
    id: 'fallback-2',
    concept: 'Narrativa de Autoridad (Formato USA)',
    whyItWorks: 'Genera confianza inmediata para High-Ticket o Servicios.',
    variants: [
      {
        title: 'Desmintiendo Mitos',
        hook: 'Deja de hacer esto si quieres [Resultado]...',
        description: 'Toma una creencia común de tu nicho y explícala con datos, posicionándote como experto.'
      },
      {
        title: 'POV: Cliente Satisfecho',
        hook: 'Lo que nadie te dice de [Tu Servicio]...',
        description: 'Cuenta una historia de transformación de un cliente real, enfocada en el beneficio emocional.'
      }
    ]
  },
  {
    id: 'fallback-3',
    concept: 'Formato de Identificación (Tendencia Latina)',
    whyItWorks: 'Conecta emocionalmente usando situaciones cotidianas o humor relatable.',
    variants: [
      {
        title: 'Expectativa vs Realidad',
        hook: 'Yo pensando que sería fácil...',
        description: 'Usa humor para mostrar un problema común de tu cliente ideal y cómo tu producto es la solución real.'
      },
      {
        title: 'El "Hack" Secreto',
        hook: 'Ojalá hubiera sabido esto antes...',
        description: 'Comparte un tip rápido y útil relacionado con tu nicho que demuestre que sabes de lo que hablas.'
      }
    ]
  }
];

export const MOCK_AUDIT = {
  score: 75,
  strengths: ["Buena frecuencia de publicación", "Estética visual coherente"],
  weaknesses: ["Falta de llamados a la acción (CTA)", "Poco uso de audios en tendencia"],
  quickWin: "Añade un texto gancho en los primeros 3 segundos de tus próximos 3 reels.",
  analysis: "Tu perfil tiene una base sólida visualmente, pero carece de una estrategia de conversión clara. Estás entreteniendo, pero no vendiendo. Necesitamos ajustar los guiones para dirigir el tráfico a WhatsApp."
};