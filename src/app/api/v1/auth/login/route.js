import { NextResponse } from "next/server";
import { prisma } from  "@/utils/prisma";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";





export async function POST(req) {
    const { email, password } = await req.json();

    try{
        const findUser = await prisma.User.findUnique({
            where: {
                email
            },
        });

        if(!findUser) {
            return NextResponse.json({ error: "User not found" });
        }

        

        const hashedPassword = findUser.password
        const isPasswordValid = await bcrypt.compare(password,hashedPassword);
   
        if(!isPasswordValid){
            return NextResponse.json({ error: "Invalid Password" }); 
        }

        const payLoad = {
            id: findUser.id,
            name: findUser.name,
            email: findUser.email,
            
        };
        
        const accessToken = sign (payLoad, process.env.JWT_SECRET_KEY, {expiresIn: "7d"});
        
      
        const res = NextResponse.json({ accessToken, data: payLoad, message: "User login succesfully" });
        res.cookies.set("token", accessToken);
        

        return res;

       

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error }, { status: 500});
    }
};