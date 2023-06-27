import { User } from "next-auth";
import { Role } from "@prisma/client"

declare module "next-auth/jwt" {
    interface JWT {
        role: Role
    }
}

declare module "next-auth" {
    interface Session {
        user: User & {
            role: Role
        }
    }
}