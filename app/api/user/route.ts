import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

interface RequestBody {
    name: string
    email: string
    password: string
}

const prisma = new PrismaClient()

export async function POST(req: Request) {
    const body: RequestBody = await req.json();
    const user = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            password: await bcrypt.hash(body.password, 10)
        }
    })

    const { password, ...userWithoutPass } = user
    return new Response(JSON.stringify(userWithoutPass))
}