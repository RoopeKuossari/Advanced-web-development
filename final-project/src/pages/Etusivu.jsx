import { Link } from 'react-router-dom';

function Etusivu() {
  return (
    <div className="etusivu-esittely">
      <h2>Tervetuloa KoiranMaailmaan!</h2>
      <p>Löydät täältä tietoa suosituista koiraroduista, niiden hoidosta ja koulutuksesta.</p>
      
      <div className="etusivu-linkit">
        <Link to="/rodut" className="linkki-kortti rodut">
          <h3>Rodut</h3>
          <p>Tutustu eri koirarotuihin ja niiden ominaisuuksiin.</p>
        </Link>
        <Link to="/hoito" className="linkki-kortti hoito">
          <h3>Hoito</h3>
          <p>Lue vinkkejä koiran päivittäiseen hoitoon ja hyvinvointiin.</p>
        </Link>
        <Link to="/koulutus" className="linkki-kortti koulutus">
          <h3>Koulutus</h3>
          <p>Opi perusasiat koiran kouluttamisesta ja tapakasvatuksesta.</p>
        </Link>
      </div>
    </div>
  );
}

export default Etusivu;