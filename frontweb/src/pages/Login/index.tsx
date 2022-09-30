import CardLogin from './CardLogin';
import Image from '../../assets/images/login-draw.svg';
import './styles.css';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-text-image-container">
        <div className="login-text-container">
          <h1>Avalie Filmes</h1>
          <p>Diga o que você achou do seu filme favorito</p>
        </div>
        <div className="login-image-container">
          <img src={Image} alt="Imagem" />
        </div>
      </div>
      <CardLogin />
    </div>
  );
};

export default Login;
