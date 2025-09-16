import ProductDisplayCard from './ProductDisplayCard';

const TrackedProductCard = ({ product, onTrack }) => {
  return <ProductDisplayCard product={product} onTrack={onTrack} />;
};

export default TrackedProductCard;
