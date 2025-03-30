import { FetchHelperAxios } from "../.dataProcessingHelpers/DataProccessingHelpersExport";
import { SearchSizeConstants } from "../../.constants/SearchSizeConstants/SearchSizeConstants";

const CategoryService = {
    postCategory: async function (category) {
        const requestOptions = FetchHelperAxios.generateRequestOptionsAxios("POST", category);
        const apiUrl = process.env.REACT_APP_API_URL + `Category`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, requestOptions).then(res => {return res});
    },

    putCategory: async function (category) {
        const requestOptions = FetchHelperAxios.generateRequestOptionsAxios("PUT", category);
        const apiUrl = process.env.REACT_APP_API_URL + `Category/${category.id}`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, requestOptions).then(res => {return res});
    },

    getCategory: async function (id) {
        const requestOptions = FetchHelperAxios.generateRequestOptionsAxios("GET");
        const apiUrl = process.env.REACT_APP_API_URL + `Category/${id}`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, requestOptions).then(res => {return res});
    },

    getCategoriesByTitle: async function (search: string, userId?: number) {
        const requestOptions = FetchHelperAxios.generateRequestOptionsAxios("GET");
        let apiUrl = process.env.REACT_APP_API_URL + `Category/search?Search=${search}&PageSize=${SearchSizeConstants.MaxPageSize}`;
        if (userId !== null && userId !== undefined) {
            apiUrl += `&UserId=${userId}`;
        }
        return FetchHelperAxios.fetchEntityAxios(apiUrl, requestOptions).then(res => {return res});
    },

    getCategoriesByPage: async function (page, userId?: number) {
        const requestOptions = FetchHelperAxios.generateRequestOptionsAxios("GET");
        let apiUrl = process.env.REACT_APP_API_URL + `Category/search?PageNumber=${page}&PageSize=${process.env.REACT_APP_PAGING_SIZE}`;
        if (userId !== null && userId !== undefined) {
            apiUrl += `&UserId=${userId}`;
        }
        return FetchHelperAxios.fetchEntityAxios(apiUrl, requestOptions).then(res => {return res});
    },

    deleteCategory: async function (id) {
        const requestOptions = FetchHelperAxios.generateRequestOptionsAxios("DELETE");
        const apiUrl = process.env.REACT_APP_API_URL + `Category/${id}`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, requestOptions).then(res => {return res});
    },

    postImage: async function(categoryId, file) {
        const form = new FormData()
        form.append("File", file)
        const requestOptions = FetchHelperAxios.generateImageRequestOptionsAxios(form);
        const apiUrl = process.env.REACT_APP_API_URL + `Category/${categoryId}/img`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, requestOptions).then(res => {return res});
    },

    /**
     * 
     * @param {categoryId} categoryId 
     * @returns url to image
     */
    getImage: async function(categoryId) {
        const apiUrl = process.env.REACT_APP_API_URL + `Category/${categoryId}/img`;
        return FetchHelperAxios.getImageAxios(apiUrl).then(res => {return res});
    },

    deleteImage: async function(categoryId) {
        const requestOptions = FetchHelperAxios.generateRequestOptionsAxios("DELETE");
        const apiUrl = process.env.REACT_APP_API_URL + `Category/${categoryId}/img`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, requestOptions).then(res => {return res});
    }
}

export default CategoryService;

