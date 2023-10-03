import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import bcrypt from "bcrypt";

export async function POST(req) {
    const { name, email, password } = await req.json();

    try {
        console.log("hash");
        const hashedPassword = await bcrypt.hash(password, 10);
        console.timeEnd("hash");

        const createUser = await prisma.user.create ({
            data: 
            {
                name,
                email,
                password: hashedPassword,
            },
        });

        return NextResponse.json({ data: createUser, message : "User created successfully"}, {status: 201})


    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, {status: 500});
    }
    

}