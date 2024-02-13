"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { submitForm } from '../../actions/postActions';
import { usePostStore } from '../../store/postStore';
import { useEffect, useState } from 'react';

const schema = z.object({
  id: z.number().optional(),
    title: z
        .string()
        .min(3, { message: 'O titulo precisa ter pelo menos 3 letras.' })
        .regex(/^([a-zA-Z0-9 ]+)$/i, {
          message: 'O titulo pode ter apenas letras e números',
      })
      
        .transform((username) => username.toLowerCase()),
})

type schemaProps = z.infer<typeof schema>;



export default function Home() {

  const [post, setPost] = useState<schemaProps[]>([])


  useEffect(() => {
    const fetchData =  async ()=>{
      try{
        const allPosts =  await usePostStore.getState().getAllPosts();
        setPost(allPosts);
      } catch(error){
        console.error('Erro ao buscar os posts:', error);
      }
    }
}, []);


    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<schemaProps>({ resolver: zodResolver(schema) });

    const onSubmit = (data: schemaProps) => {
        console.log("Title: ", data)
        submitForm(data)
        reset()
    }


    return (
        <main className="flex min-h-screen flex-col items-center justify-start p-12">
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row items-center justify-between space-x-2">
                    <input type="text" required  className="h-12 rounded-md bg-slate-700" {...register('title')} />
                    <button type="submit" className="h-12 p-2 rounded-md border hover:border-gray-300 text-blue-400">Add post</button>
                </form>
                {errors.title?.message}
            </div>
            <div>
                <ul>
                    {
                    // post.map(post => <li key={post.id}>{post.title}</li>)
                    }
                </ul>
            </div>
        </main>
    )
}