import NextAuth from "next-auth/next";
import prisma from "@/app/libs/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import  CredentialsProvider  from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { NextAuthOptions, RequestInternal, DefaultSession } from "next-auth";
import bcrypr from "bcrypt"
// // import jwt from 'jsonwebtoken'

export const authOptions: NextAuthOptions = {
          adapter: PrismaAdapter(prisma),
          providers: [
           GithubProvider({
                              clientId: process.env.GITHUB_ID!,
                              clientSecret: process.env.GITHUB_SECRET!

                    }),
          GoogleProvider({
                    clientId: process.env.GOOGLE_ID!,
                    clientSecret: process.env.GOOGLE_SECRET!
          }),
          CredentialsProvider({
                    name: "credentials",
                    credentials: {
                              email: {label:"email", type:"text"},
                              password: {label: "password", type: "password"},
                              name: {label: "username", type: "text"},
                         
                    },
                    //                    authorize() {}, // TODO: implement this
                    async authorize(credentials:Record<"email" | "password" | "name", string> | undefined, req: Pick<RequestInternal, "body" | "query" | "headers" | "method"> ) {
                              
                         if (!credentials?.email || !credentials.password){
                              throw new Error("Missing fill!")
                         }
                         const user =  await prisma.user.findUnique({where:{email: credentials.email}})
               
                         if (!user){
                              throw new Error("User not found!")
                         }

                         const validPassword = bcrypr.compare(credentials.password, user.hashpassword!)
                         if (!validPassword){
                              throw new Error("Invalid password!")
                         }

                         return user
                            }
                                         
          }),
               ],
               
               secret: process.env.SECRET!,
               session: {
                    strategy: "jwt",
                    maxAge: 3600
                    
               },
               
               debug: process.env.NODE_ENV == "development",
               
           
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}