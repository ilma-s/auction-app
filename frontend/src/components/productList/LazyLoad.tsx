import { lazy, Suspense } from 'react';

import { Product } from '../../types';

const ProductListComponent = lazy(() => import('./ProductList'));

const ProductList = ({ products }: { products: Product[] }) => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProductListComponent products={products} />
        </Suspense>
    );
};

export default ProductList;
