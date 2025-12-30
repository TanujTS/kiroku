import { headers } from "next/headers"
import { auth } from "./auth"


export const getSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    return session;
}

export const getCurrentUser = async () => {
    const session = await getSession();
    return session?.user || null
}

export const requireAuth = async() => {
    const session = await getSession();
    if (!session) {
        redirect("/auth/sign-in")
    }
    return session;
}