import getUserID from "../utils/getUserID";

const Query = {
    async me(parent, args, {prisma, request}, info) {
        const userID = getUserID(request)

        return prisma.query.user({
            where: {
                id: userID
            }
        }, info)
    },
    async users(parent, args, {prisma}, info) {
        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy
        }
        if (args.query)
            opArgs.where = {
                name_contains: args.query
            }

        return prisma.query.users(opArgs, info)
    },
    async myPost(parent, args, {prisma, request}, info) {
        const userID = getUserID(request)
        const opArgs = {where: {author: {id: userID}}}

        if (args.query)
            opArgs.where.OR = [{
                title_contains: args.query
            }, {
                body_contains: args.query
            }]

        return prisma.query.posts(opArgs, info)
    },
    async post(parent, args, {prisma, request}, info) {
        const userID = getUserID(request, false)

        const posts = await prisma.query.posts({
            where: {
                id: args.id,
                OR: [{
                    published: true
                }, {
                    author: {
                        id: userID
                    }
                }]
            }
        }, info)

        if (posts.length === 0)
            throw new Error('Post Not Found !')

        return posts[0]
    },
    async posts(parent, args, {prisma}, info) {
        const opArgs = {
            where: {published: true},
            first: args.first,
            last: args.last,
            after: args.after,
            orderBy: args.orderBy
        }
        if (args.query)
            opArgs.where.OR = [{
                title_contains: args.query
            }, {
                body_contains: args.query
            }]

        return prisma.query.posts(opArgs, info)
    },
    async comments(parent, args, {prisma}, info) {
        const opArgs = {
            first: args.first,
            last: args.last,
            after: args.after,
            orderBy: args.orderBy
        }
        if (args.query)
            opArgs.where = {
                text_contains: args.query
            }

        return prisma.query.comments(opArgs, info);
    }
}

export {
    Query as default
}