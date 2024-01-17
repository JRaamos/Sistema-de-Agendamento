import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo-1.png';
import '../styles/home.css';
import { useContext, useState } from 'react';
import AgendamentosContext from '../context/AgendamentosContext';
import MenuHamburguer from '../components/MenuHamburguer';

function Home() {
  const { resetStates } = useContext(AgendamentosContext);
  // MenuHamburguer
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className='container-home'
      onClick={() => isMenuOpen && setIsMenuOpen(false)}
    >
      <nav className={`menu ${isMenuOpen ? 'active' : ''}`}>
        <Link to='/login'>Login</Link>
      </nav>
      <MenuHamburguer isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <div className='container-logo-button'>
        <section className='section-logo'>
          <img src={logo} alt='logo' className='img-logo' />
        </section>
        <section>
          <p className='p-text'>Escolha seu Barbeiro</p>
          <Link
            to='/schedules'
            className='barbeiro'
            onClick={() => {
              resetStates();
            }}
          >
            Barbeiro Cleberson Silva (CHUCA)
          </Link>
        </section>
      </div>
      <footer className='footer'>
        <p>© 2023-2024 <Link to='https://jonathanfebraio.com/' target='_blank' className='link-site'>
           Jonathan Febraio.</Link> All rights reserved.</p>
      </footer>
    </div>
  );
}
export default Home;
