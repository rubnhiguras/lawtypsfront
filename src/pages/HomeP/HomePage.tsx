import './HomePage.css'
import packageJson from '../../../package.json';

function HomePage() {

    document.title = document.title = packageJson.title + ' ' + 'Home';

    function toLogin() {
        window.location.href = '/User/';
    }

    const logo_white = <svg width={50} xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 122.88 104.6" transform="matrix(1, 0, 0, 1, 0, 0)"> <g><path d="M72.57,19.81L72.57,19.81c2.3,2.3,2.35,6.01,0.1,8.26l-1.21,1.21l9.75,9.59L56.55,62.64l-9.5-9.84L10.02,89.83 c-2.24,2.24-5.96,2.2-8.26-0.1l0,0c-2.3-2.3-2.35-6.01-0.1-8.26l37.17-37.17l-7.44-7.73L54.7,12.79l8.35,8.19l1.28-1.28 C66.56,17.46,70.27,17.51,72.57,19.81L72.57,19.81L72.57,19.81z M122.88,99.89c0,2.59-2.06,4.71-4.59,4.71l-53.01,0.01 c-2.53,0-4.59-2.12-4.59-4.71c0-2.54,2.02-4.71,4.59-4.71h5.65c-1.42-0.8-2.39-2.35-2.39-4.13c0-2.54,2.02-4.71,4.59-4.71l37.3,0 c2.53-0.01,4.6,2.11,4.6,4.7l0,0c0,1.78-0.98,3.34-2.41,4.14h5.66C120.82,95.18,122.88,97.3,122.88,99.89L122.88,99.89 L122.88,99.89z M53.68,1.4L53.68,1.4c1.83,1.83,1.87,4.79,0.08,6.57l-27.2,27.2c-1.79,1.79-4.74,1.75-6.57-0.08l0,0 c-1.83-1.83-1.87-4.79-0.08-6.57l27.2-27.2C48.9-0.47,51.85-0.43,53.68,1.4L53.68,1.4L53.68,1.4z M92.35,40.06L92.35,40.06 c1.83,1.83,1.87,4.79,0.08,6.57l-27.2,27.2c-1.79,1.79-4.74,1.75-6.57-0.08l0,0c-1.83-1.83-1.87-4.79-0.08-6.57l27.2-27.2 C87.56,38.19,90.51,38.23,92.35,40.06L92.35,40.06L92.35,40.06z" fill="#fffefe" /></g></svg>;

    return (
        <div id="home-page" className="home-page">
            <div id="headersection" className="hero-section">
                <div id="hero-text" className="hero-text">
                    <h1>
                        {logo_white}
                        &nbsp;LawTyps&nbsp;
                    </h1>
                    <p>
                        La mejor herramienta para el ámbito legal.
                        <br />
                        Fácil, intutiva y transparente.
                    </p>
                    <div id="call-to-action" className="call-to-action">
                        <div className="cta-text">
                            <h2>¡Empiece ya!<br />Solo le llevará un momento</h2>
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
}

export default HomePage;