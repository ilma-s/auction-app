import { Product } from '../../types';

import bidIcon from './assets/bid-icon.svg';
import favoriteIcon from './assets/favorite-icon.svg';

interface ProductCardProps {
    product: Product;
    onProductClick: (productId: string) => void;
}

const ProductCard = ({ product, onProductClick }: ProductCardProps) => {
    return (
        <>
            <div
                key={product.productId}
                className="w-64 h-80 relative cursor-pointer transition-transform h-96 ease-in"
                onClick={() => onProductClick(product.productId)}
            >
                <div className="group relative">
                    <img
                        src={product.images[0].imageUrl}
                        alt={product.name}
                        className="w-34 h-64 object-contain"
                    />
                    <div className="group-overlay absolute inset-0 bg-trueIndigo-500/50 flex justify-center items-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                        <div className="text-white flex justify-center items-center gap-3">
                            <div
                                className="flex gap-2 bg-white cursor-not-allowed p-2"
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            >
                                <div className="text-black">Wishlist</div>
                                <img
                                    src={favoriteIcon}
                                    alt="Favorite"
                                    width="25"
                                    height="25"
                                />
                            </div>
                            <div
                                className="flex gap-2 bg-white cursor-not-allowed p-2"
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            >
                                <div className="text-black">Bid</div>
                                <img
                                    src={bidIcon}
                                    alt="Bid"
                                    width="25"
                                    height="25"
                                />
                            </div>
                        </div>
                    </div>
                    <p className="font-bold text-lg mb-2 pt-3">
                        {product.name}
                    </p>
                    <div className="flex gap-1">
                        <p className="text-trueGray-500">Start From</p>
                        <p className="text-trueIndigo-500">
                            ${product.startingPrice}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductCard;
