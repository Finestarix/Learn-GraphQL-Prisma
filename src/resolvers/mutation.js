import getUserID from '../utils/getUserID'
import getToken from '../utils/generateToken'
import hashPassword from '../utils/hashPassword'

const Mutation = {
    async loginUser(parent, args, {prisma}, info) {
        const user = await prisma.query.user({where: {email: args.data.email}})
        if (!user)
            throw new Error('Unable to Login !')

        const isPasswordMatch = await bcrypt.compare(args.data.password, user.password)
        if (!isPasswordMatch)
            throw new Error('Invalid Password !')

        return {
            token: getToken(user.id),
            user: user
        }
    },
    async createUser(parent, args, {prisma}, info) {
        const password = await hashPassword(args.data.password);
        return prisma.mutation.createUser(
            {
                data: {
                    ...args.data,
                    password: password
                }
            });
    },
    async updateUser(parent, args, {prisma, request}, info) {
        const userID = getUserID(request)

        if (typeof args.data.password === "string")
            args.data.password = hashPassword(args.data.password)

        return prisma.mutation.updateUser({where: {id: userID}, data: args.data}, info)
    },
    async deleteUser(parent, args, {prisma, request}, info) {
        const userID = getUserID(request)
        return prisma.mutation.deleteUser({where: {id: userID}}, info)
    },
    async createPost(parent, args, {prisma, request}, info) {
        const userID = getUserID(request)
        return prisma.mutation.createPost(
            {
                data: {
                    title: args.data.title,
                    body: args.data.body,
                    published: args.data.published,
                    author: {
                        connect: {
                            id: userID
                        }
                    }
                }
            }, info)
    },
    async updatePost(parent, args, {prisma, request}, info) {
        const userID = getUserID(request)

        const postExists = await prisma.exists.Post({id: args.id, author: {id: userID}})
        if (!postExists)
            throw new Error('Unable to Update Post !')

        return prisma.mutation.updatePost({where: {id: args.id}, data: args.data}, info)
    },
    async deletePost(parent, args, {prisma, request}, info) {
        const userID = getUserID(request)

        const postExists = await prisma.exists.Post({id: args.id, author: {id: userID}})
        if (!postExists)
            throw new Error('Unable to Delete Post !')

        return prisma.mutation.deletePost({where: {id: args.id}}, info)
    },
    async createComment(parent, args, {prisma, request}, info) {
        const userID = getUserID(request)

        const postExists = await prisma.exists.Post({id: args.data.post, published: true})
        if (!postExists)
            throw new Error('Unable to Find Post !')

        return prisma.mutation.createComment(
            {
                data: {
                    text: args.data.text,
                    author: {
                        connect: {
                            id: userID
                        }
                    },
                    post: {
                        connect: {
                            id: args.data.post
                        }
                    }
                }
            }, info)
    },
    async updateComment(parent, args, {prisma, request}, info) {
        const userID = getUserID(request)

        const commentExists = await prisma.exists.Comment({id: args.id, author: {id: userID}})
        if (!commentExists)
            throw new Error('Unable to Update Comment !')

        return prisma.mutation.updateComment({where: {id: args.id}, data: args.data}, info)

    },
    async deleteComment(parent, args, {prisma, request}, info) {
        const userID = getUserID(request)

        const commentExists = await prisma.exists.Comment({id: args.id, author: {id: userID}})
        if (!commentExists)
            throw new Error('Unable to Delete Comment !')

        return prisma.mutation.deleteComment({where: {id: args.id}}, info)
    }
}

export {
    Mutation as default
}