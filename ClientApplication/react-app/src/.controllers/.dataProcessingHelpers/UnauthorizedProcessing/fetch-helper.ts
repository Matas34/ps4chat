// fetch-helper.js
import { sendError, sendOk } from "./status-helper";

export const fetchEntity = async (apiUrl, requestOptions) => {
    let type = "get";
    if (requestOptions){
        if (requestOptions.method === "PUT") {
            type = "update";
        } else if (requestOptions.method === "DELETE") {
            type = "delete";
        } else if (requestOptions.method === "POST") {
            type = "create";
        }
    }
    

    try {
        let res;
        if (requestOptions){
            res = await fetch(apiUrl, requestOptions);
        } else {
            res = await fetch(apiUrl);
        }
        if (res.ok) {
            let data = await res.json();
            return {
                ...data,
                ...sendOk()
            }
        }

        const errorData = await res.json(); // Get the error details
        throw new Error(`Failed to ${type} entity. Status code: ${res.status}. Error message: ${errorData.title || errorData.detail || "Unknown error"}`);
    } catch (err) {
        return sendError(err);
    }
};

export const fetchEntityNoReturn = async (apiUrl, requestOptions) => {
    let type = "get";
    if (requestOptions){
        if (requestOptions.method === "PUT") {
            type = "update";
        } else if (requestOptions.method === "DELETE") {
            type = "delete";
        } else if (requestOptions.method === "POST") {
            type = "create";
        }
    }
    

    try {
        let res;
        if (requestOptions){
            res = await fetch(apiUrl, requestOptions);
        } else {
            res = await fetch(apiUrl);
        }
        if (res.ok) {
            return {
                ...sendOk()
            }
        }

        const errorData = await res.json(); // Get the error details
        throw new Error(`Failed to ${type} entity. Status code: ${res.status}. Error message: ${errorData.title || errorData.detail || "Unknown error"}`);
    } catch (err) {
        return sendError(err);
    }
};

/**
 * Fetches an image from a given URL and triggers a download in the browser.
 * Automatically determines the image format based on the server response.
 * 
 * @param {string} imageUrl - The URL of the image to download.
 * @param {string} fileName - The desired base name for the downloaded file (without extension).
 */
export const downloadImage = async (imageUrl, fileName) => {
    try {
        const response = await fetch(imageUrl, {
            method: "GET", // default method
            headers: {
                'Accept': 'image/*'  // Accept any image format
            }
        });

        if (!response.ok) {
            let errorData = await response.json(); // Get the error details
            throw new Error(`Failed to download image. Status code: ${response.status}. Error message: ${errorData.title || errorData.detail || "Unknown error"}`);
        }

        // Get the image data as a Blob (binary large object)
        const blob = await response.blob();

        // Determine the file extension from the Content-Type header
        const contentType = response.headers.get("Content-Type");
        let fileExtension = "";

        // Match known image content types to appropriate file extensions
        if (contentType === "image/gif") {
            fileExtension = "gif";
        } else if (contentType === "image/png") {
            fileExtension = "png";
        } else if (contentType === "image/jpeg") {
            fileExtension = "jpg";
        } else {
            // Default to no extension if unknown, but can be updated for other formats
            fileExtension = contentType.split("/")[1];  // Use the part after "image/"
        }

        // Ensure the final file name includes the correct extension
        const fullFileName = `${fileName}.${fileExtension}`;

        // Create a temporary link element to trigger the download
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fullFileName;  // Set the download file name with the determined extension
        document.body.appendChild(a);
        a.click();  // Programmatically click the link to trigger download
        a.remove();  // Remove the temporary link element after download

        // Clean up the URL object after the download
        window.URL.revokeObjectURL(url);
    } catch (err) {
        return sendError(err);
    }
};

/**
 * Fetches an image from a given URL and displays it in an HTML element.
 * Automatically determines the image format based on the server response.
 * 
 * @param {string} apiUrl - The URL of the image to fetch and display.
 */
export const getImage = async (apiUrl) => {
    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                'Accept': 'image/*'  // Accept any image format
            }
        });

        if (!response.ok) {
            let errorData = await response.json(); // Get the error details
            throw new Error(`Failed to get image. Status code: ${response.status}. Error message: ${errorData.title || errorData.detail || "Unknown error"}`);
        }

        // Get the image data as a Blob (binary large object)
        const blob = await response.blob();

        // Create a local URL for the blob and set it as the src for the <img> element
        const url = window.URL.createObjectURL(blob);
        return url;
    } catch (error) {
        return sendError(error);
    }
};


/**
 * 
 * @param {FormData} body 
 * @returns 
 */
export const generateImageRequestOptions = (body) => {
    return {
        method: "POST",
        headers: {
            'Accept': 'application/json',  // Correct header for receiving JSON response
            //'Content-Type': 'application/json',  // Correct header for sending JSON data
        },
        body: body
    };
}

interface RequestOptions {
    method: string;
    headers: {
        'Accept': string;
        'Content-Type'?: string;
    };
    body?: string;
}

export const generateRequestOptions = (method: string, body?: any): RequestOptions => {
    if (body) {
        return {
            method: method,
            headers: {
                'Accept': 'application/json',  // Correct header for receiving JSON response
                'Content-Type': 'application/json',  // Correct header for sending JSON data
            },
            body: JSON.stringify(body)
        };
    } else {
        return {
            method: method,
            headers: {
                'Accept': 'application/json',  // Correct header for receiving JSON response
                'Content-Type': 'application/json',  // Correct header for sending JSON data
            }
        };
    }
}