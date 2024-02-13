//pagina renderizada no lado do server ficou ok!
import Link from "next/link";
import { usePostStore } from "../../../../store/postStore";


interface Post {
    id?: number;
    title: string;
}

export default async function Post({ params }: { params: { id: number } }) {

    const post = await usePostStore.getState().getPost(params.id);

    if (!post) return (
        <div>
            <Link href={"/"}><h1>Not Found</h1></Link>
        </div>
    )
    return (
        <>
            <div className="flex justify-center mt-5 gap-7 ">
                <h1 className="text-lg">id:{post.id}</h1>
                <p className="text-lg">Title: {post.title}</p>
            </div>
        </>
    )
}
