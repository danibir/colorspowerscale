const returnError = (errorNum, errorMessage) => {
    return { success: false, error: { errorType: errorNum, message: errorMessage } }
}

module.exports = returnError