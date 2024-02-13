import Link from "next/link";
import { usePostStore } from "../../../../store/postStore";


interface Post{
    id: number;
    title: string | null;
}

export default async function Post({ params }: { params: { id: number } }) {

  
const post:Post | null = await usePostStore.getState().getPost(params.id);
    

    if (!post) return (
        <div>
            <Link href={"/"}><h1>Not Found</h1></Link>
        </div>
    )

    return (
        <>
            <div>
                <h1 className="text-lg">{post?.id}</h1>
                <p className="text-lg">{post?.title}</p>
            </div>
        </>
    )
}
