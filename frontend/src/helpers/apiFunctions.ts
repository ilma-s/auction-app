import {
    BACKEND_URL_STRING,
} from '../utils/constants';

export async function fetchData(endpoint: string): Promise<any> {
    try {
        const response = await fetch(`${BACKEND_URL_STRING}/${endpoint}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
        return null;
    }
}
