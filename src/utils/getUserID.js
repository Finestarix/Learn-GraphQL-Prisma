import jwt from 'jsonwebtoken'

const getUserID = (request, requireAuth = true) => {
    const header = request.request ?
        request.request.headers.authorization :
        request.connection.context.Authorization

    if (header) {
        const token = header.replace('Bearer ', '')
        const jtwDecode = jwt.verify(token, '4S$1st4nt')
        return jtwDecode.id
    }

    if (requireAuth)
        throw new Error('Authentication Required !')

    return null
}

export {getUserID as default}