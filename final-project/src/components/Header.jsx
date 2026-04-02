import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>Suositut koirarodut</h1>
      <nav>
        <ul>
          <li><Link to="/">Etusivu</Link></li>
          <li><Link to="/rodut">Rodut</Link></li>
          <li><Link to="/hoito">Hoito</Link></li>
          <li><Link to="/koulutus">Koulutus</Link></li>
          <li><Link to="/galleria">Galleria</Link></li>
          <li><Link to="/faktat">Faktat</Link></li>
          <li><Link to="/yhteys">Yhteydenotto</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;