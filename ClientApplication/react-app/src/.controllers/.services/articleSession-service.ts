import { FetchHelperAxios } from "../.dataProcessingHelpers/DataProccessingHelpersExport";
import { SearchSizeConstants } from "../../.constants/SearchSizeConstants/SearchSizeConstants";

const ArticleSessionService = {
    postArticleSession: async function(articleSession) {
        const requestOptions = FetchHelperAxios.generateRequestOptionsAxios("POST", articleSession);
        const apiUrl = process.env.REACT_APP_API_URL + `article-sessions`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, requestOptions).then(res => {return res});
    },

    getArticleSession: async function(startDate: String, endDate: String) {
        const apiUrl = process.env.REACT_APP_API_URL + `article-sessions/me?startAt=${startDate}&endAt=${endDate}`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, null).then(res => {return res});
    }
}

export default ArticleSessionService;