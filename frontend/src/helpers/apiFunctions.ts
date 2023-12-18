import { BACKEND_URL_STRING } from '../utils/constants';

let accessToken = '';

async function refreshToken() {
    try {
        const refreshResponse = await fetch(
            `${BACKEND_URL_STRING}/api/refresh`,
            {
                method: 'POST',
                credentials: 'include',
            },
        );

        const refreshData = await refreshResponse.json();
        accessToken = refreshData.newAccessToken; // update the access token
    } catch (refreshError) {
        console.error('Error refreshing tokens:', refreshError);
        throw refreshError; // rethrow the error to indicate token refresh failure
    }
}

export async function fetchData(
    endpoint: string,
    queryParams: Record<string, string> = {},
): Promise<any> {
    try {
        const url = new URL(`${BACKEND_URL_STRING}/${endpoint}`);

        Object.keys(queryParams).forEach((key) => {
            url.searchParams.append(key, queryParams[key]);
        });

        const response = await fetch(url.toString(), {
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response.status === 401) {
            // if the response status is 401, try to refresh the tokens and resend the request
            await refreshToken();
            // resend the request with the new access token
            const refreshedResponse = await fetch(url.toString(), {
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const refreshedData = await refreshedResponse.json();
            return refreshedData;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching data from ${endpoint}:`, error);
        return null;
    }
}
