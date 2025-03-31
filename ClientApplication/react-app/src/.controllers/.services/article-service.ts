// 
import { FetchHelperAxios } from "../.dataProcessingHelpers/DataProccessingHelpersExport";
import { SearchSizeConstants } from "../../.constants/SearchSizeConstants/SearchSizeConstants";

const ArticleService = {
    /**
     * One of these is duplicated
     * @param page 
     * @param userId 
     * @returns 
     */
    getArticles: async function(page: Number, userId?: Number) {
        let apiUrl = process.env.REACT_APP_API_URL + `Articles/search?PageNumber=${page}&PageSize=${process.env.REACT_APP_PAGING_SIZE}`;
        if (userId !== null && userId !== undefined) {
            apiUrl += `&UserId=${userId}`;
        }
        return FetchHelperAxios.fetchEntityAxios(apiUrl, null).then(res => {return res});
    },

    pageArticles: async function(page: Number, userId?: Number, search?: String) {
        let apiUrl = process.env.REACT_APP_API_URL + `Articles/search?PageNumber=${page}&PageSize=${SearchSizeConstants.MaxPageSize}`;
        if (userId !== null && userId !== undefined) {
            apiUrl += `&UserId=${userId}`;
        }
        if (search !== null && userId !== undefined) {
            apiUrl += `&Search=${search}`;
        }
        return FetchHelperAxios.fetchEntityAxios(apiUrl, null).then(res => {return res});
    },
    
    postArticle: async function(article) {
        const requestOptions = FetchHelperAxios.generateRequestOptionsAxios("POST", article);
        const apiUrl = process.env.REACT_APP_API_URL + `Articles`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, requestOptions).then(res => {return res});
    },

    putArticle: async function(article) {
        const requestOptions = FetchHelperAxios.generateRequestOptionsAxios("PUT", article);
        const apiUrl = process.env.REACT_APP_API_URL + `Articles/${article.id}`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, requestOptions).then(res => {return res});
       
    },

    getArticle: async function(articleId: Number) {
        const apiUrl = process.env.REACT_APP_API_URL + `Articles/${articleId}`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, null).then(res => {return res});
    },

    getRandomArticle: async function() {
        const apiUrl = process.env.REACT_APP_API_URL + `Articles/random`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, null).then(res => {return res});
    },

    getArticleByQuery: async function(title?: String, userId?: Number) {
        let apiUrl = process.env.REACT_APP_API_URL + `Articles/search?Search=${title}&PageSize=${SearchSizeConstants.MaxPageSize}`;
        if (userId !== null && userId !== undefined) {
            apiUrl += `&UserId=${userId}`;
        }
        return FetchHelperAxios.fetchEntityAxios(apiUrl, null).then(res => {return res});
    },

    deleteArticle: async function(articleId: Number) {
        const requestOptions = FetchHelperAxios.generateRequestOptionsAxios("DELETE");
        const apiUrl = process.env.REACT_APP_API_URL + `Articles/${articleId}`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, requestOptions).then(res => {return res});
    },

    postImage: async function(articleId: any, file: string | Blob) {
        const form = new FormData()
        form.append("File", file)
        const requestOptions = FetchHelperAxios.generateImageRequestOptionsAxios(form);
        const apiUrl = process.env.REACT_APP_API_URL + `Articles/${articleId}/img`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, requestOptions).then(res => {return res});
    },

    /**
     * 
     * @param {articleId} articleId 
     * @returns url to image
     */
    getImage: async function(articleId: Number) {
        const apiUrl = process.env.REACT_APP_API_URL + `Articles/${articleId}/img`;
        return FetchHelperAxios.getImageAxios(apiUrl).then(res => {return res});
    },

    deleteImage: async function(articleId: Number) {
        const requestOptions = FetchHelperAxios.generateRequestOptionsAxios("DELETE");
        const apiUrl = process.env.REACT_APP_API_URL + `Articles/${articleId}/img`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, requestOptions).then(res => {return res});
    }



}

export default ArticleService;