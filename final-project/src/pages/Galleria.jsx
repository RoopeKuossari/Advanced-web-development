const kuvat = [
  { id: 1, src: "/public/kuvat/beagle.jpg", alt: "Beagle", teksti: "Beagle" },
  { id: 2, src: "/public/kuvat/chihuahua.avif", alt: "Chihuahua", teksti: "Chihuahua" },
  { id: 3, src: "/public/kuvat/dobermanni.jpeg", alt: "Dobermanni", teksti: "Dobermanni" },
  { id: 4, src: "/public/kuvat/kultainennoutaja.jpeg", alt: "Kultainennoutaja", teksti: "Kultainennoutaja" },
  { id: 5, src: "/public/kuvat/labradori.png", alt: "Labradorinnoutaja", teksti: "Labradorinnoutaja" },
  { id: 6, src: "/public/kuvat/saksanpaimenkoira.jpg", alt: "Saksanpaimenkoira", teksti: "Saksanpaimenkoira" },
  { id: 7, src: "/public/kuvat/suomenajokoira.jpg", alt: "Suomenajokoira", teksti: "Suomenajokoira" },
  { id: 8, src: "/public/kuvat/suomenlapinkoira.jpg", alt: "Suomenlapinkoira", teksti: "Suomenlapinkoira" },
  { id: 9, src: "/public/kuvat/husky.jpg", alt: "Siperianhusky", teksti: "Siperianhusky" },
  { id: 10, src: "/public/kuvat/tanskandoggi.jpg", alt: "Tanskandoggi", teksti: "Tanskandoggi" }
];

function Galleria() {
  return (
    <div className="galleria-sivu">
      <h2>Koiragalleria</h2>
      <p>Täältä löydät kuvia eri koiraroduista niiden luonnollisessa ympäristössä.</p>
      
      <div className="gallery-container">
        {kuvat.map((kuva) => (
          <figure key={kuva.id} className="gallery-kuva">
            <img src={kuva.src} alt={kuva.alt} />
            <figcaption>{kuva.teksti}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default Galleria;