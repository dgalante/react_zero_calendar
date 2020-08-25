import React from "react";
import "./login.css";
import useForm from "../../hooks/useForm";
import validator from "validator";
import { useDispatch } from "react-redux";
import { startLogin, startRegister } from "../../redux/actions/authActions";
import Swal from "sweetalert2";

export const LoginScreen = () => {
  const dispatch = useDispatch();

  const [loginValues, handleLoginInputChange] = useForm({
    lEmail: "diego5@gmail.com",
    lPassword: "qweeww1",
  });
  const { lEmail, lPassword } = loginValues;

  const [registerValues, handleRegisterInputChange] = useForm({
    rName: '',
    rEmail: '',
    rPassword: '',
    rPasswordRepeat: ''
  });

  const { rName, rEmail, rPassword, rPasswordRepeat } = registerValues;


  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (isFormLoginValid()) dispatch(startLogin(lEmail, lPassword));
  };

  const isFormLoginValid = () => {
    if (!validator.isEmail(lEmail)) {
      Swal.fire('Error', 'El email no es válido');
      return false;
    }

    if (lPassword.trim().length < 5) {
      Swal.fire('Error', 'La contraseña debe ser mayor a 4 caracteres');
      return false;
    }

    return true;
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (isFormRegisterValid()) 
      dispatch( startRegister(rName, rEmail, rPassword) );
  };

  const isFormRegisterValid = () => {

    if (rName.trim().length < 2) {
      Swal.fire('Error', 'El nombre es obligatorio');
      return false;
    }
    
    if (!validator.isEmail(rEmail)) {
      Swal.fire('Error', 'El email no es válido');
      return false;
    }

    if (rPassword.trim().length < 5 || 
        rPassword !== rPasswordRepeat) {
        Swal.fire('Error', 'La contraseña debe ser mayor a 4 caracteres y coincidir');
      return false;
    }

    return true;
  };

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="lEmail"
                value={lEmail}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="lPassword"
                value={lPassword}
                onChange={handleLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

{/* -------------------------------------------------------------------------- */}

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={ handleRegisterSubmit }>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="rName"
                value={rName}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="rEmail"
                value={rEmail}
                onChange={handleRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="rPassword"
                value={rPassword}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="rPasswordRepeat"
                value={rPasswordRepeat}
                onChange={handleRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
