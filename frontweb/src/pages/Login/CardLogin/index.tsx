import { AuthContext } from 'AuthContext';
import Button from 'components/Button';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { getTokenData } from 'utils/auth';
import { requestBackendLogin } from 'utils/requests';
import { saveAuthData } from 'utils/storage';
import './styles.css';

type FormData = {
  username: string;
  password: string;
};

type LocationState = {
  from: string;
};

const CardLogin = () => {
  const { setAuthContextData } = useContext(AuthContext);

  const location = useLocation<LocationState>();

  const { from } = location.state || { from: { pathname: '/movies' } };

  const [hasError, setHasError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const history = useHistory();

  const onSubmit = (formData: FormData) => {
    requestBackendLogin(formData)
      .then((response) => {
        saveAuthData(response.data);
        setHasError(false);
        setAuthContextData({
          authenticated: true,
          tokenData: getTokenData(),
        });
        history.replace(from);
      })
      .catch((error) => {
        setHasError(true);
        console.log('ERRO', error);
      });
  };

  return (
    <div className="card-login-container bg-secondary">
      <h1>Login</h1>
      {hasError && (
        <div className="alert alert-danger is-invalid">
          <h2>Email inválido ou senha inválida</h2>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-login btn-login">
          <input
            {...register('username', {
              required: 'Campo obrigatório',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email inválido',
              },
            })}
            type="text"
            className={`${errors.username ? 'is-invalid' : ''}`}
            placeholder="Email"
            name="username"
          />
          <div className="invalid-feedback d-block">
            <h2>{errors.username?.message}</h2>
          </div>
          <input
            {...register('password', {
              required: 'Campo obrigatório',
            })}
            type="password"
            className={`${errors.password ? 'is-invalid' : ''}`}
            placeholder="Senha"
            name="password"
          />
          <div className="invalid-feedback d-block">
            <h2>{errors.password?.message}</h2>
          </div>
          <div className="btn-login">
            <Button name="Fazer Login" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CardLogin;
