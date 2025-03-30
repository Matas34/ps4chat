// 
import { FetchHelperAxios } from "../.dataProcessingHelpers/DataProccessingHelpersExport";
import { SearchSizeConstants } from "../../.constants/SearchSizeConstants/SearchSizeConstants";

const ParagraphService = {

    postParagraph: async function (paragraph) {
        const requestOptions = FetchHelperAxios.generateRequestOptionsAxios("POST", paragraph);
        const apiUrl = process.env.REACT_APP_API_URL + `Paragraphs`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, requestOptions).then(res => {return res});
    },

    putParagraph: async function (paragraph) {
        const requestOptions = FetchHelperAxios.generateRequestOptionsAxios("PUT", paragraph);
        const apiUrl = process.env.REACT_APP_API_URL + `Paragraphs/${paragraph.id}`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, requestOptions).then(res => {return res});
    },

    getParagraph: async function (id) {
        const requestOptions = FetchHelperAxios.generateRequestOptionsAxios("GET");
        const apiUrl = process.env.REACT_APP_API_URL + `Paragraphs/${id}`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, requestOptions).then(res => {return res});
    },

    getParagraphsByTitle: async function (search: string, userId?: number) {
        const requestOptions = FetchHelperAxios.generateRequestOptionsAxios("GET");
        let apiUrl = process.env.REACT_APP_API_URL + `Paragraphs/search?Search=${search}&PageSize=${SearchSizeConstants.MaxPageSize}`;
        if (userId !== null && userId !== undefined) {
            apiUrl.concat(`&UserId=${userId}`);
        }
        return FetchHelperAxios.fetchEntityAxios(apiUrl, requestOptions).then(res => {return res});
    },

    deleteParagraph: async function (id) {
        const requestOptions = FetchHelperAxios.generateRequestOptionsAxios("DELETE");
        const apiUrl = process.env.REACT_APP_API_URL + `Paragraphs/${id}`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, requestOptions).then(res => {return res});
    },

    postImage: async function(paragraphId, file) {
        const form = new FormData()
        form.append("File", file)
        const requestOptions = FetchHelperAxios.generateImageRequestOptionsAxios(form);
        const apiUrl = process.env.REACT_APP_API_URL + `Paragraphs/${paragraphId}/img`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, requestOptions).then(res => {return res});
    },

    /**
     * 
     * @param {paragraphId} paragraphId 
     * @returns url to image
     */
    getImage: async function(paragraphId) {
        const apiUrl = process.env.REACT_APP_API_URL + `Paragraphs/${paragraphId}/img`;
        return FetchHelperAxios.getImageAxios(apiUrl).then(res => {return res});
    },

    deleteImage: async function(paragraphId) {
        const requestOptions = FetchHelperAxios.generateRequestOptionsAxios("DELETE");
        const apiUrl = process.env.REACT_APP_API_URL + `Paragraphs/${paragraphId}/img`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, requestOptions).then(res => {return res});
    }

}

export default ParagraphService;