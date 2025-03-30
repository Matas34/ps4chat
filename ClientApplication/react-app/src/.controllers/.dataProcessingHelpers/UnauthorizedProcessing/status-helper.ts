
export const sendError = (err) => {
    return {
        fetchStatus: {
            message: err.message,
            status: false
        }
    }
}

export const sendOk = () => {
    return {
        fetchStatus: {
            message: "Success",
            status: 200
        }
    }
}

export const isError = (res) => {
    if (res && res.fetchStatus) {
        return res.fetchStatus.status !== 200;
    } else {
        return false;
    }
}

export const isOK = (res) => {
    if (res && res.fetchStatus) {
        return res.fetchStatus.status === 200;
    } else {
        return false;
    }
}

export const getErrorMessage = (res) => {
    if (res && res.fetchStatus) {
        return res.fetchStatus.message;
    }
}