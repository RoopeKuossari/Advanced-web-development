function FormResponse({ formData, response }) {
  return (
    <div style={{ marginTop: "20px" }}>

      <h3>✅ Lomake lähetetty onnistuneesti</h3>

      {/* SENT DATA */}
      <div style={{
        background: "#f7fff7",
        padding: "15px",
        borderRadius: "8px",
        marginBottom: "15px",
        border: "1px solid #6B8E23"
      }}>
        <h4>Lähetetty data</h4>
        <p><strong>Nimi:</strong> {formData.name}</p>
        <p><strong>Sähköposti:</strong> {formData.email}</p>
        <p><strong>Ikä:</strong> {formData.age || "Ei annettu"}</p>
        <p><strong>Päivämäärä:</strong> {formData.date || "Ei valittu"}</p>
        <p><strong>Uutiskirje:</strong> {formData.subscribe ? "Kyllä" : "Ei"}</p>
      </div>

      {/* SERVER RESPONSE */}
      <div style={{
        background: "#f0f8ff",
        padding: "15px",
        borderRadius: "8px",
        border: "1px solid #ccc"
      }}>
        <h4>Serverin vastaus (httpbin)</h4>

        <p><strong>URL:</strong> {response.url}</p>

        <p><strong>Palautettu JSON:</strong></p>
        <pre style={{
          background: "#eee",
          padding: "10px",
          overflowX: "auto"
        }}>
          {JSON.stringify(response.json, null, 2)}
        </pre>
      </div>

    </div>
  );
}

export default FormResponse;