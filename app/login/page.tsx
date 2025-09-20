"use client";
import { useRouter } from "next/router";
import React,{useState} from "react";

function LoginPage(){

    const [email, setEmail] = useState("");
    const [password , setPassword] = useState("");
    const router = useRouter();
    return <div>Login Page</div>
};

export default LoginPage;