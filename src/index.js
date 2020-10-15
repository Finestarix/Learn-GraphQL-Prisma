import {GraphQLServer} from "graphql-yoga";
import prisma from "./prisma"
import {resolvers, fragmentReplacements} from "./resolvers/index"

const server = new GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers: resolvers,
    context(request) {
        return {
            prisma,
            request
        }
    },
    fragmentReplacements
});

server.start(() => {
    console.log('Server: http://localhost:4000')
})