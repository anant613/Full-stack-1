import { useRouter } from "next/router";
import React,{useState} from "react";
import { json } from "stream/consumers";

function registerUser(){
    const [email,setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [confirmPassword , setConfirmPassword] = useState("");
    const Router = useRouter();

    const handleSummit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //check
        if (password !== confirmPassword) {
            alert("Passoword dont match");
            return ;
        }

        try {
            const res = await fetch("api/auth/register",{
                method: "POST",
                headers :{
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({
                    email,
                    password
                }),
            })

            const data = await res.json();

            //if response not returned
            if(!res.ok){
                throw new Error(data.error || "Registration failed");
            }

            console.log("/login");
        } catch (error) {
            alert(error);
        }

    };
}

export default registerUser;
