export const sendAPIError = (error: any, type?: string) => {
    var errorMessage;
    if (error.respose?.data?.title !== undefined || error.response?.data?.detail !== undefined || error.response?.status !== undefined) {
        errorMessage = `Title: ${error.response.data.title || "N/A"}` + ` Details: ${error.response.data.detail || "N/A"}` + ` Status code: ${error.response?.status || "N/A"}`;
    } else if (error.message !== undefined) {
        errorMessage = error.message;
    } else {
        errorMessage = "Unknown error";
    }

    if (type === undefined) {
        type = "fetch";
    }
    const formatedError = `Failed to ${type} entity. Error message: ${errorMessage}`;

    return {
        fetchStatus: {
            message: formatedError,
            status: false
        }
    }
}