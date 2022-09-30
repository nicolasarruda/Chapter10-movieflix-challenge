import MovieFilter, { MovieFilterData } from 'components/MovieFilter';
import Pagination from 'components/Pagination';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { requestBackEnd } from 'utils/requests';
import MovieCard from '../../components/MovieCard';
import './styles.css';
import { AxiosRequestConfig } from 'axios';
import { Movie } from 'types/movie';

type ControlComponentsData = {
  activePage: number;
  filterData: MovieFilterData;
};

const MovieCatalog = () => {
  const pageSize = 4;

  const [movies, setMovies] = useState<Movie[]>([]);

  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
      filterData: { genre: null },
    });

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({
      activePage: pageNumber,
      filterData: controlComponentsData.filterData,
    });
  };

  const handleSubmitFilter = (data: MovieFilterData) => {
    setControlComponentsData({ activePage: 0, filterData: data });
  };

  const getMovies = useCallback(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: '/movies',
      withCredentials: true,
      params: {
        genreId: controlComponentsData.filterData.genre?.id,
        page: controlComponentsData.activePage,
        size: pageSize,
      },
    };
    requestBackEnd(config).then((response) => {
      const content = response.data.content;
      setMovies(content);
    });
  }, [controlComponentsData]);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  return (
    <div className="list-filter-container">
      <MovieFilter onSubmitFilter={handleSubmitFilter} />
      <div className="row">
        {movies.map((movie) => {
          return (
            <div key={movie.id} className="col-sm-6 col-xl-3">
              <Link to={`movies/${movie.id}/reviews`} className="text-link">
                <div className="basic-movie-card movie-catalog-card bg-secondary">
                  <MovieCard movie={movie} />
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="movie-catalog-pagination">
        <Pagination
          forcePage={controlComponentsData.activePage}
          pageCount={3}
          range={3}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default MovieCatalog;
