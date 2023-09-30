import logo from "../images/logo-1.png";

export default function Home() {

  return (
    <div className="container-home" >
      <section className="section-logo">
        <img src={logo} alt="logo" className="img-logo" />
      </section>
      <section>
      <p className="p-text">Escolha seu Barbeiro</p>
        <button className="barbeiro"> Barbeiro Cleberson Silva (CHUCA) </button>
      </section>
      <footer className="footer">
        <p>© 2023 Jonathan Febraio. All rights reserved.</p>
      </footer>
    </div>
  );
}
