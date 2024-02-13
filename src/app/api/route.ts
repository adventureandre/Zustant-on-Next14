import { NextResponse } from "next/server";
import { usePostStore } from "../../../store/postStore";

export async function GET(){
    const allPosts =  await usePostStore.getState().getAllPosts();
    return NextResponse.json(allPosts)
}