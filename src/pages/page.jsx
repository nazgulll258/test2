import  {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProduct, incrementProductId, decrementProductId } from '../store/productsSlice';
import '../App.css'

const Product = () => {
  const dispatch = useDispatch();
  const { product, status, error, currentProductId } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProduct(currentProductId));
  }, [currentProductId, dispatch]);

  const handleNext = () => {
    dispatch(incrementProductId());
  };

  const handlePrevious = () => {
    dispatch(decrementProductId());
  };

  let content;

  if (status === 'loading') {
    content = <div>Loading...</div>;
  } else if (status === 'succeeded') {
    content = (
      <div>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p>{product.price}$</p>
        <img src={product.thumbnail} alt={product.title} />
      </div>
    );
  } else if (status === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <div className='div'>
      {content}
      <button onClick={handlePrevious} disabled={currentProductId === 1}>
        Назад
      </button>
      <button onClick={handleNext}>Вперед</button>
    </div>
  );
};

export default Product;