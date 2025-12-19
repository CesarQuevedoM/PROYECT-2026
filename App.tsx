import Hero from "./componentes/Hero";
import Generador from "./componentes/Generador";
import Precios from "./componentes/Precios";

export default function App() {
  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      <Hero />
      <Generador />
      <Precios />
    </div>
  );
}
