export default function Hero() {
  return (
    <section style={{ padding: 40, textAlign: "center" }}>
      <h1 style={{ fontSize: 32, color: "#FF0050" }}>
        Agencia de Marketing CESAR
      </h1>
      <p>
        Genera ideas de contenido para TikTok e Instagram que venden.
      </p>
      <button
        style={{
          marginTop: 20,
          padding: "16px 24px",
          fontSize: 18,
          background: "#FF0050",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        Generar ideas gratis
      </button>
    </section>
  );
}
