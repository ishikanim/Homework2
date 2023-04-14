import { SignIn } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import Router, { useRouter } from "next/router";


export default function login(){
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const router = useRouter();


    useEffect(() => {

        if(userId && router.isReady){
            router.push("/todos/");
        }
    }, [router]);

    
    return(
        <>
        <SignIn routing="path" path="/login" redirectUrl="/todos/" />
        </>
    )
}