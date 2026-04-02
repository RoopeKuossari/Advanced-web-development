function Hoito() {
  return (
    <div className="rodut-container"> {/* Käytetään samaa CSS-luokkaa asettelun vuoksi */}
      <aside className="hoito-nav">
        <nav>
          <ul>
            <li><a href="#ruokinta">Ruokinta</a></li>
            <li><a href="#liikunta">Liikunta</a></li>
            <li><a href="#terveys">Terveys</a></li>
            <li><a href="#turkinhoito">Turkinhoito</a></li>
          </ul>
        </nav>
      </aside>

      <section>
        <article id="ruokinta">
          <h2>Ruokinta</h2>
          <p>Koiran ruokinta on yksi sen terveyden kulmakivistä. Tasapainoinen ruokavalio, joka sisältää tarvittavat ravintoaineet, vitamiinit ja kivennäisaineet, auttaa koiraa pysymään terveenä ja elinvoimaisena.</p>
        </article>

        <article id="liikunta">
          <h2>Liikunta</h2>
          <p>Säännöllinen liikunta on välttämätöntä koiran fyysiselle ja psyykkiselle hyvinvoinnille. Liikunnan määrä ja laatu riippuvat koiran rodusta, iästä ja terveydentilasta.</p>
        </article>

        <article id="terveys">
          <h2>Terveys</h2>
          <p>Koiran terveyden ylläpitoon kuuluu säännölliset rokotukset, madotukset ja terveystarkastukset. On tärkeää seurata koiran vointia ja viedä se eläinlääkäriin, jos huomaat merkkejä sairauksista.</p>
        </article>

        <article id="turkinhoito">
          <h2>Turkinhoito</h2>
          <p>Turkinhoito vaihtelee rodun mukaan. Jotkut rodut tarvitsevat päivittäistä harjausta, kun taas toisille riittää pesu tarvittaessa. Säännöllinen turkinhoito auttaa pitämään koiran ihon ja turkin kunnossa.</p>
        </article>
      </section>
    </div>
  );
}

export default Hoito;