/*import { useState } from 'react'
import reactLogo from '../../assets/react.svg'
import AppLogo from '../../assets/lawyer_icon.svg'
import loginLogo from '../../assets/login.svg'
import viteLogo from '/vite.svg'
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button'*/
import './HomePage.css'

function HomePage() {
  /*const [count, setCount] = useState(0);
  const start = <a href="/" target="_blank"><img src={AppLogo} className="logo app" alt="App logo" /></a>;
  const end = <a href="./Login"><img src={loginLogo} className="logo login" alt="Log in" /></a>;*/

  return (
    <>
    <header>
        <h1>Servicios Legales </h1>
        <p>Soluciones jurídicas profesionales para tus necesidades</p>
    </header>

    <section className="intro-section">
        <h2>¿Enfrentando un problema legal? </h2>
        <p>Nuestro equipo de abogados expertos está aquí para ayudarte.</p>
        <br/><a href="./Login" className="cta-button">Iniciar Sesión</a> 
    </section>

    <section className="services-section">
        <h2>Nuestros Servicios</h2>
        <div className="service-card">
            <h3>Asesoramiento Legal</h3>
            <p>Ofrecemos asesoramiento legal experto en una amplia gama de áreas.</p>
        </div>
        <div className="service-card">
            <h3>Representación en Cortes</h3>
            <p>Nuestros abogados están listos para representarte en procedimientos judiciales.</p>
        </div>
        <div className="service-card">
            <h3>Contratos y Acuerdos</h3>
            <p>Redacción y revisión de contratos para proteger tus intereses.</p>
        </div>
    </section>

    <section className="cta-section">
        <h2>¿Necesitas ayuda legal?</h2>
        <p>Contáctanos hoy mismo para una consulta gratuita.</p>
        <button className="cta-button">Contactar</button>       
    </section>

    <section className="contact-section">
        <h2>Contacto</h2>
        <p>Ponte en contacto con nosotros para más información:</p>
        <p>Teléfono: 123-456-7890</p>
        <p>Correo Electrónico: info@servicioslegales.com</p>
    </section>    
    </>
  )
}

export default HomePage
