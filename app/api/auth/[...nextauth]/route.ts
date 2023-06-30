import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/dist/client/components/headers";
import { error } from "console";

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(
        prisma
    ),
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const res = await fetch("http://localhost:3000/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: credentials?.username,
                        password: credentials?.password
                    })
                })

                const user = await res.json()

                if (user && res.ok) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    pages: {
        signIn: '/auth/login',
        error: '/auth/error'
    },
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (account?.provider === 'google') {
                if (profile?.email?.endsWith('@student.uin-malang.ac.id')) {
                    console.log(profile.email)
                    return true
                } else {
                    return false
                }
            }
            return true

        },
        async session({ token, session }) {
            if (token) {
                session.user.name = token.name
                session.user.email = token.email
                session.user.role = token.role
            }
            return session
        },
        async jwt({ token, user }) {
            const dbUser = await prisma.user.findFirst({
                where: {
                    email: token.email
                }
            })
            if (!dbUser) {
                token.id = user!.id
                return token
            }
            return {
                name: dbUser.name,
                email: dbUser.email,
                role: dbUser.role
            }
        }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }