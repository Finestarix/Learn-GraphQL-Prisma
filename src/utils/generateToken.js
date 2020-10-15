import jwt from 'jsonwebtoken'

const getToken = (userID) => {
    return jwt.sign({id: userID}, '4S$1st4nt', {
        expiresIn: '7 days'
    });
}

export {getToken as default}