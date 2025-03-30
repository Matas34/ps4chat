// 
import { FetchHelperAxios } from "../.dataProcessingHelpers/DataProccessingHelpersExport";
import { SearchSizeConstants } from "../../.constants/SearchSizeConstants/SearchSizeConstants";

const QuestionService = {

    postQuestion: async function (question) {
        const requestOptions = FetchHelperAxios.generateRequestOptionsAxios("POST", question);
        const apiUrl = process.env.REACT_APP_API_URL + `Questions`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, requestOptions).then(res => {return res});
    },

    putQuestion: async function (question) {
        const requestOptions = FetchHelperAxios.generateRequestOptionsAxios("PUT", question);
        const apiUrl = process.env.REACT_APP_API_URL + `Questions/${question.id}`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, requestOptions).then(res => {return res});
    },

    getQuestion: async function (id) {
        const requestOptions = FetchHelperAxios.generateRequestOptionsAxios("GET");
        const apiUrl = process.env.REACT_APP_API_URL + `Questions/${id}`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, requestOptions).then(res => {return res});
    },

    getQuestionsByTitle: async function (search) {
        const requestOptions = FetchHelperAxios.generateRequestOptionsAxios("GET");
        const apiUrl = process.env.REACT_APP_API_URL + `Questions/search?Search=${search}&PageSize=${SearchSizeConstants.MaxPageSize}`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, requestOptions).then(res => {return res});
    },

    deleteQuestion: async function (id) {
        const requestOptions = FetchHelperAxios.generateRequestOptionsAxios("DELETE");
        const apiUrl = process.env.REACT_APP_API_URL + `Questions/${id}`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, requestOptions).then(res => {return res});
    },

    postImage: async function(questionId, file) {
        const form = new FormData()
        form.append("File", file)
        const requestOptions = FetchHelperAxios.generateImageRequestOptionsAxios(form);
        const apiUrl = process.env.REACT_APP_API_URL + `Questions/${questionId}/img`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, requestOptions).then(res => {return res});
    },

    /**
     * 
     * @param {questionId} questionId 
     * @returns url to image
     */
    getImage: async function(questionId) {
        const apiUrl = process.env.REACT_APP_API_URL + `Questions/${questionId}/img`;
        return FetchHelperAxios.getImageAxios(apiUrl).then(res => {return res});
    },

    deleteImage: async function(questionId) {
        const requestOptions = FetchHelperAxios.generateRequestOptionsAxios("DELETE");
        const apiUrl = process.env.REACT_APP_API_URL + `Questions/${questionId}/img`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, requestOptions).then(res => {return res});
    }

}

export default QuestionService;