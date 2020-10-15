import {extractFragmentReplacements} from "prisma-binding"
import User from "./user"
import Query from "./query"
import Mutation from "./mutation"
import Subscription from "./subscription"

const resolvers = {
    User,
    Query,
    Mutation,
    Subscription
}

const fragmentReplacements = extractFragmentReplacements(resolvers)

export {resolvers, fragmentReplacements}

