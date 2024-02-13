"use server";
import z from "zod"
import { usePostStore } from '../store/postStore';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const schema = z.object({
    id: z.number().optional(),
    title: z.string(),
})

export async function submitForm(formData:{title: string}) {

    const parsedPost = schema.parse({
        title: formData.title,
    });

    const postId = await usePostStore.getState().add(parsedPost);
     revalidatePath("/")
     redirect(`/post/${postId}`);
    
}