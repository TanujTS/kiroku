"use server"

import prisma from "@/lib/prisma"

export async function getPosts() {
    try {
        const posts = await prisma.post.findMany({
            where: {
                published: true
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true
                    }
                },
                _count: {
                    select: {
                        likes: true,
                        comments: true,
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return {success: true, posts}
    } catch (error) {
        console.error("Error fetching posts: ", error);
        return { success: false, posts: [], error: "Failed to fetch posts." }
    }
}