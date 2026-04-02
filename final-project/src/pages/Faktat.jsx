const koiraFaktat = [
  {
    id: 1,
    otsikko: "Hajuaisti",
    teksti: "Koiran hajuaisti on jopa 10 000 – 100 000 kertaa tarkempi kuin ihmisen. Ne pystyvät tunnistamaan sairauksia ja jopa tunteita hajun perusteella."
  },
  {
    id: 2,
    otsikko: "Älykkyys",
    teksti: "Keskivertokoiran älykkyys vastaa noin 2-vuotiaan lapsen tasoa. Ne voivat oppia keskimäärin 165 sanaa tai merkkiä."
  },
  {
    id: 3,
    otsikko: "Unet",
    teksti: "Koirat näkevät unta samalla tavalla kuin ihmiset. Jos koirasi tassut liikkuvat tai se murisee unissaan, se on todennäköisesti jahtaamassa unileikkiä!"
  },
  {
    id: 4,
    otsikko: "Hikoilu",
    teksti: "Koirat eivät hikoile ihon läpi kuten ihmiset. Ne viilentävät itseään pääasiassa läähättämällä ja hikoilemalla tassunpohjiensa kautta."
  },
  {
    id: 5,
    otsikko: "Yksilöllinen nenä",
    teksti: "Koiran nenän kuviointi on yhtä yksilöllinen kuin ihmisen sormenjälki. Sitä voitaisiin periaatteessa käyttää koiran tunnistamiseen."
  },
  {
    id: 6,
    otsikko: "Häntäviestintä",
    teksti: "Hännän heilutus ei aina tarkoita iloa. Se on monimutkainen viestintäväline, joka voi kertoa myös jännityksestä, epävarmuudesta tai varoituksesta."
  }
];

function Faktat() {
  return (
    <div className="faktat-sivu">
      <section className="etusivu-esittely">
        <h2>Mielenkiintoisia koirafaktoja</h2>
        <p>Tiesitkö näitä asioita parhaasta ystävästämme?</p>
      </section>

      <div className="fakta-container">
        {koiraFaktat.map((fakta) => (
          <div key={fakta.id} className="fakta-kortti">
            <h3>{fakta.otsikko}</h3>
            <p>{fakta.teksti}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Faktat;