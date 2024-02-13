import Link from "next/link";
import { usePostStore } from "../../../../store/postStore"

export default function Post({ params }: { params: { id: string } }) {

    const post = usePostStore.getState().posts.find((post) =>
        post.id === params.id)


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
