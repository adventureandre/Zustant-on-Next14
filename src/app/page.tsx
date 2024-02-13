import { submitForm } from "../../actions/postActions";
import { usePostStore } from "../../store/postStore";
import z from 'zod';

const schema = z.object({
  title: z.string(),
})

export default async function Home() {
  const post = usePostStore.getState().posts;

 

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-12">
      <div>
        <form action={submitForm} className="flex flex-row items-center justify-between space-x-2">
          <input type="text" required name="title" className="h-12 rounded-md bg-slate-700"/>
          <button type="submit" className="h-12 p-2 rounded-md border hover:border-gray-300 text-blue-400">Add post</button>
        </form>
      </div>
      <div>
        <ul>
          {
          post.map(post => <li key={post.id}>{post.title}</li>)
          }
        </ul>
      </div>
    </main>
  );
}
