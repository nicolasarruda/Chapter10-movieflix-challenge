import { Review } from '../../types/review';
import StarImage from '../../assets/images/star.png';

type Props = {
  reviews: Review[];
};

const ReviewList = ({ reviews }: Props): JSX.Element => {
  return (
    <div className="bg-secondary post-container">
      {reviews.map((review) => {
        return (
          <div key={review.id} className="individual-post-container">
            <img src={StarImage} alt="estrela" />
            <h1>{review.user.name}</h1>
            <p>{review.text}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewList;
