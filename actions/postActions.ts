"use server";
import { v4 as uuidv4 } from 'uuid';
import z from "zod"
import { usePostStore } from '../store/postStore';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const schema = z.object({
    id: z.string(),
    title: z.string(),
})

export async function submitForm(formData: FormData) {

    const parsedPost = schema.parse({
        id: uuidv4(),
        title: formData.get('title'),
    });


    usePostStore.getState().add(parsedPost);
    revalidatePath("/")
    redirect(`/post/${parsedPost.id}`);
    
}