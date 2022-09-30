import { Movie } from 'types/movie';
import './styles.css';

type Props = {
  movie: Movie | undefined;
};

const MovieCard = ({ movie }: Props) => {
  return (
    <>
      <img src={movie?.imgUrl} alt="Imagem Filme" />

      <div className="movie-content-container">
        <h1>{movie?.title}</h1>
        <h2>{movie?.year}</h2>
        <h3>{movie?.subTitle}</h3>
        <p>{movie?.synopsis}</p>
      </div>
    </>
  );
};

export default MovieCard;
