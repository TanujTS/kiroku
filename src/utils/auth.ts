import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "../db/index"; 
import { account, session, users, verification } from "../models/user.model";
 
export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg", 
        schema: {
            user: users,
            account,
            verification,
            session
        }
    }),
    user: {
        fields: {
            name: "username",
        },
        additionalFields: {
            role: {
                type: "string",
                required: false,
                defaultValue: "USER",
                input: false
            }
        }
    },
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }
    },
    trustedOrigins: [
        "http://localhost:3000",
        "http://localhost:3001"
    ]
});