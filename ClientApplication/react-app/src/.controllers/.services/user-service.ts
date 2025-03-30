import { FetchHelperAxios } from "../.dataProcessingHelpers/DataProccessingHelpersExport";

const UserService = {
    postUser: async function (user) {
        const requestOptions = FetchHelperAxios.generateRequestOptionsAxios("POST", user);
        const apiUrl = process.env.REACT_APP_API_URL + `Auth/register`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, requestOptions).then(res => {return res});
    },

    loginUser: async function (user) {
        const requestOptions = FetchHelperAxios.generateRequestOptionsAxios("POST", user);
        const apiUrl = process.env.REACT_APP_API_URL + `Auth/login`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, requestOptions).then(res => {return res});
    },

    getUserInfo: async function () {
        const apiUrl = process.env.REACT_APP_API_URL + `Users/me`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, null).then(res => {return res});
    },

    postImage: async function(file) {
        const form = new FormData()
        form.append("File", file)
        const requestOptions = FetchHelperAxios.generateImageRequestOptionsAxios(form);
        const apiUrl = process.env.REACT_APP_API_URL + `Users/img`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, requestOptions).then(res => {return res});
    },

    getImage: async function(userId: Number) {
        const apiUrl = process.env.REACT_APP_API_URL + `Users/${userId}/img`;
        return FetchHelperAxios.getImageAxios(apiUrl).then(res => {return res});
    },

    deleteImage: async function() {
        const requestOptions = FetchHelperAxios.generateRequestOptionsAxios("DELETE");
        const apiUrl = process.env.REACT_APP_API_URL + `Users/img`;
        return FetchHelperAxios.fetchEntityAxios(apiUrl, requestOptions).then(res => {return res});
    }
}

export default UserService;