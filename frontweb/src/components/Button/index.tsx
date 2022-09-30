type Props = {
  name: string;
};

const Button = ({ name }: Props) => {
  return (
    <div className="basic-button">
      <button>{name}</button>
    </div>
  );
};

export default Button;
