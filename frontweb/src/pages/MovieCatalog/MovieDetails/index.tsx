import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { requestBackEnd } from 'utils/requests';
import { Review } from 'types/review';
import ReviewForm from 'components/ReviewForm';
import { hasAnyRoles } from 'utils/auth';
import ReviewList from 'components/ReviewList';
import './styles.css';
import MovieCard from 'components/MovieCard';
import { Movie } from 'types/movie';

type UrlParams = {
  movieId: string;
};

const MovieDetails = () => {
  const { movieId } = useParams<UrlParams>();

  const [reviews, setReviews] = useState<Review[]>([]);

  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `/movies/${movieId}/reviews`,
      withCredentials: true,
    };

    requestBackEnd(config)
      .then((response) => {
        const { reviews } = response.data;
        setMovie(response.data);
        setReviews(reviews);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [movieId]);

  const handleInsertReview = (reviewMovie: Review) => {
    const clone = [...reviews];
    clone.push(reviewMovie);
    setReviews(clone);
  };

  return (
    <div className="details-container">
      <div className="basic-movie-card movie-details-container">
        <MovieCard movie={movie} />
      </div>
      {hasAnyRoles(['ROLE_MEMBER']) && (
        
        <ReviewForm movieId={movieId} onInsertReview={handleInsertReview} />
      )}

      <ReviewList reviews={reviews} />
    </div>
  );
};

export default MovieDetails;
