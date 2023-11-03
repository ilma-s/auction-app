import { lazy, Suspense } from 'react';

import { Product } from '../../types';

interface ProductListProps {
    products: Product[];
}

const ProductListComponent = lazy(() => import('./ProductList'));

const ProductList = ({ products }: ProductListProps) => {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProductListComponent products={products} />
        </Suspense>
    );
};

export default ProductList;
