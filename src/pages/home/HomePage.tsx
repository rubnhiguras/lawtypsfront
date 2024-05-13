import React from 'react';
import './HomePage.css'
const HomePage : React.FC = () => {

    function toLogin() {
        window.location.href = './login';
    }

    return (
        <div id="home-page" className="home-page">
            <div id="headersection" className="hero-section">
                <div id="hero-text" className="hero-text">
                    <h1>
                        <img src="/src/assets/lawyer_icon_white.svg" alt="Logo LawTyps" width={50} />
                        &nbsp;LawTyps&nbsp;
                        <img src="/src/assets/lawyer_icon_white.svg" alt="Logo LawTyps" width={50}/>   
                    </h1>
                    <p>
                        La mejor herramienta para el ámbito legal.

                        Fácil, intutiva y transparente.
                    </p>
                    <div id="call-to-action" className="call-to-action">
                        <div className="cta-text">
                            <h2>¡Empiece ya! Solo le llevará un momento</h2>
                            <button id="cta-btn" className="cta-btn" onClick={toLogin}>Entrar en la plataforma</button>
                        </div>
                    </div>
                </div>
                <div id="hero-image" className="hero-image">
                    
                </div>
            </div>
            <div id="features-section" className="features-section">
                <div className="feature">
                    <i className="fas fa-chart-line"></i>
                    <h3>Abogados y Juristas</h3>
                    <p>Registrese en la plataforma y tendrá acceso a una amplia cartera de potenciales clientes. Asesorias, representación y demás soluciones legales.</p>
                </div>
                <div className="feature">
                    <i className="fas fa-code"></i>
                    <h3>Tengo un poblema legal</h3>
                    <p>¡No se preocupe! Si se registra en la plataforma, tendrá acceso a su disposición de abogados, juristas y personas del ámbito legal para dar solución a su problema.</p>
                </div>
                <div className="feature">
                    <i className="fas fa-rocket"></i>
                    <h3>Siempre actualizados</h3>
                    <p>La herramienta Lawtyps utiliza tecnología de vanguardia aunque, cualquier sugerencia puede ponerse en contacto con soporte. Tiene la información en la sección de contacto.</p>
                </div>
            </div>
            <div id="contactsection" className="hero-section" >
                <div className="hero-text">
                    <h2>Contacto</h2>
                    <p>
                        Estamos a su disposición
                    </p><p>
                        Teléfono: +54546354383435
                    </p><p>
                        Correo electrónico: bustia@lawtyps.es
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;