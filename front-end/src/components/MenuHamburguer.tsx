const MenuHamburguer = ({ isMenuOpen, toggleMenu }) => {
  return (
    <div
      className={`menu-hamburguer ${isMenuOpen ? 'open' : ''}`}
      onClick={toggleMenu}
    >
      <div className='bar'></div>
      <div className='bar'></div>
      <div className='bar'></div>
    </div>
  );
};

export default MenuHamburguer;
