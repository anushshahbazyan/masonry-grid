import { pexepApiUrls, apiKey } from "../constants/pexelConstants";

export default function pexelWrapper() {
    const options = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "User-Agent": "Pexels/JavaScript",
            Authorization: apiKey,
        },
    };
    
    return {
        base: async (page: number) => {
            try {
                const response = await fetch(`${pexepApiUrls.base}?page=${page}`, options);
                if (response.status !== 200) {
                    throw new Error(response.statusText);
                }
                const data = await response.json();
                return data;
            } catch (error) {
                console.error(error);
            }
        },
        search: async (query: string, page: number) => {
            try {
                const response = await fetch(`${pexepApiUrls.search}?query=${query}&page=${page}`, options);
                if (response.status !== 200) {
                    throw new Error(response.statusText);
                }
                const data = await response.json();
                return data;
            } catch (error) {
                console.error(error);
            }
        },
        popular: async (page: number) => {
            try {
                const response = await fetch(`${pexepApiUrls.popular}?page=${page}`, options);
                if (response.status !== 200) {
                    throw new Error(response.statusText);
                }
                const data = await response.json();
                return data;
            } catch (error) {
                console.error(error);
            }
        },
        getPhoto: async (photoId: string) => {
            try {
                const response = await fetch(`${pexepApiUrls.photo}/${photoId}`, options);
                if (response.status !== 200) {
                    throw new Error(response.statusText);
                }
                const data = await response.json();
                return data;
            } catch (error) {
                console.error(error);
            }
        },
    }
}
