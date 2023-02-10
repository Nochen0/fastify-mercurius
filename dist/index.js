"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const fastify_1 = __importDefault(require("fastify"));
const mercurius_1 = __importDefault(require("mercurius"));
const buildGqlSchema_1 = require("./buildGqlSchema");
async function main() {
    const schema = await (0, buildGqlSchema_1.buildGqlSchema)();
    const app = (0, fastify_1.default)();
    app.register(mercurius_1.default, {
        schema,
        context: async ({ raw }) => {
            return { token: raw.headers.authorization };
        },
        jit: 1,
        graphiql: { enabled: true },
    });
    app.listen({ port: 4000 }, () => {
        console.log("Server is on http://localhost:4000/graphiql");
    });
}
main().catch(console.error);
