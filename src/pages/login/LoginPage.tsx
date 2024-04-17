import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css'; // you can change this line according to your choice.
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './LoginPage.css'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Aquí puedes agregar la lógica de autenticación
    // Por ejemplo, hacer una solicitud a un servidor para verificar las credenciales

    // Después de la autenticación exitosa, redirige al usuario a la página de inicio
    navigate('/');
  };

  const handleBack = () => {
    // Aquí puedes agregar la lógica de vuelta a la page anterior
    // Por ejemplo, hacer una solicitud a un servidor para verificar las credenciales

    navigate('/');
  };

  const handleRegister  = () => {
    // Aquí puedes agregar la lógica de vuelta a la page anterior
    // Por ejemplo, hacer una solicitud a un servidor para verificar las credenciales

    navigate('/Register');
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="p-field p-grid">
            <label htmlFor="firstname3" className="p-col-fixed" style={{width:'100px'}}>Username/Email</label>
            <div className="p-col">
            <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
            </div>
        </div>
        <div className="p-field p-grid">
            <label htmlFor="lastname3" className="p-col-fixed" style={{width:'100px'}}>Password</label>
            <div className="p-col">
            <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
            </div>
        </div>
        <br/>
        <Button label="Log in" icon="pi-check" type='submit' className="p-button-text p-button-success"/> 
        <Button label="Back" icon="pi-angle-left" iconPos="right" onClick={handleBack} className="p-button-text p-button-warning"/> 
        <Button label="Register here" icon="pi-angle-left" iconPos="right" onClick={handleRegister} className="p-button-text p-button-help"/> 
      </form>
    </div>
  );
};

export default LoginPage;
