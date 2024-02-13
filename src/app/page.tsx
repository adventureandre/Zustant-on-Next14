"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { submitForm } from '../../actions/postActions';
import { useEffect, useState } from 'react';
import { api } from '@/lib/axios';

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

  const [posts, setPost] = useState<schemaProps[]>([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const allPosts = await api.get("")
        setPost(allPosts.data);

      } catch (error) {
        console.error('Erro ao buscar os posts:', error);
      }
    }
    fetchData();
  }, []);


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<schemaProps>({ resolver: zodResolver(schema) });

  const onSubmit = (data: schemaProps) => {
    submitForm(data)
    reset()
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-12">
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row items-center justify-between space-x-2">
          <input type="text" required className="h-12 rounded-md bg-slate-700" {...register('title')} />
          <button type="submit" className="h-12 p-2 rounded-md border hover:border-gray-300 text-blue-400">Add post</button>
        </form>
        <div>{errors.title?.message}</div>
      </div>
      <div>
        <ul className='mt-5'>
          { posts.map((post) => <li key={post.id} className=' text-center p-3'>{post.title}</li>)}
        </ul>
      </div>
    </main>
  )
}