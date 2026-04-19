import { useState } from 'react';

function Yhteys() {
  // Luodaan tila (state) lomakkeen tiedoille
  const [lomake, setLomake] = useState({
    nimi: '',
    sahkoposti: '',
    koiranomistaja: false,
    ika: '',
    pvm: '',
    asia: '',
    viesti: ''
  });

  // Päivitetään tilaa, kun käyttäjä kirjoittaa
  const kasitteleMuutos = (e) => {
    const { name, value, type, checked } = e.target;
    setLomake({
      ...lomake,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const lahetaLomake = (e) => {
    e.preventDefault();
    console.log("Lähetetyt tiedot:", lomake);
    alert("Kiitos viestistäsi! (Tämä on vain simulaatio, tiedot tulostuivat konsoliin).");
  };

  return (
    <section className="yhteys-lomake">
      <h2>Lähetä meille viesti</h2>
      <form onSubmit={lahetaLomake}>
        
        <fieldset>
          <legend>Yhteystiedot</legend>
          <label htmlFor="nimi">Nimi:</label>
          <input 
            type="text" id="nimi" name="nimi" 
            value={lomake.nimi} onChange={kasitteleMuutos} required 
          />
          
          <label htmlFor="sahkoposti">Sähköposti:</label>
          <input 
            type="email" id="sahkoposti" name="sahkoposti" 
            value={lomake.sahkoposti} onChange={kasitteleMuutos} required 
          />
        </fieldset>

        <fieldset>
          <legend>Viestin tiedot</legend>
          <div className="checkbox-ryhma">
            <input 
              type="checkbox" id="koiranomistaja" name="koiranomistaja" 
              checked={lomake.koiranomistaja} onChange={kasitteleMuutos} 
            />
            <label htmlFor="koiranomistaja">Omistan koiran</label>
          </div>

          <label htmlFor="ika">Koiran ikä (vuosia):</label>
          <input 
            type="number" id="ika" name="ika" min="0" max="30" 
            value={lomake.ika} onChange={kasitteleMuutos} 
          />

          <label htmlFor="pvm">Toivottu yhteydenottopäivä:</label>
          <input 
            type="date" id="pvm" name="pvm" 
            value={lomake.pvm} onChange={kasitteleMuutos} 
          />
          
          <label htmlFor="asia">Mitä asia koskee:</label>
          <select id="asia" name="asia" value={lomake.asia} onChange={kasitteleMuutos} required>
            <option value="" disabled>-- Valitse aihe --</option>
            <option value="rotu">Rotu</option>
            <option value="hoito">Hoito</option>
            <option value="koulutus">Koulutus</option>
            <option value="muu">Muu</option>
          </select>
          
          <label htmlFor="viesti">Viesti:</label>
          <textarea 
            id="viesti" name="viesti" rows="6" 
            value={lomake.viesti} onChange={kasitteleMuutos} required 
          ></textarea>
        </fieldset>

        <button type="submit">Lähetä viesti</button>
      </form>
    </section>
  );
}

export default Yhteys;