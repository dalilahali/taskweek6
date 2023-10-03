"use client"

import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

export const AuthLogin = () => {
    const [loginData, setLoginData] = useState ({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    }

    const handleSubmitLogin = async () => {
        toast.loading("Logging in...");
        const res = await fetch("/api/v1/auth/login", {
            method: "POST",
            body: JSON.stringify(loginData),
        });
        const { data, error } = await res.json();

        if (error) {
            toast.remove();
            toast.error(error);
            return;
        }

        toast.remove();
        toast.success("Login successfully");
        console.log(data);
    };

    return (
        <main className="h-screen w-full grid grid-cols-2">
            <div className="bg-indigo-500"></div>
            <div className="flex justify-center items-center">
                <div className="w-[320px] space-y-2">
                    <Input name="email" placeholder="email" onChange={handleChange}/>
                    <Input name="password" placeholder="password" type="password" onChange={handleChange}/>
                    <Button onClick={handleSubmitLogin}>Login</Button>

                    <div className="flex gap-2 py-5">
                        <div className="text-sm"> Don't have an Account? </div>
                        <Link className= "text-sm font-bold hover:text-blue-600" href="/register" color>
                         Register
                        </Link>
                    
                    </div>
                </div>
                
                
                
            </div>
        </main>
    );
};