import { useNavigate } from "react-router-dom";

import { Product } from "../../types";

interface ProductListProps {
    products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
    const navigate = useNavigate();

    const handleProductClick = (productId: string) => {
        navigate(`/shop/item/${productId}`);
    };
    
    return (
        <>
            <div className="w-2/3 mx-auto pt-12 pb-20">
                <div className="grid grid-cols-4 gap-28">
                    {products.map((product) => (
                        <div
                            key={product.name}
                            className="w-64 h-80 relative cursor-not-allowed transition-transform h-96 ease-in hover:scale-110 hover:border hover:p-4 hover:rounded-md hover:shadow-md"
                            onClick={() =>
                                handleProductClick(product.productId)
                            }
                        >
                            <img
                                src={product.images[0]?.imageUrl}
                                alt={product.name}
                                className="w-34 h-64 object-cover"
                            />
                            <p className="font-bold text-lg mb-2">
                                {product.name}
                            </p>
                            <div className="flex gap-1">
                                <p className="text-trueGray-500">Start From</p>
                                <p className="text-trueIndigo-500">
                                    ${product.startingPrice}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            ;
        </>
    );
};

export default ProductList;
