const koirarodut = [
  {
    id: "beagle",
    nimi: "Beagle",
    kuva: "/public/kuvat/beagle.jpg",
    pituus: "33-41 cm",
    paino: "9-18 kg",
    ika: "12-15 vuotta",
    kuvaus: "Beagle on pieni- tai keskikokoinen metsästyskoira, joka tunnetaan ystävällisestä luonteestaan, uteliaisuudestaan ja hyvästä hajuaististaan. Se sopii aktiiviselle perheelle ja nauttii ulkoilusta ja leikeistä."
  },
  {
    id: "chihuahua",
    nimi: "Chihuahua",
    kuva: "/public/kuvat/chihuahua.avif",
    pituus: "15-23 cm",
    paino: "1-3 kg",
    ika: "12-20 vuotta",
    kuvaus: "Chihuahua on pieni ja eloisa seurakoira, tunnettu uskollisuudestaan ja rohkeasta luonteestaan. Se sopii hyvin kaupunkiasumiseen ja viihtyy lähellä omistajaansa."
  },
  {
    id: "dobermanni",
    nimi: "Dobermanni",
    kuva: "/public/kuvat/dobermanni.jpeg",
    pituus: "63-72 cm",
    paino: "32-45 kg",
    ika: "10-13 vuotta",
    kuvaus: "Dobermann on keskikokoinen tai suuri koira, älykäs, valpas ja suojeluhenkinen. Se sopii aktiiviseen kotiin ja tarvitsee paljon liikuntaa sekä koulutusta."
  },
  {
    id: "kultainennoutaja",
    nimi: "Kultainennoutaja",
    kuva: "/public/kuvat/kultainennoutaja.jpeg",
    pituus: "51-61 cm",
    paino: "25-40 kg",
    ika: "10-12 vuotta",
    kuvaus: "Kultainennoutaja on ystävällinen, lempeä ja seurallinen koira, joka sopii erinomaisesti perhekoiraksi. Se nauttii liikunnasta, leikeistä ja ihmisten seurasta."
  },
  {
    id: "labradori",
    nimi: "Labradorinnoutaja",
    kuva: "/public/kuvat/labradori.png",
    pituus: "54-57 cm",
    paino: "25-36 kg",
    ika: "10-12,5 vuotta",
    kuvaus: "Labradorinnoutaja on ystävällinen, energinen ja älykäs koira, joka sopii erinomaisesti perhekoiraksi ja harrastuskoiraksi. Se rakastaa ulkoilua, leikkejä ja uimista."
  },
  {
    id: "saksanpaimen",
    nimi: "Saksanpaimenkoira",
    kuva: "/public/kuvat/saksanpaimenkoira.jpg",
    pituus: "55-65 cm",
    paino: "22-40 kg",
    ika: "10-14 vuotta",
    kuvaus: "Saksanpaimenkoira on älykäs, uskollinen ja valpas koira, joka sopii hyvin työkoiraksi, harrastuskoiraksi ja perheeseen. Se tarvitsee säännöllistä liikuntaa ja henkistä virikettä."
  },
  {
    id: "suomenajokoira",
    nimi: "Suomenajokoira",
    kuva: "/public/kuvat/suomenajokoira.jpg",
    pituus: "52-61 cm",
    paino: "20-30 kg",
    ika: "10-15 vuotta",
    kuvaus: "Suomenajokoira on keskikokoinen ja kestävä metsästyskoira, tunnettu hyvästä hajuaististaan ja aktiivisuudestaan. Se tarvitsee paljon liikuntaa ja virikkeitä, mutta on myös uskollinen kumppani."
  },
  {
    id: "suomenlapinkoira",
    nimi: "Suomenlapinkoira",
    kuva: "/public/kuvat/suomenlapinkoira.jpg",
    pituus: "41-52 cm",
    paino: "11-25 kg",
    ika: "12-14 vuotta",
    kuvaus: "Suomenlapinkoira on keskikokoinen ja älykäs koira, alun perin poronhoitoon käytetty. Se on uskollinen, valpas ja aktiivinen, ja sopii hyvin liikunnalliseen kotiin."
  },
  {
    id: "husky",
    nimi: "Siperianhusky",
    kuva: "/public/kuvat/husky.jpg",
    pituus: "50,5-60 cm",
    paino: "15,5-28 kg",
    ika: "13-16 vuotta",
    kuvaus: "Siperianhusky on keskikokoinen ja energinen koira, tunnettu kestävyydestään ja laumauskollisuudestaan. Se tarvitsee paljon liikuntaa ja sopii aktiiviseen kotiin, jossa saa juosta ja leikkiä."
  },
  {
    id: "tanskandoggi",
    nimi: "Tanskandoggi",
    kuva: "/public/kuvat/tanskandoggi.jpg",
    pituus: "72-90 cm",
    paino: "50-90 kg",
    ika: "6-10 vuotta",
    kuvaus: "Tanskandoggi on suuri ja lempeä koira, joka tunnetaan rauhallisuudestaan ja ystävällisyydestään. Se sopii perhekoiraksi, mutta tarvitsee tilaa ja säännöllistä liikuntaa pysyäkseen terveenä."
  }
];

function Rodut() {
  return (
    <div className="rodut-container">
      {/* Sivunavigaatio */}
      <aside className="rodut-nav">
        <nav>
          <ul>
            {koirarodut.map(rotu => (
              <li key={rotu.id}>
                <a href={`#${rotu.id}`}>{rotu.nimi}</a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Rodut ja niiden tiedot */}
      <section>
        {koirarodut.map(rotu => (
          <article key={rotu.id} id={rotu.id} className="rodut-box-wrapper">
            <h2>{rotu.nimi}</h2>
            <div className="rodut-tiedot">
              <img src={rotu.kuva} alt={rotu.nimi} />
              <div className="rodut-info">
                <p><strong>Pituus:</strong> {rotu.pituus}</p>
                <p><strong>Paino:</strong> {rotu.paino}</p>
                <p><strong>Elinikä:</strong> {rotu.ika}</p>
              </div>
            </div>
            <p className="rodut-kuvaus">{rotu.kuvaus}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

export default Rodut;