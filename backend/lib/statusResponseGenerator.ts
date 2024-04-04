export default function generateStatusResponse(status: number, error?: any) {

    console.log(error)

    let message = ""
    
    if (status === 200) {
        message = "OK"
    }
    else if (status === 201) {
        message = "Created"
    }
    else if (status === 400) {
        message = "Bad Request"
    }
    else if (status === 401) {
        message = "Unauthorized"
    }
    else if (status === 403) {
        message = "Forbidden"
    }
    else if (status === 404) {
        message = "Not Found"
    }

    if (!error) {
        return {
            statusCode: status,
            message: message,
        }
    }

    return {
        statusCode: status,
        message: message,
        error: error,
    }
}