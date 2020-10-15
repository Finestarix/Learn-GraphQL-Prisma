import {Prisma} from 'prisma-binding'
import {fragmentReplacements} from "./resolvers/index";

const prisma = new Prisma({
    typeDefs: 'src/generated/schema.graphql',
    endpoint: 'http://localhost:4466',
    secret: '4S$1st4nt',
    fragmentReplacements: fragmentReplacements
})

export { prisma as default }

// const createPost = async (authorID, data) => {
//     const userExist = await prisma.exists.User({id: authorID})
//     if (!userExist)
//         throw new Error(`User ${authorID} Not Found !`)
//
//     const post = await prisma.mutation.createPost(
//         {
//             data: {
//                 ...data,
//                 author: {connect: {id: authorID}}
//             },
//         },
//         '{ author { id name email posts { id title published } } }')
//
//     return post.author
// }

// createPost(
//     'ckfz949pd01ec0768vhm0958v',
//     {
//         title: "GraphQL 101",
//         body: "GraphQL is...",
//         published: true
//     })
//     .then((user) => console.log(JSON.stringify(user, undefined, 4)))
//     .catch((error) => console.log(error.message))

// const updatePost = async (postID, data) => {
//     const postExist = await prisma.exists.Post({id: postID})
//     if (!postExist)
//         throw new Error(`Post ${postID} Not Found !`)
//
//     const post = await prisma.mutation.updatePost(
//         {
//             where: {
//                 id: postID
//             },
//             data
//         },
//         '{ author { id name email posts { id title published } } }')
//
//     return post.author
// }

// updatePost(
//     'ckfz94rew01es0768cqv08j0o',
//     {
//         title: "GraphQL 101",
//         body: "GraphQL is ...",
//         published: false
//     })
//     .then((user) => console.log(JSON.stringify(user, undefined, 4)))
//     .catch((error) => console.log(error.message))