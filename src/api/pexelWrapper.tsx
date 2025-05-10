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
                return await fetch(`${pexepApiUrls.base}?page=${page}`, options);
            } catch (error) {
                console.error(error);
            }
        },
        search: async (query: string, page: number) => {
            try {
                return await fetch(`${pexepApiUrls.search}?query=${query}&page=${page}`, options);
            } catch (error) {
                console.error(error);
            }
        },
        popular: async (page: number) => {
            try {
                return await fetch(`${pexepApiUrls.popular}?page=${page}`, options);
            } catch (error) {
                console.error(error);
            }
        },
        getPhoto: async (photoId: string) => {
            try {
                return await fetch(`${pexepApiUrls.photo}/${photoId}`, options);
            } catch (error) {
                console.error(error);
            }
        },
        processResponse: async (response: Response) => {
            try {
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
