import { sendError, sendOk } from "../UnauthorizedProcessing/status-helper";
import API from './API'; // Your configured axios instance with interceptors
import { sendAPIError } from "./auth-status-helper";

interface AxiosRequestOptions {
    method?: string;
    headers?: Record<string, string>;
    body?: any;
}

interface FetchEntityResponse {
    [key: string]: any;
}

export const fetchEntityAxios = async (apiUrl: string, requestOptions?: AxiosRequestOptions): Promise<FetchEntityResponse> => {
    let type = "get";

    if (requestOptions) {
        if (requestOptions.method === "PUT") {
            type = "update";
        } else if (requestOptions.method === "DELETE") {
            type = "delete";
        } else if (requestOptions.method === "POST") {
            type = "create";
        }
    }

    try {
        const axiosConfig = {
            url: apiUrl,
            method: requestOptions?.method || 'GET',
            headers: requestOptions?.headers || {}, // Merge headers from requestOptions
            data: requestOptions?.body || undefined // Axios uses `data` for request body
        };

        // Axios request using the interceptor-configured instance
        const response = await API(axiosConfig);
        if (response.status === 200) {
            return {
                ...response.data,
                ...sendOk()
            };
        }

        throw new Error(`Failed to ${type} entity. Status code: ${response.status}. Error message: ${response.data}`);
    } catch (error) {
        return sendAPIError(error, type);
    }
};

/**
 *  Fetches an image from the API
 * @param apiUrl 
 * @returns 
 */
export const getImageAxios = async (apiUrl: string) => {
    try {
        const headers = {
            'Accept': 'image/*'  // Accept any image format
        }

        const axiosConfig = {
            url: apiUrl,
            method: 'GET',
            headers: headers,
            responseType: 'blob',  // Ensure the response is a Blob
        };

        const response = await API(axiosConfig);

        const blob = await response.data;

        const url = URL.createObjectURL(blob);
        return url;
    } catch (error) {
        return sendAPIError(error);
    }
};

/**
 * Generates the request options for an image upload
 * @param body 
 * @returns 
 */
export const generateImageRequestOptionsAxios = (body: FormData): AxiosRequestOptions => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
    };

    return {
        method: 'POST',
        headers: headers,
        body: body
    };
};

/**
 * Generates the request options for a fetch request
 * @param method 
 * @param body 
 * @returns 
 */
export const generateRequestOptionsAxios = (method: string, body?: any): AxiosRequestOptions => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };

    return {
        method: method,
        headers: headers,
        ...(body && { body: body }) // Add body only if it exists
    };
};


