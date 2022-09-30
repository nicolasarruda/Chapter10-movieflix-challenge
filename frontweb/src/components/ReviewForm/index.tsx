import Button from 'components/Button';
import { useForm } from 'react-hook-form';
import { AxiosRequestConfig } from 'axios';
import { Review } from '../../types/review';
import { requestBackEnd } from 'utils/requests';
import { toast } from 'react-toastify';

type Props = {
  movieId: string;
  onInsertReview: (review: Review) => void;
};

type FormData = {
  movieId: number;
  text: string;
};

const ReviewForm = ({ movieId, onInsertReview }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    formData.movieId = parseInt(movieId);

    const config: AxiosRequestConfig = {
      method: 'POST',
      url: '/reviews',
      data: formData,
      withCredentials: true,
    };

    requestBackEnd(config)
      .then((response) => {
        onInsertReview(response.data);
        setValue('text', '');
        toast.info('Avaliação cadastrada com sucesso!');
      })
      .catch((error) => {
        console.log('ERRO', error);
        toast.error('Erro no cadastro da avaliação');
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-container bg-secondary">
        <input
          {...register('text', {
            required: 'Campo obrigatório',
          })}
          type="text"
          placeholder="Deixe sua avaliação aqui"
        />
        <h1>{errors.text?.message}</h1>
        <Button name="Salvar Avaliação" />
      </div>
    </form>
  );
};

export default ReviewForm;
