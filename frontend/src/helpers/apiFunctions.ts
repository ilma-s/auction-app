export async function fetchCategories() {
    try {
        const response = await fetch('http://localhost:8080/categories');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return null;
    }
}

export async function fetchClosestProduct() {
    try {
        const response = await fetch('http://localhost:8080/closest-product');
        const closestProduct = await response.json();

        return closestProduct;
    } catch (error) {
        console.error('Error fetching closest product:', error);
        return null;
    }
}


export async function fetchProducts(
    selectedSection: string,
    categoryId?: string,
) {
    const endpoints: Record<string, string> = {
        'New Arrivals': '/new-arrivals',
        'Last Chance': '/last-chance',
        'Related Products': `/related-products?categoryId=${categoryId}`,
    };

    const endpoint = endpoints[selectedSection];

    try {
        const response = await fetch(`http://localhost:8080${endpoint}`);
        const data = await response.json();
        console.log(data);

        return data;
    } catch (error) {
        console.error(`Error fetching ${selectedSection} products:`, error);
        return null;
    }
}
