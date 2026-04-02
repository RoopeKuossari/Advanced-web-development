function Koulutus() {
  return (
    <div className="koulutus-sivu">
      <h2>Koiran Koulutus</h2>
      <p>Koulutus on tärkeä osa koiran ja omistajan välistä suhdetta. Se auttaa koiraa ymmärtämään odotukset ja toimimaan yhteiskunnassa turvallisesti.</p>

      <div className="koulutus-video">
        <h3>Peruskäskyt: Istu, Paikka, Tänne</h3>
        <div className="video-container">
          <iframe 
            src="https://www.youtube.com/embed/jFMA5ggFsXU" 
            title="Koiran koulutusvideo"
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen>
          </iframe>
        </div>
      </div>

      <div className="koulutus-video">
        <h3>Hihnassa kulkeminen</h3>
        <div className="video-container">
          <iframe 
            src="https://www.youtube.com/embed/u_v_LzV2yZ4" 
            title="Hihnkävely koulutus"
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen>
          </iframe>
        </div>
      </div>
    </div>
  );
}

export default Koulutus;