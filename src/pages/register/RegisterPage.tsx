import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css'; // you can change this line according to your choice.
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './RegisterPage.css'

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const roles = [
    { name: 'Abogado', code: 'LW' },
    { name: 'Cliente', code: 'CL' },
    { name: 'Administrador', code: 'AD' } 
];

  const handleLogin = () => {
    // Aquí puedes agregar la lógica de autenticación
    // Por ejemplo, hacer una solicitud a un servidor para verificar las credenciales

    // Después de la autenticación exitosa, redirige al usuario a la página de inicio
    navigate('/');
  };

  const handleBack = () => {
    // Aquí puedes agregar la lógica de vuelta a la page anterior
    // Por ejemplo, hacer una solicitud a un servidor para verificar las credenciales

    navigate('/Login');
  };

  const handleCancel  = () => {
    // Aquí puedes agregar la lógica de vuelta a la page anterior
    // Por ejemplo, hacer una solicitud a un servidor para verificar las credenciales

    navigate('/');
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleLogin}>
        <div className="p-field p-grid">
            <label htmlFor="firstname3" className="p-col-fixed" style={{width:'100px'}}>Email</label>
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
            <label htmlFor="firstname3" className="p-col-fixed" style={{width:'100px'}}>Name</label>
            <div className="p-col">
            <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
            </div>
        </div>

        <div className="p-field p-grid">
            <label htmlFor="firstname3" className="p-col-fixed" style={{width:'100px'}}>Role</label>
            <div className="p-col">
            <Dropdown value={role} options={roles} onChange={(e) => setRole(e.target.value)} optionLabel="name" placeholder="Select a role" />
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
        <div className="p-field p-grid">
            <label htmlFor="lastname3" className="p-col-fixed" style={{width:'100px'}}>Password Confirmation</label>
            <div className="p-col">
            <input
            type="password"
            id="passwordCheck"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
            </div>
        </div>
        <br/>
        <Button label="Log in" icon="pi-check" type='submit' className="p-button-text p-button-success"/> 
        <Button label="Back" icon="pi-angle-left" iconPos="right" onClick={handleBack} className="p-button-text p-button-warning"/> 
        <Button label="Cancel" icon="pi-angle-left" iconPos="right" onClick={handleCancel} className="p-button-text p-button-help"/> 
      </form>
    </div>
  );
};

export default RegisterPage;
