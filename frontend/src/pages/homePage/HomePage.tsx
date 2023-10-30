import { useState, useEffect } from 'react';

import { Product } from '../../types';

import {
    BID_NOW,
    NEW_ARRIVALS,
    LAST_CHANCE,
} from '../../utils/constants';

import {
    fetchClosestProduct,
    fetchProducts,
} from '../../helpers/apiFunctions';

import ProductList from '../../components/productList/LazyLoad';
import { useNavigate } from 'react-router-dom';
import CategoryList from '../../components/categoryList/CategoryList';


const HomePage = () => {
    const [closestProduct, setClosestProduct] = useState<Product | null>(null);

    console.log("IMAGE URL: " , closestProduct?.images[0]?.imageUrl);

    const [selectedSection, setSelectedSection] =
        useState<string>(NEW_ARRIVALS);

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetchClosestProduct().then((data) => setClosestProduct(data));
    }, []);

    useEffect(() => {
        fetchProducts(selectedSection).then((data) => setProducts(data));

        console.log(products);
    }, [selectedSection]);

    const navigate = useNavigate();

    const handleProductClick = (productId: string) => {
        navigate(`/shop/item/${productId}`);
    };

    return (
        <>
            <div className="w-2/3 mx-auto pt-12 flex font-lato">
                <CategoryList />

                <div className="pl-40 flex pt-24 gap-8">
                    <div className="flex flex-col w-1/2">
                        {closestProduct && (
                            <div
                                onClick={() =>
                                    handleProductClick(closestProduct.productId)
                                }
                                className="cursor-not-allowed"
                            >
                                <p className="font-bold">
                                    {closestProduct.name}
                                </p>
                                <p className="text-trueIndigo-500 font-bold pt-3 pb-3">
                                    Start From ${closestProduct.startingPrice}
                                </p>
                                <p className="text-trueGray-500">
                                    {closestProduct.description}
                                </p>
                            </div>
                        )}

                        <div className="font-bold pt-8 cursor-not-allowed">{BID_NOW}</div>
                    </div>

                    <div className="w-1/2 cursor-not-allowed">
                        {closestProduct ? (
                            <img
                                src={closestProduct.images[0].imageUrl}
                                alt={closestProduct.name}
                                onClick={() =>
                                    handleProductClick(closestProduct.productId)
                                }
                                className="cursor-not-allowed"
                            />
                        ) : (
                            <p>No product found</p>
                        )}
                    </div>
                </div>
            </div>

            <div>
                <div className="flex gap-16 w-2/3 mx-auto flex font-lato h-12 border-b-2 border-true-gray-300">
                    <button
                        onClick={() => setSelectedSection(NEW_ARRIVALS)}
                        className={
                            selectedSection === NEW_ARRIVALS ? 'font-bold' : ''
                        }
                    >
                        {NEW_ARRIVALS}
                    </button>
                    <button
                        onClick={() => setSelectedSection(LAST_CHANCE)}
                        className={
                            selectedSection === LAST_CHANCE ? 'font-bold' : ''
                        }
                    >
                        {LAST_CHANCE}
                    </button>
                </div>

                <ProductList products={products} />
            </div>
        </>
    );
};

export default HomePage;
