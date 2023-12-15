import { BACKEND_URL_STRING } from '../utils/constants';

export async function fetchData(
    endpoint: string,
    queryParams: Record<string, string> = {},
): Promise<any> {
    try {
        const url = new URL(`${BACKEND_URL_STRING}/${endpoint}`);

        Object.keys(queryParams).forEach((key) => {
            url.searchParams.append(key, queryParams[key]);
        });

        //const response = await fetch(url.toString());

        const response = await fetch(url.toString(), {
            credentials: 'include',
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
        return null;
    }
}
