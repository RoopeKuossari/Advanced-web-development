import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Etusivu from './pages/Etusivu';
import Rodut from './pages/Rodut';
import Hoito from './pages/Hoito';
import Koulutus from './pages/Koulutus';
import Galleria from './pages/Galleria';
import Faktat from './pages/Faktat';
import Yhteys from './pages/Yhteys'; // <--- Viimeinen import!

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Etusivu />} />
          <Route path="/rodut" element={<Rodut />} />
          <Route path="/hoito" element={<Hoito />} />
          <Route path="/koulutus" element={<Koulutus />} />
          <Route path="/galleria" element={<Galleria />} />
          <Route path="/faktat" element={<Faktat />} />
          <Route path="/yhteys" element={<Yhteys />} /> {/* <--- Valmis! */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;