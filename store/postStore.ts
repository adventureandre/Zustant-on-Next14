import { PrismaClient } from "@prisma/client";
import { Post } from "../types";
import { create } from "zustand";



const prisma = new PrismaClient();

type PostStore = {
    add: (post: Post) => Promise<number>
    getPost: (id: number) => Promise<Post | null>
    getAllPosts: ()=>Promise<Post[]>
};



export const usePostStore = create<PostStore>((set) => ({
    add: async (post) => {
        const createdPost = await prisma.title.create({
            data: { title: post.title }
        });
        return createdPost.id;
    },

    getPost: async (id) => {
        const fetchedPost = await prisma.title.findUnique({
            where: {
                id: Number(id),
            }
        });
        return fetchedPost ?? null;
    },
    getAllPosts: async () => {
        const allPost =  await prisma.title.findMany()
        return allPost;
    }
}))