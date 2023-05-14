'use client'
import React from "react";
import { useAuthContext } from "../components/context/useAuthContext";
import { useRouter } from "next/navigation";
function Page() {
    const { user } = useAuthContext()
    const router = useRouter()

    React.useEffect(() => {
        if (user == null) router.push("/users/login")
        console.log(user);
        
    }, [user])

    return (<h1>Only logged in users {user?.displayName} can view this page</h1>);
}

export default Page;