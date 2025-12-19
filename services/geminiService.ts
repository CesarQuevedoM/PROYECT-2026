import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ContentIdea, StrategyAudit } from "../types";
import { FALLBACK_IDEAS, MOCK_AUDIT } from "../constants";

const apiKey = process.env.API_KEY || '';
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const generateContentIdeas = async (niche: string, brandName: string, productGoal: string, strategy: string): Promise<ContentIdea[]> => {
  console.log('generar_idea_estrategica', { niche, brandName, productGoal, strategy });
  
  if (!ai) {
    console.warn("API Key missing, using fallback data");
    return new Promise(resolve => setTimeout(() => resolve(FALLBACK_IDEAS), 1500));
  }

  try {
    // Prompt estratégico avanzado
    const prompt = `Actúa como un estratega senior de TikTok e Instagram especializado en el mercado Latino.
    
    INFORMACIÓN DEL CLIENTE:
    - Nombre de Marca/Cuenta: "${brandName}"
    - Nicho de Mercado: "${niche}"
    - LO QUE QUIERE VENDER O LOGRAR: "${productGoal}"
    - ESTRATEGIA SELECCIONADA: "${strategy}"

    INSTRUCCIONES DE BÚSQUEDA Y CREACIÓN:
    1. Si la estrategia es "Copiar Mercado X", busca en Google tendencias actuales de ese mercado específico (ej: China/Douyin, USA/Reels, Europa) relacionadas con el nicho.
    2. Si la estrategia es "Ventas", busca formatos de alta conversión (High Converting Ads/Organic).
    3. Si la estrategia es "Visitas", busca audios y formatos virales del momento.

    GENERA 3 IDEAS DE CONTENIDO (DISTINTAS):
    - Deben estar diseñadas para cumplir el objetivo: "${productGoal}".
    - Deben aplicar la lógica de la estrategia: "${strategy}".
    - Adapta todo culturalmente a Latinoamérica (Perú).
    - Donde sea relevante, sugiere cómo integrar visualmente el nombre de la marca "${brandName}".

    REGLAS ESTRICTAS DE LENGUAJE Y TONO:
    - Usa Español Latino Neutro y Comercial (Estilo "Aesthetic" / Profesional).
    - PROHIBIDO USAR PALABRAS ESPAÑOLAS: "Chulísimo", "Guay", "Mola", "Vosotros", "Os", "Pasta" (dinero).
    - PROHIBIDO USAR JERGA INFORMAL ESPECÍFICA: No uses la palabra "Tono" (usa fiesta, evento, salida), no uses "Jato" (usa casa), no uses jerga callejera excesiva.
    - Usa términos de marketing digital actuales: "Aesthetic", "Viral", "Trend", "POV", "Storytime".

    IMPORTANTE: Devuelve la respuesta en formato JSON puro.
    Estructura:
    {
      "ideas": [
        {
          "concept": "Nombre del Concepto (ej: Formato Asiático Adaptado)",
          "whyItWorks": "Explicación breve de por qué funciona según la estrategia '${strategy}'",
          "variants": [
            { "title": "Opción A (Principal)", "hook": "Texto Gancho (Visual/Auditivo)", "description": "Guion detallado paso a paso." },
            { "title": "Opción B (Alternativa)", "hook": "Texto Gancho (Dolor/Deseo)", "description": "Guion detallado paso a paso." }
          ]
        }
      ]
    }`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
      }
    });

    // Extract grounding metadata (sources)
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = groundingChunks
      .map(chunk => chunk.web)
      .filter(web => web?.uri && web?.title)
      .map(web => ({ uri: web!.uri!, title: web!.title! }));

    const json = JSON.parse(response.text || '{}');
    
    if (json.ideas && Array.isArray(json.ideas)) {
        return json.ideas.map((idea: any, index: number) => ({
            ...idea,
            id: `gen-${Date.now()}-${index}`,
            sources: index === 0 ? sources : [] // Attach sources to the first idea for display
        }));
    }
    return FALLBACK_IDEAS;

  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback if search fails or model overloads
    return FALLBACK_IDEAS;
  }
};

export const generateStrategyAudit = async (description: string): Promise<StrategyAudit> => {
  console.log('generar_auditoria', { description });

  if (!ai) {
    return new Promise(resolve => setTimeout(() => resolve(MOCK_AUDIT as any), 1500));
  }

  try {
    // Use gemini-3-pro-preview with Thinking for deep analysis
    const prompt = `Analiza este perfil de TikTok/Instagram: "${description}".
    Piensa profundamente sobre la estrategia, competencia y psicología del consumidor.
    Dame una auditoría con: Score (0-100), 3 Fortalezas, 3 Debilidades, 1 Quick Win y un párrafo de Análisis profundo.
    Devuelve JSON puro.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 32768 }, // High budget for deep reasoning
        responseMimeType: "application/json",
      }
    });

    const json = JSON.parse(response.text || '{}');
    if (json.score) {
        return json as StrategyAudit;
    }
    return MOCK_AUDIT as any;

  } catch (error) {
    console.error("Gemini Audit Error:", error);
    return MOCK_AUDIT as any;
  }
};

export const chatWithBot = async (history: {role: string, parts: {text: string}[]}[], message: string) => {
  if (!ai) return "El chat no está disponible sin API Key.";
  
  try {
    // Usamos gemini-3-flash-preview que es estable y potente para chat
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      history: history,
      config: {
        systemInstruction: `Eres 'César AI', el asistente inteligente de la agencia.
        REGLAS DE RESPUESTA:
        1. Responde a CUALQUIER pregunta que te haga el usuario de forma coherente y útil.
        2. Sé EXTREMADAMENTE DIRECTO y RESUMIDO (Máximo 2 párrafos cortos).
        3. Tono: Profesional, empático y experto.
        4. Si preguntan específicamente por precios complejos, auditorías humanas o servicios personalizados, cierra sugiriendo contactar a César por WhatsApp.
        5. Nunca digas "no puedo responder eso" a menos que sea ofensivo. Intenta ayudar siempre.`
      }
    });
    
    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (e) {
    console.error(e);
    return "Tuve un pequeño problema de conexión. Intenta de nuevo.";
  }
};