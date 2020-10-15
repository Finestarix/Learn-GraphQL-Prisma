import getUserID from '../utils/getUserID'

const User = {
    email: {
        fragment: 'fragment userID on User { id }',
        resolve(parent, args, {request}, info) {
            const userID = getUserID(request, false)
            return (userID && userID === parent.id) ? parent.email : null
        }
    },
    posts: {
        fragment: 'fragment userID on User { id }',
        resolve(parent, args, {prisma}, info) {
            return prisma.query.posts({
                where: {
                    published: true,
                    author: {
                        id: parent.id
                    }
                }
            })
        }
    }
}

export {User as default}